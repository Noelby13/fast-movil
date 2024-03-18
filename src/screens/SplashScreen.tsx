import React, { useEffect } from 'react';
import { BackGround } from '../components/BackGround';
import { LogoFast } from '../components/LogoFast';

export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 800); // Cambiado a 1000 milisegundos para dar tiempo a ver la pantalla
    return () => clearTimeout(timer); // Limpieza al desmontar
  }, [navigation]);

  return (
    <BackGround>
      <LogoFast />
      {/* Puedes agregar más elementos aquí si necesitas */}
    </BackGround>
  );
};
