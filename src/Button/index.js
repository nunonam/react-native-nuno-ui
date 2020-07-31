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
      fontSize = 14;
      fontWeight = 'normal';
      paddingVertical = 7;
      paddingHorizontal = 10;
      break;
    case 'large':
      fontSize = 18;
      fontWeight = 'bold';
      paddingVertical = 15;
      paddingHorizontal = 20;
      break;
    default:
      fontSize = 16;
      fontWeight = 'bold';
      paddingVertical = 10;
      paddingHorizontal = 15;
      break;
  }
  return (
    <HView>
      <TouchableOpacity
        style={{flex: stretch ? 1 : undefined,}}
        activeOpacity={loading ? 1 : 0.5}
        onPress={onPress}
        disabled={disable}
        >
        {loading ? (
          <View style={{
            // flex: stretch ? 1 : undefined,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
            backgroundColor: color,
            borderRadius: borderRadius !== undefined ? borderRadius : 4,
            borderWidth: 1,
            borderColor: borderColor ? borderColor :  (color === 'white' ? 'darkgray' : color),
            opacity: disable ? 0.5 : 1,
            }}>
            <Loader color={color === 'white' ? 'black' : 'white'} />
          </View>
        ) : (
          <View style={{
            // flex: stretch ? 1 : undefined,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
            backgroundColor: color,
            borderRadius: borderRadius !== undefined ? borderRadius : 4,
            borderWidth: 1,
            borderColor: borderColor ? borderColor :  (color === 'white' ? 'darkgray' : color),
            opacity: disable ? 0.5 : 1,
            }}>
            <Text
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={textColor ? textColor : (color === 'white' ? 'darkgray' : 'white')}
              text={text}
            />
          </View>
        )}
      </TouchableOpacity>
    </HView>
  );
};
