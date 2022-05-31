import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {RootContainerStackParamList, Screens} from '@/navigation/constants';
import {Converter} from '@/screens/Converter';
import {SignIn} from '@/screens/SignIn';

const Stack = createNativeStackNavigator<RootContainerStackParamList>();
export const RootContainer = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
      initialRouteName={Screens.SignIn}>
      <Stack.Screen name={Screens.SignIn} component={SignIn} />
      <Stack.Screen name={Screens.Converter} component={Converter} />
    </Stack.Navigator>
  );
};
