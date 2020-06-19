import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Loader from '../Loader';
import {textStyle} from '../style';
import HView from '../HView';

const Button = ({text, size, color, stretch, disable, loading, onPress}) => {
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
      paddingVertical = 10;
      paddingHorizontal = 10;
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
          backgroundColor: color || 'white',
          borderRadius: 4,
          borderWidth: 1,
          borderColor: color || 'darkgray',
        }}
        activeOpacity={disable || loading ? 1 : 0.5}
        onPress={disable || loading ? null : onPress}>
        <Text
          style={textStyle({
            size: fontSize,
            weight: fontWeight,
            color: color || loading ? 'white' : 'black',
          })}>
          {text}
        </Text>
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
          {loading && <Loader color={color ? 'white' : 'black'} />}
        </View>
      </TouchableOpacity>
    </HView>
  );
};

export default Button;
