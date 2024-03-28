import {create} from 'zustand';
import pb from '../pocketbase/pocketbase';

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
    setUserAndToken: (user: UserRecord | null, token: string | null, isAuthenticated: boolean) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
  }
  
  export const useAuthStore = create<UserState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setUserAndToken: (user, token, isAuthenticated) => set({ user, token, isAuthenticated }),
   
    login: async (email, password) => {
        try {
          const body = JSON.stringify({
            identity: email,
            password: password,
          });
      
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
  }))
  
