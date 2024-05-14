// authStore.ts
import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      users: [],
      login: (username: string, password: string) => set(
        produce(state => {
          state.isAuthenticated = true
        }
        )
      ),
      // login: (username: string, password: string) => set(
      //   produce(state => {
      //     const user: any = state.users.find((item: any) => item.user.username === username)
      //     if (user) {
      //       if (user.password === password) {
      //         state.isAuthenticated = true
      //         return {
      //           is_succeed: true,
      //           msg: 'logged in successfully'
      //         }
      //       } else {
      //         state.isAuthenticated = false
      //         return {
      //           is_succeed: false,
      //           msg: 'the password is wrong'
      //         }
      //       }
      //     } else {
      //       state.isAuthenticated = false
      //       return {
      //         is_succeed: false,
      //         msg: 'username not existed'
      //       }
      //     }
      //   })
      // ),
      logout: () => set({ isAuthenticated: false }),
      signUp: (username: string, password: string) => set(
        produce(state => {
          const user = state.users.find((item: any) => item.user.username === username)
          if (user) {
            return {
              is_succeed: false,
              msg: 'the username is already existed'
            }
          } else {
            state.users.unshift({
              username,
              password,
              FavoritesList: [],
              OrderHistoryList: [],
            })
            state.isAuthenticated = true
            return {
              is_succeed: false,
              msg: 'sign up successfully'
            }
          }
        })
      )
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
);
