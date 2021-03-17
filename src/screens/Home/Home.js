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

import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';

// first component 에서 flatList에 넣을 가짜 데이터


// 헤더를 각 컴포넌트 별로 할당하기 위해 만든 MySearchBar
const MySearchBar = () => (
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

// HomeScreen 컴포넌트 안에서, 탭뷰로 선언 될 FirstRoute
const FirstRoute = ({}) => {
  const {
    onScroll /* Event handler */,
    onScrollWithListener /* Event handler creator */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
    /* Animated.AnimatedInterpolation by scrolling */
    translateY /* 0.0 ~ -headerHeight */,
    progress /* 0.0 ~ 1.0 */,
    opacity /* 1.0 ~ 0.0 */,
  } = useCollapsibleHeader();

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <View style={{flex: 1, backgroundColor: '#ff4081'}}>
      <Animated.FlatList
        onScroll={onScroll}
        contentContainerStyle={{paddingTop: containerPaddingTop}}
        scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// HomeScreen에서 탭뷰 안에 사용될 컴포넌트, 하지만 SecondRoute 에는 별 다른 flatList를 구현하지 않음.
const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

// FirestRoute 와 SecondRoute 를 탭뷰로 감싸 줄 컴포넌트
function HomeScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  // const renderTabBar = (props) => (
  //   <TabBar
  //     {...props}
  //     indicatorStyle={{backgroundColor: 'white', height: 100}}
  //     style={{backgroundColor: 'yellow', height: 100, paddingTop: 116}}
  //   />
  // );

  // 각 컴포넌트에 프랍스를 전달하기 위한 renderScene
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      default:
        return null;
    }
  };

  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
}

export default HomeScreen;

// flatList 안의 개별 데이터를 꾸며주기 위한 속성들
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 100,
    opacity: 0.2,
  },
  title: {},
});
