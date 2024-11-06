import { ClientError } from '@/error/ClientError';
import { OpenWeatherMapService } from '@/service/OpenWeatherMapService';
import { ApiResponseModel } from '@/type/ApiResponseModel';
import { WeatherModel } from '@/type/WeatherModel';
import { Utils } from '@/utils/Utils';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const GET_REQUEST_VALIDATION_SCHEMA = z.object({
    city: z.string().min(1).regex(/^[a-zA-Z\s]+$/).max(20),
});

export async function GET(req: Request): Promise<NextResponse<ApiResponseModel<WeatherModel | undefined>>> {
    const urlParams = new URL(req.url).searchParams;
    const city = urlParams.get('city');
    return Utils.validateParameters(GET_REQUEST_VALIDATION_SCHEMA, {
        city
    }).then(({ city }) => {
        return OpenWeatherMapService.fetchGeoByCityName(city);
    }).then((geo) => {
        if (geo.length > 0) {
            return OpenWeatherMapService.fetchWeatherByGeo(geo[0].lat, geo[0].lon);
        }
        throw new ClientError("Can't find the city.");
    }).then(weatherData => {
        return NextResponse.json({
            errorMsg: '',
            data: {
                city: weatherData.name,
                temp: Math.floor(weatherData.main.temp).toString(),
                description: weatherData.weather[0].description,
                windSpeed: weatherData.wind.speed.toString(),
                humidity: weatherData.main.humidity.toString(),
                pressure: weatherData.main.pressure.toString(),
                icon: weatherData.weather[0].icon,
            }
        });
    }).catch(Utils.handleErrorResponse);
}