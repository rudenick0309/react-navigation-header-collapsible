import React from 'react';
import {
  View,
  Text,
  Animated,
  useWindowDimensions,
  FlatList,
  TextInput,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  useCollapsibleHeader,
  useCollapsibleSubHeader,
  CollapsibleSubHeaderAnimator,
} from 'react-navigation-collapsible';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FirstRoute} from '../Swipe/componentOne';
import {SecondRoute} from '../Swipe/componentTwo';

const Tab = createMaterialTopTabNavigator();

// FirestRoute 와 SecondRoute 를 탭뷰로 감싸 줄 컴포넌트
function HomeTopTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={FirstRoute} />
      <Tab.Screen name="Settings" component={SecondRoute} />
    </Tab.Navigator>
  );
}

export default HomeTopTab;
