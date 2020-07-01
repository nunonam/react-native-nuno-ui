import React from 'react';
import {Text} from 'react-native';
import { Nuno } from '../..';

export default ({text, fontSize, fontWeight, color}) => {
  return (
    <Text
      style={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color || Nuno.config.textColor,
      }}>
      {text}
    </Text>
  );
}