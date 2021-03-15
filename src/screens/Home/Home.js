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
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c1231232-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8234234-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-b234234d96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53234234abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91234234aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-4712345234234f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c21231231235-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-f234234bd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-b12121213d96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b153453452431-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-1231233434248d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-412371f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

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
const FirstRoute = (
  {
    // onScroll,
    // containerPaddingTop,
    // scrollIndicatorInsetTop,
  },
) => {
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
  // console.log('first router onScroll; ', onScroll);
  // console.log('first router containerPaddingTop; ', containerPaddingTop);
  // console.log('first router scrollIndicatorInsetTop;', scrollIndicatorInsetTop);

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <View style={{flex: 1, backgroundColor: '#ff4081'}}>
      {/* <CollapsibleSubHeaderAnimator translateY={translateY}>
        <MySearchBar />
      </CollapsibleSubHeaderAnimator> */}
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
  // const {
  //   onScroll /* Event handler */,
  //   onScrollWithListener /* Event handler creator */,
  //   containerPaddingTop /* number */,
  //   scrollIndicatorInsetTop /* number */,
  //   /* Animated.AnimatedInterpolation by scrolling */
  //   translateY /* 0.0 ~ -headerHeight */,
  //   progress /* 0.0 ~ 1.0 */,
  //   opacity /* 1.0 ~ 0.0 */,
  // } = useCollapsibleSubHeader();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white', height: 100}}
      style={{backgroundColor: 'yellow', height: 100, paddingTop: 116}}
    />
  );
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
          // onScroll={onScroll}
          // containerPaddingTop={containerPaddingTop}
          // scrollIndicatorInsetTop={scrollIndicatorInsetTop}
          />
        );
      case 'second':
        return <SecondRoute />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <CollapsibleSubHeaderAnimator translateY={translateY}>
        <View
          style={{
            padding: 15,
            width: '100%',
            backgroundColor: 'blue',
            height: 60,
            zIndex: 999,
          }}>
          <TextInput placeholder="search here" />
        </View>
      </CollapsibleSubHeaderAnimator> */}
      <TabView
        // renderTabBar={renderTabBar}
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
  title: {
    // fontSize: 32,
  },
});
