import 'server-only';
import { ApiError } from "@/error/ApiError";
import { Utils } from "@/utils/Utils";
import { env } from "process";
import { z } from "zod";

const OpenWeatherMapApiEndpoints = {
    weather: 'https://api.openweathermap.org/data/2.5/weather',
    geo: 'http://api.openweathermap.org/geo/1.0/direct'
}

const ValidationSchema = {
    fetchWeatherByCityName: z.object({
        cityName: z.string().min(1).regex(/^[a-zA-Z\s]+$/).max(20),
        apiKey: z.string().min(1),
    }),
    fetchWeatherByGeo: z.object({
        lat: z.number(),
        lon: z.number(),
        apiKey: z.string().min(1),
    }),
    fetchGeoByCityName: z.object({
        cityName: z.string().min(1).regex(/^[a-zA-Z\s]+$/).max(20),
        apiKey: z.string().min(1),
    }),
}
export const OpenWeatherMapService = {
    //deprecated api endpoint (Please use Geocoder API if you need automatic convert city names and zip-codes to geo coordinates and the other way around.)
    fetchWeatherByCityName: (cityName: string) => {
        const apiKey = env.OPEN_WEATHER_API_KEY;
        return Utils.validateParameters(ValidationSchema.fetchWeatherByCityName, {
            cityName, apiKey
        }).then(({ cityName, apiKey }) => {
            const url = new URL(OpenWeatherMapApiEndpoints.weather);
            const params = new URLSearchParams({ q: cityName, appid: apiKey, units: 'metric' });
            url.search = params.toString();
            return fetch(url);
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(new ApiError());
        }).catch((error) => {
            console.log(error);
            return Promise.reject(new ApiError(error));
        })
    },
    fetchWeatherByGeo: (lat: string, lon: string) => {
        const apiKey = env.OPEN_WEATHER_API_KEY;
        return Utils.validateParameters(ValidationSchema.fetchWeatherByGeo, {
            lat, lon, apiKey
        }).then(({ lat, lon, apiKey }) => {
            const url = new URL(OpenWeatherMapApiEndpoints.weather);
            const params = new URLSearchParams({ lat: lat, lon: lon, appid: apiKey, units: 'metric' });
            url.search = params.toString();
            return fetch(url);
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(new ApiError());
        }).catch((error) => {
            return Promise.reject(new ApiError(error));
        })
    },
    fetchGeoByCityName: (cityName: string) => {
        const apiKey = env.OPEN_WEATHER_API_KEY;
        return Utils.validateParameters(ValidationSchema.fetchGeoByCityName, {
            cityName, apiKey
        }).then(({ cityName, apiKey }) => {
            const url = new URL(OpenWeatherMapApiEndpoints.geo);
            const params = new URLSearchParams({ q: cityName, limit: '1', appid: apiKey });
            url.search = params.toString();
            return fetch(url);
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(new ApiError());
        }).catch((error) => {
            return Promise.reject(new ApiError(error));
        })
    }
}