
import { NavigationContainer } from "@react-navigation/native";
import { Text,StyleSheet, View} from "react-native";
import { PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen} from "./src/screens/LoginScreen";
import { SplashScreen } from "./src/screens/SplashScreen";
import React from 'react';
import { DashboardScreen } from "./src/screens/DashboardScreen";




const Stack = createStackNavigator()



export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown:false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen}></Stack.Screen>
          <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} screenOptions ={{headerShown:true}}></Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
