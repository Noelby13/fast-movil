import {create} from 'zustand';

interface Response {
    page:       number;
    perPage:    number;
    totalItems: number;
    totalPages: number;
    items:      Item[];
}
interface Item {
    collectionId:   string;
    collectionName: string;
    correo:         string;
    created:        Date;
    direccion:      string;
    id:             string;
    imagen:         string;
    isOpen:         boolean;
    nombre:         string;
    telefono:       string;
    updated:        Date;
    userAdmin:      string;
}

interface RestaurantState {
    restaurants: Item[];
    selectedRestaurant: Item | null;
    totalPages: number;
    totalItems: number;
    loadRestaurants: () => Promise<void>;
    selectResturant: (item:Item)=>Promise<boolean>;
    removeRestaurantSelected: ()=>Boolean;
  }
  export interface Pokedex {
    page:       number;
    perPage:    number;
    totalItems: number;
    totalPages: number;
    items:      Item[];
}



export const useRestaurantStore = create<RestaurantState>((set) => ({
    restaurants: [],
    selectedRestaurant:null,
    totalPages: 0,
    totalItems: 0,
    // Función para cargar la información de los restaurantes
    loadRestaurants: async () => {
      try {
        const response = await fetch('https://fast.pockethost.io/api/collections/tienda/records', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          // Manejar respuestas no exitosas aquí
          throw new Error('Error al cargar los restaurantes');
        }
  
        const data: Response = await response.json();
  
        set({
          restaurants: data.items,
          totalPages: data.totalPages,
          totalItems: data.totalItems,
        });
        console.log("información de restaurantes cargadas")
  
      } catch (error) {
        console.error('Error loading restaurants:', error);
        // Aquí podrías manejar el estado de error, como actualizar una variable de estado para mostrar un mensaje de error en la UI
      }
    },
    selectResturant:async (item:Item)=>{
      set({selectedRestaurant:item})
      return true;
    },
    removeRestaurantSelected: ()=>{
      set({selectedRestaurant:null})
      return true
    }

  }));
  