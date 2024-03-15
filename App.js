import { NavigationContainer } from "@react-navigation/native";
import { Text,StyleSheet, View} from "react-native";
import { PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { StartScreen } from "./src/screens/StartScreen";

const Stack = createStackNavigator()


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen" screenOptions={{headerShown:false}}>
          <Stack.Screen name="StartScreen" component={StartScreen}></Stack.Screen>
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
