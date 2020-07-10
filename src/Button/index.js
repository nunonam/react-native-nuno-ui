import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Loader from '../Loader';
import HView from '../HView';
import Text from '../Text';
import { Nuno } from '../..';

export default function Button({text, size, color, stretch, disable, loading, onPress, textColor, borderColor, borderRadius}) {
  let fontSize, fontWeight, paddingVertical, paddingHorizontal;
  switch (size) {
    case 'small':
      fontSize = 12;
      fontWeight = 'normal';
      paddingVertical = 2;
      paddingHorizontal = 10;
      break;
    case 'medium':
      fontSize = 16;
      fontWeight = 'normal';
      paddingVertical = 7;
      paddingHorizontal = 10;
      break;
    default:
      fontSize = 18;
      fontWeight = 'bold';
      paddingVertical = 15;
      paddingHorizontal = 15;
      break;
  }
  return (
    <HView>
      <TouchableOpacity
        style={{
          flex: stretch ? 1 : undefined,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
          backgroundColor: color,
          borderRadius: borderRadius !== undefined ? borderRadius : 4,
          borderWidth: 1,
          borderColor: borderColor ? borderColor :  (color === 'white' ? 'darkgray' : color),
        }}
        activeOpacity={disable || loading ? 1 : 0.5}
        onPress={disable || loading ? null : onPress}>
        {!loading && <Text
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={textColor ? textColor : (color === 'white' ? 'darkgray' : 'white')}
          text={text}
        />}
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading && <Loader color={color === 'white' ? 'black' : 'white'} />}
        </View>
      </TouchableOpacity>
    </HView>
  );
};
