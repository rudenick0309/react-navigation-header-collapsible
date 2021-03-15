import 'react-native-gesture-handler';

import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home/Home';
import Detail from './src/screens/Detail/Detail';
import HomeStackScreen from './src/navigation/HomeStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={Detail} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
