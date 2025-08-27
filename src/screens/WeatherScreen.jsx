import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { getWeatherByCoords } from '../services/WeatherApi'
const WeatherScreen = () => {
    const [weather , setWeather] = useState(null)
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        fetchWeather()
    }, [])

const fetchWeather = async () => {

    try{
        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted"){
        alert("Permission Denied")   
        return ;
        }
let location = await Location.getCurrentPositionAsync({});
const { latitude, longitude } = location.coords;

        const data = await getWeatherByCoords(latitude,longitude)
        setWeather(data)
    } catch(err){
        alert("Error fetching weather :" ,err)
    } finally{
        setLoading(false)
    }
};

if(loading){
    return(
<View style={styles.loadspinner}>
 <ActivityIndicator size={'large'} color={"blue"}/>
</View>
    )
}
    return (
<ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.temp}>
          {weather?.current?.temp ? Math.round(weather.current.temp) : "--"}°C
        </Text>
        <Text style={styles.desc}>
          {weather?.current?.weather?.[0]?.description || "No data"}
        </Text>
        <Text style={styles.feels}>
          Feels like {weather?.current?.feels_like ? Math.round(weather.current.feels_like) : "--"}°C
        </Text>
        <Text style={styles.range}>
          {weather?.daily?.[0]?.temp?.min
            ? `${Math.round(weather.daily[0].temp.min)}° ~ ${Math.round(weather.daily[0].temp.max)}°C`
            : "--"}
        </Text>

        <View style={styles.extraBox}>
          <Text>Humidity: {weather?.current?.humidity}%</Text>
          <Text>Pressure: {weather?.current?.pressure} hPa</Text>
          <Text>Wind: {weather?.current?.wind_speed} m/s</Text>
        </View>
      </View>
    </ScrollView>

  )
}

export default WeatherScreen

const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems:'center',
        padding:10,
    },
    loadspinner: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    contentContainerStyle: {
  paddingBottom:40, 

    },
    
    temp: { 
        fontSize: 60,
         fontWeight: "bold" ,
         color:'white'
        },

       desc: {
         fontSize: 20,
          textTransform: "capitalize" 
        },
        
        city: { fontSize: 26, fontWeight: "bold" },

         feels: { fontSize: 18, marginTop: 10 },
  range: { fontSize: 16, marginTop: 5, color: "#555" },
  extraBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    width: "100%",
  },


})