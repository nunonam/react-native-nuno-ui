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
}) => {
  if (bottom) {
    height = getBottomSpace();
  }
  if (line) {
    height = 1;
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
