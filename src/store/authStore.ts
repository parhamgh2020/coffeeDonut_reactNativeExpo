// authStore.ts
import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
  password: string;
  imagePath?: string;
}


interface AuthState {
  isAuthenticated: boolean;
  username: string;
  users: User[];
  login: (username: string, password: string) => { is_succeed: boolean, msg: string };
  signUp: (username: string, password: string) => { is_succeed: boolean, msg: string };
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isAuthenticated: false,
      username: '',
      users: [],
      updateUserImage: (imagePath: string) => {
        const username: string = get().username
        const index = get().users.findIndex(item => item.username === username);
        console.log("🚀 ~ index:", index)
        console.log("🚀 ~ username:", username)
        if (index !== -1) {
          set(produce((state: AuthState) => {
            state.users[index].imagePath = imagePath
          }))
        }
      },
      getImagePath: () => {
        const username: string = get().username
        const user = get().users.find(user => {
          return user.username === username
        })
        console.log("🚀 ~ user:", user)

        if (user) {
          return user.imagePath
        } else {
          return null
        }
      },
      login: (username: string, password: string) => {
        const user = get().users.find((user) => user.username === username && user.password === password);
        if (user) {
          set(produce((state: AuthState) => {
            state.isAuthenticated = true;
            state.username = username;
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
            });
            state.isAuthenticated = true;
            state.username = username;
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
