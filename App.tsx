import React from 'react';
import AppRouter from './src/AppRouter'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Remote debugger']);


export default function App() {

  return (
    <AppRouter />
  );
}


