import React from 'react';
import {View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Text } from 'react-native-nuno-ui';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { screenWidth } from 'react-native-nuno-ui/style';

export default ({data, index, enableSwipeDown, onSwipeDown}) => {
  return (
    <ImageViewer
      imageUrls={data.map(e => ({url: e}))}
      enableImageZoom={true}
      index={index}
      enableSwipeDown={enableSwipeDown}
      onSwipeDown={onSwipeDown}
      renderFooter={() => (
        <View style={{alignItems: 'center', height: 100}}>
          <Text text={'내려서 닫기'} fontSize={12} color={'white'} />
          <SimpleLineIcons name={'arrow-down'} size={30} color={'white'} />
        </View>
      )}
      footerContainerStyle={{alignItems: 'center', width: screenWidth}}
    />
  );
}
