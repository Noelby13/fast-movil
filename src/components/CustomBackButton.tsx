import React from 'react';
import { TouchableOpacity, StyleSheet, View} from 'react-native';
// Importa el hook de navegación si estás usando react-navigation u otro manejador de rutas
import { useNavigation } from '@react-navigation/native';
import { Ionicons , AntDesign} from '@expo/vector-icons';


const BackButton = () => {
  const navigation = useNavigation();

  return (
      <TouchableOpacity  style={styles.container} onPress={navigation.goBack}>
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
