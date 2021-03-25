import React, {Component, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Text,
  View,
  FlatList,
} from 'react-native';
import {
  Body,
  Header,
  List,
  ListItem as Item,
  ScrollableTab,
  Tab,
  Tabs,
  Title,
} from 'native-base';

const NAVBAR_HEIGHT = 56;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const COLOR = 'rgb(45,181,102)';
const TAB_PROPS = {
  tabStyle: {width: SCREEN_WIDTH / 2, backgroundColor: COLOR},
  activeTabStyle: {width: SCREEN_WIDTH / 2, backgroundColor: COLOR},
  textStyle: {color: 'white'},
  activeTextStyle: {color: 'white'},
};

// export class HomeScreen extends Component {

const HomeScreen = () => {
  const [scroll, setScroll] = useState(new Animated.Value(0));
  const [headerY, setHeaderY] = useState(0);
  const [tabY, setTabY] = useState(0);

  useEffect(() => {
    setHeaderY(
      Animated.multiply(Animated.diffClamp(scroll, 0, NAVBAR_HEIGHT), -1),
    );

    // delay(1000);

    setTabY(Animated.add(scroll, headerY));
  }, []);

  const tabContent = (
    <List>
      {new Array(120).fill(null).map((_, i) => (
        <Item key={i}>
          <Text>Item {i}</Text>
        </Item>
      ))}
    </List>
  );

  // end

  // scroll = new Animated.Value(0);
  // headerY;

  // constructor(props) {
  //   super(props);
  //   this.headerY = Animated.multiply(
  //     Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT),
  //     -1,
  //   );
  // }

  // render() {
  //   const tabContent = (
  //     <List>
  //       {new Array(20).fill(null).map((_, i) => (
  //         <Item key={i}>
  //           <Text>Item {i}</Text>
  //         </Item>
  //       ))}
  //     </List>
  //   );

  //   const tabY = Animated.add(this.scroll, this.headerY);

  return (
    <View>
      {Platform.OS === 'ios' && (
        <View
          style={{
            backgroundColor: COLOR,
            height: 20,
            width: '100%',
            position: 'absolute',
            zIndex: 2,
          }}
        />
      )}
      <Animated.View
        style={{
          width: '100%',
          position: 'absolute',
          transform: [
            {
              translateY: headerY,
            },
          ],
          elevation: 0,
          flex: 1,
          zIndex: 1,
          backgroundColor: COLOR,
        }}>
        <Header style={{backgroundColor: 'transparent'}} hasTabs>
          <Body>
            <Title>
              <Text style={{color: 'white'}}>Collapsingasdfds Navbar</Text>
            </Title>
          </Body>
        </Header>
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={1}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{zIndex: 0, height: '100%', elevation: -1}}
        contentContainerStyle={{paddingTop: NAVBAR_HEIGHT}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scroll}}}],
          {useNativeDriver: true},
        )}
        overScrollMode="never">
        <Tabs
          renderTabBar={(props) => (
            <Animated.View
              style={[
                {
                  transform: [{translateY: tabY}],
                  zIndex: 1,
                  width: '100%',
                  backgroundColor: COLOR,
                },
                Platform.OS === 'ios' ? {paddingTop: 50} : null,
              ]}>
              <ScrollableTab
                {...props}
                underlineStyle={{backgroundColor: 'white'}}
              />
            </Animated.View>
          )}>
          <Tab heading="Tab 11" {...TAB_PROPS}>
            {tabContent}
          </Tab>
          <Tab heading="Tab 1112" {...TAB_PROPS}>
            {tabContent}
          </Tab>
        </Tabs>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;
