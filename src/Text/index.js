import React from 'react';
import {Text} from 'react-native';

export default ({text, fontSize, fontWeight, color}) => {
  return (
    <Text
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
      }}>
      {text}
    </Text>
  );
}