import React from 'react';
import {View, Platform} from 'react-native';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import {color as themeColor} from 'react-native-nuno-ui/src/style';

const Seperator = ({
  height,
  width,
  marginTop,
  marginBottom,
  bottom,
  top,
  color,
  line,
  vline
}) => {
  if (bottom) {
    height = getBottomSpace();
  }
  if (top) {
    height = Platform.OS === 'ios' ? getStatusBarHeight() : 0;
  }
  if (line) {
    height = 0.5;
    color = color || themeColor('lightgray');
  }
  if (vline) {
    width = 1;
    height = height;
    color = color || themeColor('lightgray');
  }

  return (
    <View
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
    />
  );
};

export default Seperator;
