import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuthStore } from '../services/store/authStore';

export const CustomDrawerContent = (props) => {
  const { user } = useAuthStore();
  const imageUrl = `https://fast.pockethost.io/api/files/${user.collectionId}/${user.id}/${user.avatar}`;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        {user.avatar && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
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
});
