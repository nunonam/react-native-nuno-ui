import React from 'react';
import {View} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

export const Seperator = ({h, w, mt, mb, bottom, c}) => {
  let height;
  if (bottom) {
    height = getBottomSpace();
  } {
    height = h;
  }
  return (
    <View
      style={{
        backgroundColor: c || 'lightgray',
        height: height || 1,
        width: w || 1,
        marginTop: mt,
        marginBottom: mb,
      }}
    />
  );
};
