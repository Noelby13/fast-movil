import { View, Text , StyleSheet, TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/CustomHeader'
import BackButton from '../components/CustomBackButton'
import SafeContainer from '../components/SafeContainer'
import ShoppingCart from '../components/ShoppingCart'
import { Card } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { useRestaurantStore } from '../services/store/RestaurantStore'


export default function RestaurantScreen() {

  const selectedRestaurant =useRestaurantStore((state)=> state.selectedRestaurant)



  const renderKioskCard = () => (
      <Card style={styles.cardProduct} elevation={0}  >
        <Card.Cover source={{ uri: `https://fast.pockethost.io/api/files/${selectedRestaurant.collectionId}/${selectedRestaurant.id}/${selectedRestaurant.imagen}` }} style={{ height: 140 }} />
        <Card.Title title={selectedRestaurant.nombre} subtitle={selectedRestaurant.direccion} titleStyle={{ marginTop: 10, fontWeight: 'bold' }} />
        <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="staro" size={20} color="#FF7622" style={{ marginTop: 3, }} />
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 4.7</Text> 
        </Card.Content>
      </Card>
  );

  const renderKiosk = () => (
    <View style={styles.cardProduct}  >
      <Image source ={{ uri: `https://fast.pockethost.io/api/files/${selectedRestaurant.collectionId}/${selectedRestaurant.id}/${selectedRestaurant.imagen}` }} style={{ height: 140 }} />
      <Text>{selectedRestaurant.nombre}</Text> 
    </View>
);




  return (
    <SafeContainer>
        <CustomHeader LeftIconComponent={BackButton} RightIconComponent={ShoppingCart} />
        {console.log(selectedRestaurant)}
        {renderKioskCard()}

    </SafeContainer> 
   
  )
}

const styles = StyleSheet.create({
  cardProduct:{
    marginTop:24,
    backgroundColor:'#fff',
    borderWidth:0,
    borderColor:'#fff',

    shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    
    elevation: 0 ,// Remove Shadow for Android
  

  }
    
})