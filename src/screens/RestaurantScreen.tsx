// import { View, Text , StyleSheet, TouchableOpacity,Image} from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import CustomHeader from '../components/CustomHeader'
// import BackButton from '../components/CustomBackButton'
// import SafeContainer from '../components/SafeContainer'
// import ShoppingCart from '../components/ShoppingCart'
// import { Card } from 'react-native-paper'
// import { AntDesign } from '@expo/vector-icons';
// import { useRestaurantStore } from '../services/store/RestaurantStore'
// import { useNavigation } from '@react-navigation/native'

// export default function RestaurantScreen() {

//   const selectedRestaurant =useRestaurantStore((state)=> state.selectedRestaurant)
//   const removeRestaurantSelected =useRestaurantStore((state)=> state.removeRestaurantSelected)
//   const navigation = useNavigation()

//   const goBack=()=>{
//     navigation.goBack()
//     removeRestaurantSelected()
//     console.log("Restaurante seleccionado eliminado")
//   }

//   // const renderKioskCard = () => (
//   //     <Card style={styles.cardProduct} elevation={0}  >
//   //       <Card.Cover source={{ uri: `https://fast.pockethost.io/api/files/${selectedRestaurant.collectionId}/${selectedRestaurant.id}/${selectedRestaurant.imagen}` }} style={{ height: 140 }} />
//   //       <Card.Title title={selectedRestaurant.nombre} subtitle={selectedRestaurant.direccion} titleStyle={{ marginTop: 10, fontWeight: 'bold' }} />
//   //       <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
//   //         <AntDesign name="staro" size={20} color="#FF7622" style={{ marginTop: 3, }} />
//   //         <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 4.7</Text>
//   //       </Card.Content>
//   //     </Card>
//   // );

// const renderKioskCard = () => {
//   if (!selectedRestaurant) return null;  // No renderizar si selectedRestaurant es nulo

//   return (
//     <Card style={styles.cardProduct} elevation={0}>
//       <Card.Cover source={{ uri: `https://fast.pockethost.io/api/files/${selectedRestaurant.collectionId}/${selectedRestaurant.id}/${selectedRestaurant.imagen}` }} style={{ height: 140 }} />
//       <Card.Title title={selectedRestaurant.nombre} subtitle={selectedRestaurant.direccion} titleStyle={{ marginTop: 10, fontWeight: 'bold' }} />
//       <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <AntDesign name="staro" size={20} color="#FF7622" style={{ marginTop: 3 }} />
//         <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 4.7</Text>
//       </Card.Content>
//     </Card>
//   );
// };

//   const renderKiosk = () => (
//     <View style={styles.cardProduct}  >
//       <Image source ={{ uri: `https://fast.pockethost.io/api/files/${selectedRestaurant.collectionId}/${selectedRestaurant.id}/${selectedRestaurant.imagen}` }} style={{ height: 140 }} />
//       <Text>{selectedRestaurant.nombre}</Text>
//     </View>
// );

//   return (
//     <SafeContainer>
//         <CustomHeader LeftIconComponent={() => <BackButton goBack={goBack} />} RightIconComponent={ShoppingCart} />
//         {console.log(selectedRestaurant)}
//         {renderKioskCard()}

//     </SafeContainer>

//   )
// }

// const styles = StyleSheet.create({
//   cardProduct:{
//     marginTop:24,
//     backgroundColor:'#fff',
//     borderWidth:0,
//     borderColor:'#fff',

//     shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
//     shadowOffset: { height: 0, width: 0 },
//     shadowOpacity: 0,
//     shadowRadius: 0,

//     elevation: 0 ,// Remove Shadow for Android

//   }

// })

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";
import BackButton from "../components/CustomBackButton";
import SafeContainer from "../components/SafeContainer";
import ShoppingCart from "../components/ShoppingCart";
import { Card } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

import { useRestaurantStore } from "../services/store/RestaurantStore";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from "../services/store/cartStore";

export default function RestaurantScreen() {
  const selectedRestaurant = useRestaurantStore(
    (state) => state.selectedRestaurant
  );
  const removeRestaurantSelected = useRestaurantStore(
    (state) => state.removeRestaurantSelected
  );
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
 const setQt = useCartStore((state) => state.setQt);

  useEffect(() => {
    const cargarProductos = async () => {
      await fetchProducts();
    };
    if (selectedRestaurant) {
      cargarProductos();
    }
  }, [selectedRestaurant]);  // Dependiendo de `selectedRestaurant` para recargar cuando cambie
  

  const goBack = () => {
    if (removeRestaurantSelected()) {
      setProducts([]); // Limpia el estado de productos
      navigation.goBack();
    }
  };

  interface IResponse {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: IProducto[];
  }

  interface IProducto {
    Image: string;
    categoria: string[];
    collectionId: string;
    collectionName: string;
    created: Date;
    descripcion: string;
    id: string;
    nombre: string;
    precio: number;
    tienda: string;
    updated: Date;
  }

  const fetchProducts = async () => {
    const url = `https://fast.pockethost.io/api/collections/producto/records?filter=(tienda='${selectedRestaurant.id}')`;
    try {
      const response = await fetch(url);
      console.log("URL", url);

      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }

      const data = await response.json(); // Update the type of 'data' to be an array of 'IProducto' objects
      setProducts(data.items);
      console.log("Productos cargados:", products);
      setIsLoading(false);
    } catch (error) {
      console.error("C-Error al obtener los productos:", error);
    }
  };

  const renderKioskCard = () => {
    if (!selectedRestaurant) return null; // No renderizar si selectedRestaurant es nulo

    return (
      <Card style={styles.cardProduct} elevation={0}>
        <Card.Cover
          source={{
            uri: `https://fast.pockethost.io/api/files/${selectedRestaurant.collectionId}/${selectedRestaurant.id}/${selectedRestaurant.imagen}`,
          }}
          style={{ height: 140 }}
        />
        <Card.Title
          title={selectedRestaurant.nombre}
          subtitle={selectedRestaurant.direccion}
          titleStyle={{ marginTop: 10, fontWeight: "bold" }}
        />
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
              <AntDesign name="staro" size={20} color="#FF7622"  />
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}> 4.7</Text> 
              <Entypo name="time-slot" size={19} color="#FF7622" style={{marginLeft:10}} />
              <Text style={{ fontSize: 14, marginLeft:0 }}> 20 min</Text> 
            </View>
        </Card.Content>
      </Card>
    );
  };

  const renderProduct = ({ item }) => (
    <Card style={styles.cardProduct}>
      <Card.Cover
        source={{
          uri: `https://fast.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Image}`,
        }}
        style={{ height: 140 }}
      />
      <Card.Title
        title={item.nombre}
        subtitle={`$${item.precio}`}
        titleStyle={{ marginTop: 10, fontWeight: "bold" }}
      />
      <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="staro"
          size={20}
          color="#FF7622"
          style={{ marginTop: 3 }}
        />
        <Text style={{ fontSize: 14, fontWeight: "bold" }}> 4.7</Text> 
      </Card.Content>
    </Card>
  );

  const handleProductPress = (item) => {
    navigation.navigate('ProductDescription', {product: item});
  }

  const renderProductosIphone = ({item}) => {
    return (
      <Pressable onPress={()=> handleProductPress(item)} 
      style={({pressed}) => [
        {
          backgroundColor: pressed
            ? 'rgb(210, 230, 255)'
            : 'white'
        },
      ]}
      
      >
      <View style={styles.product} >
        <Image source={{uri:`https://fast.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Image}`}} style={styles.imageProduct} />
        <Text style={styles.textProduct}>{item.nombre}</Text>
        <Text style={styles.textDescription}>{item.descripcion}</Text>
        <View style={styles.productInferiorPanel}>
          <Text style={styles.productPrice}>${item.precio}</Text>
          <TouchableOpacity style={styles.addProduct} onPress={()=>setQt(1)}>
          <Ionicons name="add-circle-sharp" size={30} color="#FF7622"   />          
          </TouchableOpacity>
        </View>
      </View>
      </Pressable>

    );
  }

  const renderProductosAndroid = ({item}) => {
    return (
      <TouchableNativeFeedback onPress={()=> handleProductPress(item)}>
      <View style={styles.product} >
        <Image source={{uri:`https://fast.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.Image}`}} style={styles.imageProduct} />
        <Text style={styles.textProduct}>{item.nombre}</Text>
        <Text style={styles.textDescription}>{item.descripcion}</Text>
        <View style={styles.productInferiorPanel}>
          <Text style={styles.productPrice}>${item.precio}</Text>
          <TouchableOpacity style={styles.addProduct} onPress={()=>setQt(1)}>
          <Ionicons name="add-circle-sharp" size={30} color="#FF7622"   />          
          </TouchableOpacity>
        </View>
      </View>
      </TouchableNativeFeedback>

    );
  }

  
  return (
    <SafeContainer >
      
      <CustomHeader
        LeftIconComponent={() => <BackButton goBack={goBack} />}
        RightIconComponent={ShoppingCart}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#FF7622" />
      ) : (
        <>
          {renderKioskCard()}

          <FlatList
            data={products}
            renderItem={ renderProductosIphone   }
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{alignItems:'center', justifyContent:'center', marginTop: 10, paddingBottom:30}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  
  cardProduct: {
    marginTop: 24,
    backgroundColor: "#fff",
    borderWidth: 0,
    borderColor: "#fff",
    shadowColor: "rgba(0,0,0, 0.0)", // Remove Shadow for iOS
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0, // Remove Shadow for Android
  },
  product:{
    width: 170,
    height: 185,
    marginTop:10,
    backgroundColor:'#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems:'center',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 3,
  },
  imageProduct:{
    width: 114,
    height: 90,
    borderRadius: 10,
  },
  textProduct:{
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  textDescription:{
    fontSize: 10  ,
    fontWeight: 'normal',
    marginTop: 5,
  },
  productInferiorPanel:{
    flex:1,
    flexDirection:'row',
    width: '100%',
    // backgroundColor:'blue',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems:'center',
  },
  productPrice:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
  },
  addProduct:{
    marginLeft: 'auto',
    marginRight: 2,
  }
});
