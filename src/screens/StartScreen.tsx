import React from 'react'
import { StyleSheet, KeyboardAvoidingView, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../core/theme'
import { BackGround} from '../components/BackGround'
import { LogoFast } from '../components/LogoFast'
import { Text } from 'react-native-paper'
import Header from '../components/Header'
import Button from '../components/Button'

export const StartScreen = ({navigation}) => {
  return (
    <BackGround>
        <LogoFast></LogoFast>
      <Header>Evita Filas innecesarias dentro de la universidad</Header>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}  >
        Login
      </Button>

    </BackGround>
  )
}

const styles = StyleSheet.create({
    safeContainer:{
        flex: 1,
        width: '100%',
        backgroundColor: "#121223"
    }

})
