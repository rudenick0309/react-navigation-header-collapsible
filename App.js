import 'react-native-gesture-handler';

import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home/Home';
import Detail from './src/screens/Detail/Detail';
import HomeStackScreen from './src/navigation/HomeStack';
import HomeTopTab from './src/screens/Home/HomeTopTab';
import {Platform} from 'react-native';
import {MySearchBar} from './src/header';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="Home" component={HomeStackScreen} /> */}
        <Tab.Screen name="Home" component={HomeTopTab} />
        <Tab.Screen name="Settings" component={Detail} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// =============
// import React from 'react';
// import {View, StyleSheet, FlatList} from 'react-native';
// import {Tabs} from 'react-native-collapsible-tab-view';

// const HEADER_HEIGHT = 250;

// const Header = () => {
//   return <View style={styles.header} />;
// };

// const App = () => {
//   const renderItem = React.useCallback(({index}) => {
//     return (
//       <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
//     );
//   }, []);

//   return (
//     <Tabs.Container
//       HeaderComponent={Header}
//       headerHeight={HEADER_HEIGHT} // optional
//     >
//       <Tabs.Tab name="A">
//         <Tabs.FlatList
//           data={[0, 1, 2, 3, 4]}
//           renderItem={renderItem}
//           keyExtractor={(v) => v + ''}
//         />
//       </Tabs.Tab>
//       <Tabs.Tab name="B">
//         <Tabs.ScrollView>
//           <View style={[styles.box, styles.boxA]} />
//           <View style={[styles.box, styles.boxB]} />
//         </Tabs.ScrollView>
//       </Tabs.Tab>
//     </Tabs.Container>
//   );
// };

// const styles = StyleSheet.create({
//   box: {
//     height: 250,
//     width: '100%',
//   },
//   boxA: {
//     backgroundColor: 'white',
//   },
//   boxB: {
//     backgroundColor: '#D8D8D8',
//   },
//   header: {
//     height: HEADER_HEIGHT,
//     width: '100%',
//     backgroundColor: '#2196f3',
//   },
// });

// export default App;
// =============
/*
 import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Animated,
  Text,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

const DATA = [
  {name: 'Marissa Castillo'},
  {name: 'Denzel Curry'},
  {name: 'Miles Ferguson'},
  {name: 'Kenny Moreno'},
  {name: 'Shelby Craig'},
  {name: 'Jordyn Brewer'},
  {name: 'Tanya Walker'},
  {name: 'Nolan Figueroa'},
  {name: 'Sophia Gibbs'},
  {name: 'Vincent Sandoval'},
];
const HEADER_HEIGHT = 240;
const TAB_BAR_HEIGHT = 50;
const H_MIN_HEIGHT = 50;
const H_SCROLL_DISTANCE = HEADER_HEIGHT - TAB_BAR_HEIGHT;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = ({
  position,
  syncOffset,
  firstRef,
  onMomentumScrollBegin,
}: any) => {
  return (
    <Animated.FlatList
      ref={firstRef}
      scrollEventThrottle={1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: position}}}],
        {useNativeDriver: true},
      )}
      onMomentumScrollEnd={(e) => {
        syncOffset('first', e.nativeEvent.contentOffset.y);
      }}
      data={DATA}
      keyExtractor={(item, i) => String(i)}
      renderItem={({item}) => (
        <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
          <Text>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={{paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT}}
    />
  );
};

const SecondRoute = ({
  position,
  syncOffset,
  secondRef,
  onMomentumScrollBegin,
}: any) => (
  <Animated.FlatList
    ref={secondRef}
    scrollEventThrottle={1}
    onMomentumScrollBegin={onMomentumScrollBegin}
    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: position}}}], {
      useNativeDriver: true,
    })}
    onMomentumScrollEnd={(e) => {
      syncOffset('second', e.nativeEvent.contentOffset.y);
    }}
    data={DATA}
    keyExtractor={(item, i) => String(i)}
    renderItem={({item}) => (
      <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
        <Text>{item.name}</Text>
      </View>
    )}
    contentContainerStyle={{paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT}}
  />
);

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const position: any = useRef(new Animated.Value(0)).current;
  const isValidTabPress: any = useRef(false);

  const firstRef: any = useRef();
  const secondRef: any = useRef();

  const onMomentumScrollBegin = () => {
    isValidTabPress.current = true;
  };

  const syncOffset = (scene: any, y: any) => {
    console.log(scene, y);
    if (scene === 'first') {
      secondRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    if (scene === 'second') {
      firstRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    isValidTabPress.current = false;
  };

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
            position={position}
            syncOffset={syncOffset}
            firstRef={firstRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      case 'second':
        return (
          <SecondRoute
            position={position}
            syncOffset={syncOffset}
            secondRef={secondRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      default:
        return null;
    }
  };

  //   const HEADER_HEIGHT = 240;
  // const TAB_BAR_HEIGHT = 50;
  // const H_MIN_HEIGHT = 50;
  // const H_SCROLL_DISTANCE = HEADER_HEIGHT - TAB_BAR_HEIGHT;
  function renderTabBar(props: any) {
    const translateY = position.interpolate({
      inputRange: [0, H_SCROLL_DISTANCE],
      outputRange: [0, -H_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[
          {position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1},
          {transform: [{translateY}]},
        ]}>
        <View
          style={{
            height: HEADER_HEIGHT,
            backgroundColor: 'green',
          }}>
          <Text>Header</Text>
        </View>
        <TabBar
          {...props}
          style={{height: TAB_BAR_HEIGHT}}
          onTabPress={({route, preventDefault}) => {
            if (isValidTabPress.current) {
              preventDefault();
            }
          }}
        />
      </Animated.View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    height: 150,
  },
});

export default App;






 */
