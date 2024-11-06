import { Metadata } from "next";
import WeatherForm from "./component/weather/WeatherForm"

export const metadata: Metadata = {
  title: "Weather App",
  description: "Get the latest weather updates for your city.",
};

export default function WeatherApp() {
  return (
    <WeatherForm />
  )
}