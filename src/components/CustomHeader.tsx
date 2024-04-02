import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define la interfaz para las props del componente CustomHeader
interface Props {
  LeftIconComponent: React.ComponentType<any>; 
  HeaderTextComponent?: React.ComponentType<any>; 
  RightIconComponent?: React.ComponentType<any>; 
}

const CustomHeader = ({ LeftIconComponent, HeaderTextComponent, RightIconComponent }:Props) => {
  return (
    <View style={styles.header}>
      {LeftIconComponent && <LeftIconComponent />}
      {HeaderTextComponent && <HeaderTextComponent />}
      {RightIconComponent && <RightIconComponent />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: 20,
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomHeader;