/*
"Mistakes are the portals of discovery"
- James Joyce (1882-1941)
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';

import Routes from './src/Routes';

LogBox.ignoreAllLogs()

const App = () => {
  return (
    <>
      <Routes />
      <StatusBar style="inverted" />
    </>
  );
}

export default App;
