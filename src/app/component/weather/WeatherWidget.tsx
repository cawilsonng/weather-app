'use client';
import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { WeatherModel } from '@/type/WeatherModel';
import { MdAir, MdWaterDrop, MdSpeed } from 'react-icons/md';

export default function WeatherWidget({ weatherModel }: { weatherModel: WeatherModel }) {
    return (
        <Box sx={{
            width: '100%',
            maxWidth: 436,
            background: 'linear-gradient(to bottom, #1a237e, #000051)',
            color: 'white',
            borderRadius: 2,
            padding: 3,
            position: 'relative',
            overflow: 'hidden',
        }}
            aria-label={`Current weather in ${weatherModel.city}: ${weatherModel.description}`}
        >
            <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
                {weatherModel.city}
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h2" sx={{ fontWeight: 'light' }}>
                    {weatherModel.temp}°C
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherModel.icon}@2x.png`}
                        style={{ width: 50, height: 50 }}
                        alt={`Weather icon for ${weatherModel.description}`}
                        aria-label={`Current weather in ${weatherModel.city}: ${weatherModel.description}`}
                    />
                    <Typography>{weatherModel.description}</Typography>
                </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
                    <MdAir aria-label="Wind speed" />
                    <Typography>{weatherModel.windSpeed} m/s</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
                    <MdWaterDrop aria-label="Humidity" />
                    <Typography>{weatherModel.humidity}%</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" sx={{ flex: 1 }}>
                    <MdSpeed aria-label="Pressure" />
                    <Typography>{weatherModel.pressure} mmHg</Typography>
                </Stack>
            </Stack>
        </Box>
    );
};