// authStore.ts
import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
  password: string;
  FavoritesList: any[];
  OrderHistoryList: any[];
}

interface UsersImage {
  username: string;
  imagePath: string;
}

interface AuthState {
  isAuthenticated: boolean;
  users: User[];
  usersImage: UsersImage[];
  login: (username: string, password: string) => { is_succeed: boolean, msg: string };
  signUp: (username: string, password: string) => { is_succeed: boolean, msg: string };
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      users: [],
      usersImage: [],
      upsertUserImage: (username: string, imagePath: string) => {
        const index = get().users.findIndex((user) => user.username === username);
        if (index === -1) {
          set(produce((state: AuthState) => {
            state.usersImage.unshift({ username, imagePath })
          }));
        } else {
          set(produce((state: AuthState) => {
            state.usersImage[index].imagePath = imagePath;
          }));
        }
      },
      login: (username: string, password: string) => {
        const user = get().users.find((user) => user.username === username && user.password === password);
        if (user) {
          set(produce((state: AuthState) => {
            state.isAuthenticated = true;
          }));
          return { is_succeed: true, msg: 'Login successful' };
        } else {
          return { is_succeed: false, msg: 'Invalid username or password' };
        }
      },
      signUp: (username: string, password: string) => {
        const user = get().users.find((user) => user.username === username);
        if (user) {
          return { is_succeed: false, msg: 'The username already exists' };
        } else {
          set(produce((state: AuthState) => {
            state.users.unshift({
              username,
              password,
              FavoritesList: [],
              OrderHistoryList: [],
            });
            state.isAuthenticated = true;
          }));
          return { is_succeed: true, msg: 'Sign up successfully' };
        }
      },
      logout: () => {
        set(produce((state: AuthState) => {
          state.isAuthenticated = false;
        }));
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
);
