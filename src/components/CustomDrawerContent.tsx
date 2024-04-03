import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useAuthStore } from '../services/store/authStore';
import { Avatar , Drawer} from 'react-native-paper';
import CustomDrawerItem from './CustomDrawerItem';
import UserIcon from '../components/UserIcon';


export const CustomDrawerContent = (props) => {
  const { user } = useAuthStore();
  const imageUrl = `https://fast.pockethost.io/api/files/${user.collectionId}/${user.id}/${user.avatar}`;

  const navigateToScreen = (screenName) => {
    props.navigation.navigate(screenName);
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={styles.drawerHeader} >
        {user.avatar ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.profileImage}
          />
        ):(
          <Avatar.Text 
            size={100} 
            label={user.name.substring(0, 2).toUpperCase()} 
            style={styles.profileImage} // Si necesitas estilos específicos para Avatar.Text, ajusta aquí
          />
          )
        }
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <TouchableOpacity onPress={()=>navigateToScreen('RestaurantScreen')}>
        <Text>Restaurante- Screen</Text>
      </TouchableOpacity>

    
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawer:{


  },
  drawerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  customDrawerItem: {
    padding: 10,
    justifyContent: 'center',
    // Estilos adicionales según sea necesario
  },
  options:{
    padding:10,
    backgroundColor:'#F6F8FA'
  }
});
