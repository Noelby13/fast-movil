// DrawerItem.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface Props {
    onPress?, 
    label?: string; 
    IconComponent?: React.ComponentType<any>; 
  }

const CustomDrawerItem = ({ onPress, label, IconComponent }:Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        {IconComponent && <IconComponent/>}
        <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  iconContainer: {
    marginRight: 10,
    // Define the size or other styles for the icon container if necessary
  },
  itemText: {
    fontSize: 16,
    // Estilos adicionales para el texto
  },
});

export default CustomDrawerItem;