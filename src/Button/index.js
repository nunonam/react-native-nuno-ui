import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Loader from '../Loader';
import HView from '../HView';
import Text from '../Text';
import { Nuno } from '../..';
import Seperator from 'react-native-nuno-ui/src/Seperator';

export default function Button({
  text,
  size,
  color,
  stretch,
  disable,
  loading,
  onPress,
  textColor,
  borderColor,
  borderRadius,
  paddingVertical,
  paddingHorizontal,
  left,
  right,
}) {
  let fontSize, fontWeight, paddingV, paddingH;
  switch (size) {
    case 'small':
      fontSize = 12;
      fontWeight = 'normal';
      paddingV = paddingVertical || 2;
      paddingH = paddingHorizontal || 10;
      break;
    case 'medium':
      fontSize = 14;
      fontWeight = '500';
      paddingV = paddingVertical || 7;
      paddingH = paddingHorizontal || 10;
      break;
    case 'large':
      fontSize = 18;
      fontWeight = 'bold';
      paddingV = paddingVertical || 15;
      paddingH = paddingHorizontal || 20;
      break;
    default:
      fontSize = 16;
      fontWeight = 'bold';
      paddingV = paddingVertical || 10;
      paddingH = paddingHorizontal || 15;
      break;
  }
  return (
    <HView>
      <TouchableOpacity
        style={{flex: stretch ? 1 : undefined}}
        activeOpacity={loading ? 1 : 0.5}
        onPress={onPress}
        disabled={disable}
        >
        {loading ? (
          <View style={{
            // flex: stretch ? 1 : undefined,
            // flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: paddingH,
            paddingVertical: paddingV,
            backgroundColor: color,
            borderRadius: borderRadius !== undefined ? borderRadius : 4,
            borderWidth: 0.5,
            borderColor: borderColor ? borderColor :  (color === 'white' ? 'darkgray' : color),
            opacity: disable ? 0.5 : 1,
            }}>
            <Loader color={color === 'white' ? 'black' : 'white'} />
          </View>
        ) : (
          <View style={{
            // flex: stretch ? 1 : undefined,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: paddingH,
            paddingVertical: paddingV,
            backgroundColor: color,
            borderRadius: borderRadius !== undefined ? borderRadius : 4,
            borderWidth: 0.5,
            borderColor: borderColor ? borderColor :  (color === 'white' ? 'darkgray' : color),
            opacity: disable ? 0.5 : 1,
            }}>
            {left}
            <Seperator width={10} />
            <Text
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={textColor ? textColor : (color === 'white' ? 'dimgray' : 'white')}
              text={text}
            />
            <Seperator width={10} />
            {right}
          </View>
        )}
      </TouchableOpacity>
    </HView>
  );
};
