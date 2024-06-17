import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { Text,StyleSheet, View} from "react-native";
import { PaperProvider } from "react-native-paper";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen} from "./src/screens/LoginScreen";
import { SplashScreen } from "./src/screens/SplashScreen";
import React from 'react';
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { CustomDrawerContent } from './src/components/CustomDrawerContent';
import SettingsScreen from './src/screens/SettingsScreen';
import ProductScreen from './src/screens/ProductScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import ProductDescription from './src/screens/ProductDescription';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function DashboardDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{headerShown:false}} drawerContent={props => <CustomDrawerContent {...props} />} >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="SettingScreen" component={SettingsScreen}  />
      <Drawer.Screen name="ProductCard" component={ProductScreen}  />
      <Drawer.Screen name="RestaurantScreen" component={RestaurantScreen}  />

      {/* Puedes agregar más pantallas al drawer si lo deseas */}
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown:false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen}></Stack.Screen>
          <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="DashboardScreen" component={DashboardDrawer} screenOptions ={{headerShown:true}}></Stack.Screen>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} screenOptions ={{headerShown:true}}></Stack.Screen>
          <Stack.Screen name="ProductDescription" component={ProductDescription} screenOptions ={{headerShown:true}}></Stack.Screen>
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
