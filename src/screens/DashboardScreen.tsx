import React, { useState } from 'react'
import { Text, View, Image , StyleSheet, TouchableOpacity,} from 'react-native'
import { useAuthStore } from '../services/store/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { Searchbar, Card,  Button} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useCartStore } from '../services/store/cartStore';


export const DashboardScreen = ({navigation}) => {

   const {user}= useAuthStore()
   const [searchQuery, setSearchQuery] = useState('')
   const {qt, setQt} = useCartStore()
   const [isVisible, setIsVisible]=useState(true)

   const getImage =(collectionId,id,imagen)=>{
    return `https://fast.pockethost.io/api/files/${collectionId}/${id}/${imagen}`
   }

   const imageUrl = getImage(user.collectionId, user.id, user.avatar);
   
   const search = ()=>{

   }// Reemplaza 'collectionId' y 'id' según corresponda


  return (
    <SafeAreaView style={styles.backgroundContainer}>
      <View style={styles.backgroundContainer}>
          {/* <Text>Hola {user.name}</Text>
          {user.avatar && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 , borderRadius:100}} />} */}
          <View style={styles.header}>
            <View style={styles.menuIcon}>
              <AntDesign name="bars" size={24} color="#181C2E" onPress={()=>navigation.openDrawer()} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textWelcome}>HOLA {user.name.toLocaleUpperCase()}</Text>
              <Text style={styles.textWelcome_subtitle}>Bienvenidos a FAST</Text>
              
            </View>
            <View style={styles.shoppingcart_container}>
              <View style={styles.shoppingcartIcon}>
                <AntDesign name="shoppingcart" size={28} color="white" />
                {qt>0 &&(<View style={styles.cartCount} ><Text style={styles.cartCount_text}>{qt}</Text></View>)}
              </View>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Buscar platos, restaurantes"
              onChangeText={setSearchQuery}
              value={searchQuery}
              mode='bar'
              iconColor='#181C2E'
              inputStyle={{color: '#676767'}}
              style={{borderRadius:4, backgroundColor:'#F6F6F6', color:'#676767', }}
              onChange={search}
            />
          </View>
          <ScrollView style={{marginTop:30}}>
            <View><Text >Kioscos abiertos</Text></View>
            <TouchableOpacity onPress={()=>navigation.navigate('ProductCard')}>
              <Card style={styles.cardProduct} elevation={2}>
                <Card.Cover source={{ uri: 'https://i.pinimg.com/564x/ba/64/fc/ba64fcc24e042f9fc5d6a960c2bc41eb.jpg' } } style={{height:140}}/>
                <Card.Title title="McDonald's" subtitle="Hamburguesas -Pollo -Helado" titleStyle={{marginTop:10, fontWeight:'bold'}} />
                <Card.Content style={{flexDirection:'row', alignItems:'center'}}>
                  <AntDesign name="staro" size={20} color="#FF7622" style={{marginTop:3,}} />
                  <Text style={{fontSize:14, fontWeight:'bold', }}> 4.7</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity>
              <Card style={styles.cardProduct} elevation={2}>
                <Card.Cover source={{ uri: 'https://www.pepper-design.net/system/projects/main_images/000/000/052/medium/WhatsApp_Image_2020-09-09_at_3.22.24_PM.jpeg?1599688580' } } style={{height:140}}/>
                <Card.Title title="Guapollón" subtitle="Pollo a precios de universitarios!" titleStyle={{marginTop:10, fontWeight:'bold'}} />
                <Card.Content style={{flexDirection:'row', alignItems:'center',}}>
                  <AntDesign name="staro" size={20} color="#FF7622" style={{marginTop:3,}} />
                  <Text style={{fontSize:14, fontWeight:'bold',paddingTop:3}}> 4.9</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>

            <Card style={styles.cardProduct} elevation={2}>
              <Card.Cover source={{ uri: 'https://i.pinimg.com/564x/ba/64/fc/ba64fcc24e042f9fc5d6a960c2bc41eb.jpg' } } style={{height:140}}/>
              <Card.Title title="McDonald's" subtitle="Hamburguesas -Pollo -Helado" titleStyle={{marginTop:10, fontWeight:'bold'}} />
              <Card.Content style={{flexDirection:'row', alignItems:'center'}}>
                <AntDesign name="staro" size={20} color="#FF7622" style={{marginTop:3,}} />
                <Text style={{fontSize:14, fontWeight:'bold', }}> 4.7</Text>
              </Card.Content>
            </Card>

          </ScrollView>
 
         
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