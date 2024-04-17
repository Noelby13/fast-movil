import React from 'react';
import { TouchableOpacity, StyleSheet, View} from 'react-native';
// Importa el hook de navegación si estás usando react-navigation u otro manejador de rutas
import { useNavigation } from '@react-navigation/native';
import { Ionicons , AntDesign} from '@expo/vector-icons';


const BackButton = ({goBack}) => {
  const navigation = useNavigation();

  // Define una función para manejar el evento onPress que decidirá qué función de goBack utilizar
  const handlePress = () => {
    if (goBack) {
      goBack(); // Si goBack fue pasado como prop, úsalo
    } else {
      navigation.goBack(); // Si no, usa el goBack de useNavigation
    }
  };


  return (
      <TouchableOpacity  style={styles.container} onPress={handlePress}>
          <Ionicons name="chevron-back" size={30} color="#5E616F" />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        borderRadius:45,
        width:45,
        height:45,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ECF0F4'

      },
})

export default BackButton;
