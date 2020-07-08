import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function Image({local, height, width, borderRadius, borderColor, borderWidth, uri, onPress, resizeMode}) {
  if (!resizeMode) {
    resizeMode = 'cover';
  }
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
          source={local ? uri : {uri: uri}}
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
        source={local ? uri : {uri: uri}}
        resizeMode={resizeMode}
      />
    );
  }
}
