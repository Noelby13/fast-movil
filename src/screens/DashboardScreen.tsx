import React, { useState , useEffect} from 'react'
import { Text, View, Image , StyleSheet, TouchableOpacity,FlatList, ActivityIndicator,} from 'react-native'
import { useAuthStore } from '../services/store/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Searchbar, Card,  Button} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useCartStore } from '../services/store/cartStore';
import { useRestaurantStore } from '../services/store/RestaurantStore';


export const DashboardScreen = ({navigation}) => {

   const {user}= useAuthStore()
   const [searchQuery, setSearchQuery] = useState('')
   const {qt, setQt} = useCartStore()
   const [isVisible, setIsVisible]=useState(true)
   const [kiosks, setKiosks] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const restaurants = useRestaurantStore((state)=> state.restaurants)
   const selectRestaurant = useRestaurantStore((state)=> state.selectResturant)

   useEffect(() => {
    fetchKiosks();
    }, []);

    const fetchKiosks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://fast.pockethost.io/api/collections/tienda/records');
        const data = await response.json();
        setKiosks(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Manejar el error adecuadamente en tu aplicación
      } finally {
        setIsLoading(false);
      }
    };

    const handleCardOnPress = async (item) => {
      const result = await selectRestaurant(item);
      console.log("Restaurante seleccionado: ", item.nombre);
      if (result){
        navigation.navigate('RestaurantScreen');
      }
    };

    const renderKioskCard = ({item}) => (
      <TouchableOpacity activeOpacity={1} key={item.id} onPress={() => handleCardOnPress(item) } style={{paddingHorizontal:0, }}>
        <Card style={styles.cardProduct} elevation={1}>
          <Card.Cover source={{ uri: `https://fast.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.imagen}` }} style={{ height: 140 }} />
          <Card.Title title={item.nombre} subtitle={item.direccion} titleStyle={{ marginTop: 10, fontWeight: 'bold' }} />
          <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <AntDesign name="staro" size={20} color="#FF7622"  />
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 4.7</Text> 
              <Entypo name="time-slot" size={19} color="#FF7622" style={{marginLeft:10}} />
              <Text style={{ fontSize: 14, marginLeft:0 }}> 20 min</Text> 
            </View>

          </Card.Content>
        </Card>
      </TouchableOpacity>
    );

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
            <TouchableOpacity style={styles.menuIcon} onPress={()=>navigation.openDrawer()}>
              <AntDesign name="bars" size={24} color="#181C2E"  />
            </TouchableOpacity>
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
          <View style={{marginTop:30, }} >
            <View  style={{paddingLeft: 10, paddingRight:4}}><Text >Kioscos abiertos</Text></View>
            <FlatList
              data={restaurants}
              renderItem={renderKioskCard}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 200 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              alwaysBounceVertical={false}
              bounces={false}
              overScrollMode="never"
              style={{paddingLeft: 6, paddingRight:6, }}            
            />
          </View>
 
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor:'#FFF',
    paddingLeft: 2, 
    paddingRight: 2,
  },
  header:{
    width:'100%',
    // backgroundColor:'red',
    marginTop:20,
    height:49,
    flexDirection:'row',
    // justifyContent: 'space-between',
    alignItems:'center',// Añade esta línea
    paddingLeft: 6,
    paddingRight: 6, 

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
    marginTop:30,
    paddingLeft:6,
    paddingRight:6
  },
  cardProduct:{
    width:'100%',
    height:'auto',
    backgroundColor:'#fff',
    marginTop:10

  }

})