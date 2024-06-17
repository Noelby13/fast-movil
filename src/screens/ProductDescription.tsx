import { Text, View, StyleSheet } from "react-native";
import SafeContainer from "../components/SafeContainer";
import CustomHeader from "../components/CustomHeader";
import ShoppingCart from "../components/ShoppingCart";
import BackButton from "../components/CustomBackButton";
import { useNavigation } from "@react-navigation/native";
export default function ProductDescription() {
  const navigation = useNavigation();


  const goBack = () => {
    navigation.goBack();
  };

  const renderProductCard = () => {
   

  }


  return (
    <SafeContainer>
      <CustomHeader
        LeftIconComponent={() => <BackButton goBack={goBack} />}
        RightIconComponent={ShoppingCart}
      />


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


});
