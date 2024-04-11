import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuthStore } from '../services/store/authStore'
import { Ionicons , AntDesign} from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import { useCartStore } from '../services/store/cartStore';
import { Button, Card } from 'react-native-paper';

export default function ProductScreen({navigation}) {
    const {user}= useAuthStore()
    const {qt, setQt, removeQt} = useCartStore()





  return (
    <SafeAreaView style={styles.backgroundContainer}>

    <View style={styles.header}>
            <View style={styles.menuIcon}>
                <Ionicons name="chevron-back" size={30} color="#5E616F" onPress={navigation.goBack}/>
            </View>
            
            <View style={styles.shoppingcart_container}>
              <View style={styles.shoppingcartIcon}>
                <AntDesign name="shoppingcart" size={28} color="white" />
                {qt>0 &&(<View style={styles.cartCount} ><Text style={styles.cartCount_text}>{qt}</Text></View>)}
              </View>
            </View>
    </View>
    <View>
        <Text> Goku, esta vaina es seria</Text>
        <Button mode='contained'  onPress={()=>setQt(1)}>
            <Text>Agregar producto</Text>
        </Button>
        <Button mode='contained'  onPress={()=>removeQt(1)}>
            <Text>Quitar producto</Text>
        </Button>

    </View>
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
    header:{
      width:'100%',
      // backgroundColor:'red',
      marginTop:20,
      height:49,
      flexDirection:'row',
      // justifyContent: 'space-between',
      alignItems:'center' // Añade esta línea
  
    },
    menuIcon:{
      width:45,
      height:45,
      borderRadius:45,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#ECF0F4'
    },
    textContainer:{
      marginLeft:18,
      flexDirection:'column',
      paddingTop:4,
  
    },
    textWelcome:{
      fontSize:12,
      fontWeight:'bold',
      color:'#FC6E2A'
    },
    textWelcome_subtitle:{
      color:'#676767',
      fontSize:14,
      marginTop:2
    },
  
    shoppingcart_container:{
      marginLeft:'auto'
    },
    shoppingcartIcon:{
      width:45,
      height:45,
      backgroundColor:"#181C2E",
      justifyContent:'center',
      alignItems:'center',
      borderRadius:45,
    },
    cartCount:{
      width:20,
      height:20,
      backgroundColor:"#FF7622",
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      right:0,
      top:0,
  
    },
    cartCount_text:{
      color:'white',
      fontSize:13,
      fontWeight:'bold'
    },
    searchContainer:{
      marginTop:30
    },
    cardProduct:{
      width:'100%',
      height:'auto',
      backgroundColor:'#fff',
      marginTop:10
  
    }
  
  })