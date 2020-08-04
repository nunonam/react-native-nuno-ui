import React from 'react';
import {Text} from 'react-native';
import { Nuno } from '../..';

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
        color: color || Nuno.config.textColor,
        ...style
      }}>
      {text}
    </Text>
  );
}