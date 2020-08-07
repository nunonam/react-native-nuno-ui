import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { screenWidth } from '../style';
import FastImage from 'react-native-fast-image';
import ImageViewer from '../ImageViewer';
import Modal from '../Modal';

export default ({
  data,
  onPress,
  width,
  height,
  loop,
  dotColor,
  paginationContainerStyle
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [imageViewer, setImageViewer] = React.useState(false);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={onPress ? () => onPress() : () => setImageViewer(true)} activeOpacity={onPress ? 0.5 : 1}>
        <FastImage
          source={{uri: item}}
          style={{
            width: width || screenWidth,
            height: height || Math.floor(screenWidth / 2),
          }}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
    );
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
        dotColor={dotColor || 'white'}
        inactiveDotColor={'lightgray'}
        inactiveDotScale={1}
        inactiveDotOpacity={1}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          padding: 0,
        }}
        dotContainerStyle={{
          marginHorizontal: 2, // dot사이의 거리
        }}
        containerStyle={{
          paddingVertical: 10,
        }}
      />
      <Modal
        isVisible={imageViewer}
        fullScreen={true}
        onBackdropPress={() => setImageViewer(false)}>
        <ImageViewer
          data={data}
          enableSwipeDown={true}
          onSwipeDown={() => setImageViewer(false)}
        />
      </Modal>
    </View>
  );
}
