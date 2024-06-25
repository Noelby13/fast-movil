import { Text, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import SafeContainer from "../components/SafeContainer";
import CustomHeader from "../components/CustomHeader";
import ShoppingCart from "../components/ShoppingCart";
import BackButton from "../components/CustomBackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Card, TextInput, Button, Divider } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { useCartStore } from "../services/store/cartStore";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProductDescription({}) {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  console.log(product, "product");
  const [quantity, setQuantity] = useState(1);
 const setQt = useCartStore((state) => state.setQt);


  const goBack = () => {
    navigation.goBack();
  };

  const renderProductCard = () => {
    return (
      <Card style={styles.cardProduct} elevation={0}>
        <Card.Cover
          source={{
            uri: `https://fast.pockethost.io/api/files/${product.collectionId}/${product.id}/${product.Image}`,
          }}
          style={{ height: 140 }}
        />
        <Card.Title
          title={product.nombre}
          subtitle={product.descripcion}
          titleStyle={{ marginVertical: 0, fontWeight: "bold" }}
          subtitleStyle={{ marginTop: 0 }}
        />
        <Card.Content>
          <Text style={styles.textPrice}>C${product.precio}</Text>
        </Card.Content>
      </Card>
    );
  };

  const addProduct = () => {
    setQuantity(quantity + 1);
  }

  const removeProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const addProductToCart = () => {
    setQt(quantity);
    navigation.goBack();
  }



  return (
    <SafeContainer>
      <ScrollView>
        <CustomHeader
          LeftIconComponent={() => <BackButton goBack={goBack} />}
          RightIconComponent={ShoppingCart}
        />
        {renderProductCard()}
        <Divider  style ={styles.divider}/>
          <View style={styles.textInput}>
            <Text style={styles.textIndicaciones}>
              Notas para este producto
            </Text>

            <TextInput
              label="Ingresa tus indicaciones"
              mode="outlined"
              outlineStyle={{ borderColor: "black" }}
            />
          </View>

          <Divider  style ={styles.divider}/>
        
          <View style={styles.productDetailsConfirmation}>
            <View style={styles.productQuantity}>
              <TouchableOpacity onPress={removeProduct}>
              <AntDesign name="minus" size={20} color="black" style ={{marginLeft:5}} />
              </TouchableOpacity>
              <Text style={{fontWeight:"bold", fontSize:17 }} >{quantity}</Text>
              <TouchableOpacity onPress={addProduct} >
              <AntDesign name="plus" size={20} color="black"  style={{marginRight:5}}/>
              </TouchableOpacity>
            </View>
            <Button mode="contained" style={styles.button} onPress={addProductToCart}>
              <Text>Agregar</Text>
            </Button>
          </View>
      </ScrollView>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  textInput: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 14,
  },
  textPrice: {
    marginTop: 6,
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    height: 62,
    justifyContent: "center",
    backgroundColor: "#FF7622",
    flex: 2,
  },
  textIndicaciones: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productDetailsConfirmation: {
    marginTop: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  productQuantity: {
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    height: 62,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
    
  },
  divider: {
    borderWidth: 0.5,
    borderColor: "#ECF0F4",
    marginVertical: 10,
  },
});
