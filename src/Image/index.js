import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function Image({height, width, uri, onPress, resizeMode}) {
  if (!resizeMode) {
    resizeMode = 'cover';
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.5 : 1}>
      <FastImage
        style={{
          height: height,
          width: width,
        }}
        source={{uri: uri}}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
}
