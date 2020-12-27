import React from 'react';
import {TouchableOpacity, View, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ImageViewer, Icon } from 'react-native-nuno-ui';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import { color } from 'react-native-nuno-ui/style';

export default function Image({
  height,
  width,
  borderRadius,
  borderColor,
  borderWidth,
  uri,
  onPress,
  resizeMode,
  viewer,
  viewerUris, // viewer가 true이면 viewerUris 에 배열로 꼭 넣어줘야 한다
  viewerIndex, // viewer가 true이면 viewerIndex 에 꼭 넣어줘야 한다
}) {
  const [imageViewer, setImageViewer] = React.useState(false);
  if (!resizeMode) {
    resizeMode = 'cover';
  }
  if (uri) {
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          <FastImage
            style={{
              height: height,
              width: width,
              borderRadius: borderRadius,
              borderWidth: borderWidth,
              borderColor: borderColor,
            }}
            source={typeof(uri) === 'number' ? uri : {uri: uri}}
            resizeMode={resizeMode}
          />
        </TouchableOpacity>
      );
    } else {
      if (viewer) {
        return (
          <View>
            <TouchableOpacity onPress={() => setImageViewer(true)}>
              <FastImage
                style={{
                  height: height,
                  width: width,
                  borderRadius: borderRadius,
                  borderWidth: borderWidth,
                  borderColor: borderColor,
                }}
                source={typeof(uri) === 'number' ? uri : {uri: uri}}
                resizeMode={resizeMode}
              />
            </TouchableOpacity>
            <Modal
              visible={imageViewer}
              transparent={true}
              hardwareAccelerated={true}
              animationType={'slide'}
              onRequestClose={() => {
                setImageViewer(false);
              }}
            >
              <ImageViewer
                data={viewerUris}
                index={viewerIndex}
                enableSwipeDown={true}
                onSwipeDown={() => setImageViewer(false)}
              />
              {/* <TouchableOpacity
                onPress={() => setImageViewer(false)}
                style={{
                  position: 'absolute',
                  top: 20 + (isIphoneX() ? getStatusBarHeight() : 0),
                  right: 20,
                }}>
                <Icon name={'close'} size={20} color={color('white')} />
              </TouchableOpacity> */}
            </Modal>
          </View>
        );
      } else {
        return (
          <View>
            <FastImage
              style={{
                height: height,
                width: width,
                borderRadius: borderRadius,
                borderWidth: borderWidth,
                borderColor: borderColor,
              }}
              source={typeof(uri) === 'number' ? uri : {uri: uri}}
              resizeMode={resizeMode}
            />
          </View>
        );
      }

    }
  } else {
    return (
      <View
        style={{
          height: height,
          width: width,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: borderColor,
        }}
      />
    );
  }
}
