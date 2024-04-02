import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { useCartStore } from '../services/store/cartStore'
import { AntDesign } from '@expo/vector-icons';


export default function ShoppingCart() {
    const {qt, setQt} = useCartStore()

  return (
    <View style={styles.shoppingcart_container}>
        <View style={styles.shoppingcartIcon}>
        <AntDesign name="shoppingcart" size={28} color="white" />
        {qt>0 &&(<View style={styles.cartCount} ><Text style={styles.cartCount_text}>{qt}</Text></View>)}
        </View>
  </View>
  )
}
const styles = StyleSheet.create({
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
})