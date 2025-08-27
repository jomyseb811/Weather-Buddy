import { StyleSheet, Text, View } from "react-native";
import WeatherScreen from '@/src/screens/WeatherScreen'
import { useState } from "react";

export default function Index() {
  const [city, setCity] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {city || "Loading..."}
        </Text>
      </View>

      <WeatherScreen onCityChange={setCity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9ff',
  },
  header: {
    padding: 50,
    backgroundColor: "#6bbbd6ff",
    justifyContent: 'flex-start',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 28,
  }
})
