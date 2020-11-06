import React from 'react';
import {View, Platform} from 'react-native';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import {color} from 'react-native-nuno-ui/style';

const Seperator = (props) => {
  let height = props.height;

  if (props.bottom) {
    height = getBottomSpace();
  }
  if (props.top) {
    height = Platform.OS === 'ios' ? getStatusBarHeight() : 0;
  }

  return (
    <View
      style={{
        backgroundColor: props.line ? color('lightgray') : props.color,
        height: props.line ? 0.5 : height,
        width: props.width,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
      }}
    />
  );
};

export default Seperator;
