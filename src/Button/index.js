import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Loader} from '../Loader';
import { textStyle } from '../style';

export const Button = ({text, size, color, stretch, disable, loading, onPress}) => {
  let fontSize, fontWeight, paddingVertical, paddingHorizontal;
  switch (size) {
    case 'small':
      fontSize = 12;
      fontWeight = '';
      paddingVertical = 2;
      paddingHorizontal = 10;
      break;
    case 'medium':
      fontSize = 16;
      fontWeight = '';
      paddingVertical = 7;
      paddingHorizontal = 10;
      break;
    default:
      fontSize = 18;
      fontWeight = 'medium';
      paddingVertical = 10;
      paddingHorizontal = 10;
      break;
  }
  return (
    <TouchableOpacity
      style={{
        flex: stretch ? 1 : undefined,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        backgroundColor: color || 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: color || 'darkgray',
        flexDirection: 'row',
      }}
      activeOpacity={
        disable ? 1 : 0.5
      }
      onPress={disable || loading ? null : onPress}>
      {loading ? (
        <Loader color={color ? 'white' : 'gray'} />
      ) : (
        <Text
          style={
            textStyle({
              size: fontSize,
              weight: fontWeight,
              color: color ? 'white' : 'darkgray',
            }),
          }>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};
