import React from 'react';
import HomeScreen from '../screens/Home/Home';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTopTab from '../screens/Home/HomeTopTab';
import {Platform} from 'react-native';
import {MySearchBar} from '../header';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeTopTab}
        options={
          Platform.OS === 'ios'
            ? {headerTitle: () => <MySearchBar />}
            : {
                header: () => <MySearchBar />,
              }
        }
        // options={{headerShown: false}}
      />
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </HomeStack.Navigator>
  );
}
