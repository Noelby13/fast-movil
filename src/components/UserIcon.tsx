import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';


export default function UserIcon() {
  return (
    <View style={styles.container}>
      <AntDesign name="user" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        
    }

})