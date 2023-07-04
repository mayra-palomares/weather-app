# Real-Time Weather App

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This is a web application built using TypeScript, React, Next.JS, and Vite to display real-time weather information and forecasts. It uses the AccuWeather API to retrieve weather data and displays it in an intuitive and easy-to-understand format.

## Technologies

- TypeScript
- React
- Next.JS
- Vite
- AccuWeather API

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/mayra-palomares/weather-app.git
   ```

2. Create an account in AccuWeather to get an API key.

3. Create a .env file in the root directory with the following variables:

   ```bash
   NEXT_PUBLIC_WEATHER_API_URL=http://dataservice.accuweather.com
   NEXT_PUBLIC_WEATHER_API_KEY=
   NEXT_PUBLIC_DEFAULT_CITY=Lisboa,pt
   ```

4. Install dependencies:

   ```
   npm install or yarn install
   ```

5. Run the application:

   ```
   npm run dev or yarn dev
   ```

6. Open your browser and navigate to http://localhost:3000
