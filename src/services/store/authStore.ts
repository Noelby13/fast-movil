import {create} from 'zustand';
import pb from '../pocketbase/pocketbase';

interface ErrorResponse {
  code: number;
  message: string;
  data: Data;
}

interface Data {
  email: Email;
}

interface Email {
  code: string;
  message: string;
}

interface UserRecord {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    updated: string;
    username: string;
    verified: boolean;
  }
  
interface ApiResponse {
    record: UserRecord;
    token: string;
  }


interface UserState {
    user: UserRecord | null;
    token: string | null;
    isAuthenticated: boolean;
    errorMessage: string | null;
    setUserAndToken: (user: UserRecord | null, token: string | null, isAuthenticated: boolean) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (email:string, name:string, password:string, passwordValidation:String) => Promise<boolean>;
  }
  
  export const useAuthStore = create<UserState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    errorMessage: null,
    setUserAndToken: (user, token, isAuthenticated) => set({ user, token, isAuthenticated }),
   
    login: async (email, password) => {
        try {
          const body = JSON.stringify({
            identity: email,
            password: password,
          });
          console.log(email, '-', password)
      
          const response = await fetch('https://fast.pockethost.io/api/collections/usersAdmin/auth-with-password', {
            method: 'POST',
            headers: {
              'Accept': 'application/json', // Indica que esperas recibir JSON
              'Content-Type': 'application/json', // Indica que el cuerpo de la solicitud es un objeto JSON
            },
            body: body,
          });
      
          if (!response.ok) {
    
            console.log('Response OK:', response.ok);
            const responseBody = await response.text(); // Intenta leer el cuerpo de la respuesta como texto si hay un error
            console.log('Response Body:', responseBody);

            return false;


          }
      
          const data: ApiResponse = await response.json();
      
          set({
            user: data.record,
            token: data.token,
            isAuthenticated: true,
          });
          console.log("Estoy actualizado: ", useAuthStore.getState().isAuthenticated)
          return true;
      
        } catch (error) {
          console.error('Login error:', error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          return false; // Devuelve false debido a un error
        }
      },
    logout: () => {
      set({ user: null, token: null, isAuthenticated: false });
    },
    register: async (email, password, passwordValidation, name) => {
      console.log('Valores pw ', password,'-', passwordValidation)
      try {
        const body = JSON.stringify({
          email: email,
          password: password,
          passwordConfirm: passwordValidation,
          name: name,
          // Aquí puedes agregar más campos según el modelo de usuario de tu backend.
        });
  
        const response = await fetch('https://fast.pockethost.io/api/collections/usersAdmin/records', { // Asegúrate de reemplazar este URL con el endpoint correcto para crear usuarios
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: body,
        });
  
        if (!response.ok) {
          // Manejar respuesta no exitosa, como mostrar un mensaje de error
          const errorResponse:ErrorResponse = await response.json();
          let errorMessage = "Ocurrió un error durante la creación de su cuenta";
          
          if (errorResponse.data && errorResponse.data.email && errorResponse.data.email.message) {
            switch(errorResponse.data.email.code) {
              case "validation_invalid_email":
                errorMessage = "El email es inválido o ya está en uso.";
                console.log("Buscando error")
                break;
              // Aquí puedes manejar otros códigos de error específicos si los hay
              default:
                errorMessage = "Error desconocido al validar el email.";
                break;
            }
          }// Mensaje por defecto
          set({errorMessage: errorMessage})
          return false;
        }
        
        // return await useAuthStore.getState().login(email, password);
         return true; 
  
      } catch (error) {
        console.error('Registration error:', error);
        // Manejar error, posiblemente actualizar algún estado para mostrar un mensaje
        return false;
      }
    },
  }))
  
