import React from 'react';
import {Text} from 'react-native';
import {color} from 'react-native-nuno-ui/style';

export default (props) => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={{
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        color: props.color || color('black'),
        letterSpacing: -0.2,
        ...props.style
      }}>
      {props.text}
    </Text>
  );
}