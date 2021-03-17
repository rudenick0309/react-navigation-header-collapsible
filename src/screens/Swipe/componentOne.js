import React from 'react';
import {View, Text, FlatList, Animated, StyleSheet} from 'react-native';
import {FAKEDATA} from '../../fakeData';
import {useCollapsibleHeader} from 'react-navigation-collapsible';
export const FirstRoute = ({}) => {
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
    <>
      {/* <Text>test</Text> */}
      <View style={{flex: 1, backgroundColor: '#ff4081'}}>
        <Animated.FlatList
          // <FlatList
          onScroll={onScroll}
          //   contentContainerStyle={{paddingTop: containerPaddingTop}}
          scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
          data={FAKEDATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

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
