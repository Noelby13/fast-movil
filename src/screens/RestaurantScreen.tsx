import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/CustomHeader'
import BackButton from '../components/CustomBackButton'
import SafeContainer from '../components/SafeContainer'
import ShoppingCart from '../components/ShoppingCart'

export default function RestaurantScreen({navigation}) {
  return (
    <SafeContainer>
        <CustomHeader LeftIconComponent={BackButton} RightIconComponent={ShoppingCart}/>
    </SafeContainer> 
   
  )
}

const styles = StyleSheet.create({
    
})