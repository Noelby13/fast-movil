
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'


export default function SafeContainer({children}) {
  return (
    <SafeAreaView style={styles.backgroundContainer}>
        {children}
    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor:'#FFF',
        paddingLeft: 8, 
        paddingRight: 6
      },
})

