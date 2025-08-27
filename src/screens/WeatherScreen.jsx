import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { getForecastByCoords, getWeatherByCoords } from '../services/WeatherApi'



const WeatherScreen = ({onCityChange}) => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      alert("Permission Denied")
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = location.coords

    const data = await getWeatherByCoords(latitude, longitude)
    const forecastData = await getForecastByCoords(latitude, longitude)

    setWeather(data)
  
    setForecast(forecastData)

  if (onCityChange && data?.name) {
        onCityChange(data.name)
      }

  } catch (err) {
    alert("Error fetching weather: " + err.message)
  } finally {
    setLoading(false)
  }
}
  if (loading) {
    return (
      <View style={styles.loadspinner}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.temp}>
          {weather?.main?.temp ? Math.round(weather.main.temp) : "--"}°C
        </Text>
        <Text style={styles.desc}>
          {weather?.weather?.[0]?.description || "No data"}
        </Text>
        <Text style={styles.feels}>
          {" "}
          {weather?.main?.feels_like ? Math.round(weather.main.feels_like) : "--"}°C
        </Text>
        <Text style={styles.range}>
          Min {weather?.main?.temp_min ? Math.round(weather.main.temp_min) : "--"}° ~ 
          Max {weather?.main?.temp_max ? Math.round(weather.main.temp_max) : "--"}°C
        </Text>

        <View style={styles.extraBox}>
          <Text>Humidity: {weather?.main?.humidity}%</Text>
          <Text>Pressure: {weather?.main?.pressure} hPa</Text>
          <Text>Wind: {weather?.wind?.speed} m/s</Text>
          <Text>City: {weather?.name}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default WeatherScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  loadspinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
  },
  desc: {
    fontSize: 20,
    textTransform: "capitalize",
  },
  feels: { fontSize: 100, marginTop: 10, fontWeight:'bold' },
  range: { fontSize: 16, marginTop: 5, color: "#555" },
  extraBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    width: "100%",
  },
})
