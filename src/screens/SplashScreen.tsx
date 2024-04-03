import React, { useEffect } from 'react';
import { BackGround } from '../components/BackGround';
import { LogoFast } from '../components/LogoFast';
import { useRestaurantStore } from '../services/store/RestaurantStore';

export const SplashScreen = ({ navigation }) => {
  const loadRestaurants = useRestaurantStore((state) => state.loadRestaurants);

  useEffect(() => {
    // Iniciar la carga de los datos de los restaurantes
    const loadData = async () => {
      await loadRestaurants(); // Carga la primera página con 10 restaurantes, ajusta según sea necesario
      // Navegar a la siguiente pantalla una vez cargados los datos
      navigation.navigate('LoginScreen');
    };

    loadData();
    console.log('Hola')
  }, [navigation, loadRestaurants]);

  return (
    <BackGround>
      <LogoFast />
      {/* Puedes agregar más elementos aquí si necesitas */}
    </BackGround>
  );
};
