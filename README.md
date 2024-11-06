
# Weather App

This project is a simple Next.js/React application that displays the current weather for a selected city using the OpenWeather API.

## Features

- **City Search**: Users can enter a city to view its current weather.
- **Real-Time Weather Data**: Displays temperature in Celsius and weather details with icons.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Accessible UI**: Includes labels, high-contrast colors, and accessible components.

## Run it in local

1. Clone the repository:
   ```bash
   git clone https://github.com/cawilsonng/weather-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file and add your OpenWeather API key:
   ```plaintext
   OPEN_WEATHER_API_KEY=your_api_key
   ```
5. Run the application:
   ```bash
   npm run dev
   ```
6. Build the application:
   ```bash
   npm run build
   ```

## Usage

1. Enter a city in the input field.
2. View real-time weather data, including temperature and conditions.

## Deployment

Visit the live app [here](https://weather-app-kappa-nine-21.vercel.app/).

## Technologies

- **Next.js** for SSR and React-based UI
- **OpenWeather API** for fetching weather data
- **Material-UI** for styling
