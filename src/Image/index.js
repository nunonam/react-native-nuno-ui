import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function Image({height, width, borderRadius, uri, onPress, resizeMode}) {
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
          borderRadius: borderRadius
        }}
        source={{uri: uri}}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
}
