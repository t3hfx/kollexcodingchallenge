import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Navigation} from '@/navigation/Navigation';

StatusBar.setBarStyle('light-content');

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
