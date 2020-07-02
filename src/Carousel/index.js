import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { screenWidth } from '../style';
import FastImage from 'react-native-fast-image';

export default ({data, onPress, width, height, loop, paginationContainerStyle}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const renderItem = ({item}) => {
    return item;
  };
  return (
    <View>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={width || screenWidth}
        itemWidth={width || screenWidth}
        inactiveSlideScale={1}
        loop={loop}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        dotColor={'white'}
        inactiveDotColor={'lightgray'}
        inactiveDotScale={1}
        inactiveDotOpacity={1}
        containerStyle={{position: 'absolute', bottom: -20, left: 0, right: 0, ...paginationContainerStyle}}
      />
    </View>
  );
}
