import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Ionicons name="chevron-back" size={30} color="#5E616F" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius:45,
    position: 'absolute',
    top: 40,
    left: 24,
    width:45,
    height:45,
    alignItems:'center',
    justifyContent:'center',
  },

})
