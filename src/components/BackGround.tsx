import React from 'react'
import { KeyboardAvoidingView, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const BackGround = ({ children }) => {
  return (
    <SafeAreaView style ={styles.safeContainer}> 
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      { children }
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    safeContainer:{
        flex: 1,
        width: '100%',
        backgroundColor: "#fff"
    },
    container:{
        flex: 1,
        padding:20,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    }

})