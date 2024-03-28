import React from 'react'
import { Text, View, Image } from 'react-native'
import { useAuthStore } from '../services/store/authStore'

export const DashboardScreen = () => {

   const {user}= useAuthStore()

   const getImage =(collectionId,id,imagen)=>{
    return `https://fast.pockethost.io/api/files/${collectionId}/${id}/${imagen}`
   }

   const imageUrl = getImage(user.collectionId, user.id, user.avatar); // Reemplaza 'collectionId' y 'id' según corresponda


  return (
    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <Text>Hola {user.name}</Text>
        {user.avatar && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 , borderRadius:100}} />}
    </View>
  )
}
