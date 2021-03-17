import React from 'react';
import {View, TextInput} from 'react-native';

export const MySearchBar = () => (
  <View
    style={{
      padding: 15,
      width: '100%',
      backgroundColor: 'blue',
      height: 60,
      // zIndex: 999,
    }}>
    <TextInput placeholder="search here" />
  </View>
);
