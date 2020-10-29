import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function Image({height, width, borderRadius, borderColor, borderWidth, uri, onPress, resizeMode}) {
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
      return (
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
      );
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
