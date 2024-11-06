'use client';

import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import WeatherWidget from './WeatherWidget';
import { WeatherModel } from '@/type/WeatherModel';

const predefinedCities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];

export default function WeatherForm() {
    const [selectedCity, setSelectedCity] = useState('');
    const [customCity, setCustomCity] = useState('');
    const [weather, setWeather] = useState<WeatherModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        const cityToFetch = selectedCity === 'Other' ? customCity : selectedCity;

        if (!cityToFetch) {
            setError('Please select or enter a city name');
            return;
        }

        setLoading(true);
        setError('');
        setWeather(null);

        try {
            const response = await fetch(
                `api/weather?city=${cityToFetch}`
            )
            if (response.status === 500) {
                setError('Server error.');
            } else {
                const data = await response.json();
                if (response.status === 200) {
                    setWeather(data.data);
                } else {
                    setError(data.errorMsg)
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (err: any) {
            setError('Network error.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: 'grey.100'
        }}>
            <Card sx={{ width: '100%', maxWidth: 436 }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Weather Report
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="city-select-label">Select City</InputLabel>
                        <Select
                            labelId="city-select-label"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            label="Select City"
                        >
                            {predefinedCities.map((city) => (
                                <MenuItem key={city} value={city}>{city}</MenuItem>
                            ))}
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    {selectedCity === 'Other' && (
                        <TextField
                            fullWidth
                            label="Enter city name"
                            variant="outlined"
                            value={customCity}
                            onChange={(e) => setCustomCity(e.target.value)}
                            margin="normal"
                        />
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={fetchWeather}
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        Get Weather
                    </Button>
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {weather && (
                        <Box sx={{ mt: 2 }}>
                            <WeatherWidget weatherModel={weather} />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};