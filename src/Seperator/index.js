import React from 'react';
import {View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const Seperator = ({
  height,
  width,
  marginTop,
  marginBottom,
  bottom,
  color,
  line,
  vline
}) => {
  if (bottom) {
    height = getBottomSpace();
  }
  if (line) {
    height = 1;
    color = color || 'lightgray';
  }
  if (vline) {
    width = 1;
    color = color || 'lightgray';
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
