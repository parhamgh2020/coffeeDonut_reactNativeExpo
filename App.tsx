import React from 'react';
import Route from './src/Route';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./src/assets/fonts/Poppins-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Route />
  );
}
