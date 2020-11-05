import React from 'react';
import {Text} from 'react-native';
import {color as themeColor} from 'react-native-nuno-ui/src/style';

export default ({
  text,
  ellipsizeMode,
  numberOfLines,
  fontSize,
  fontWeight,
  color,
  style
}) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color || themeColor('black'),
        ...style
      }}>
      {text}
    </Text>
  );
}