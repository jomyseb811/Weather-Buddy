import { FlatList, StyleSheet, Text, View } from "react-native";
import  WeatherScreen from '@/src/screens/WeatherScreen'
export default function Index() {
  return (
    <View style={styles.container}>
            <View style={styles.header}><Text style={styles.headerText}>Mylom</Text></View>


   <WeatherScreen/>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
        flex: 1,
        backgroundColor:'#f9f9f9ff',
  },
   header:{
    padding:50,
       backgroundColor: "#6bbbd6ff",
    justifyContent:'flex-start',
  },
  headerText: {
      fontWeight:'bold',
    fontSize:28,
  }

 
})
