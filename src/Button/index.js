import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Loader from '../Loader';
import HView from '../HView';
import Text from '../Text';
import { color } from 'react-native-nuno-ui/style';
import Seperator from 'react-native-nuno-ui/src/Seperator';

export default function Button(props) {
  let fontSize, fontWeight, paddingV, paddingH;
  switch (props.size) {
    case 'small':
      fontSize = 12;
      fontWeight = 'normal';
      paddingV = props.paddingVertical || 2;
      paddingH = props.paddingHorizontal || 10;
      break;
    case 'medium':
      fontSize = 14;
      fontWeight = '500';
      paddingV = props.paddingVertical || 7;
      paddingH = props.paddingHorizontal || 10;
      break;
    case 'large':
      fontSize = 18;
      fontWeight = 'bold';
      paddingV = props.paddingVertical || 15;
      paddingH = props.paddingHorizontal || 20;
      break;
    default:
      fontSize = 16;
      fontWeight = 'bold';
      paddingV = props.paddingVertical || 10;
      paddingH = props.paddingHorizontal || 15;
      break;
  }
  return (
    <HView>
      <TouchableOpacity
        style={{flex: props.stretch ? 1 : undefined}}
        activeOpacity={props.loading ? 1 : 0.5}
        onPress={props.disable || props.loading ? null : props.onPress}
        disabled={props.disable}
        >
        {props.loading ? (
          <View style={{
            // flex: stretch ? 1 : undefined,
            // flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: paddingH,
            paddingVertical: paddingV,
            backgroundColor: props.color,
            borderRadius: props.borderRadius !== undefined ? props.borderRadius : 4,
            borderWidth: 0.5,
            borderColor: props.borderColor ? props.borderColor :  (props.color === color('white') ? color('gray') : props.color),
            opacity: props.disable ? 0.5 : 1,
            }}>
            <Loader color={props.color === color('white') ? color('black') : color('white')} />
          </View>
        ) : (
          <View style={{
            // flex: stretch ? 1 : undefined,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: paddingH,
            paddingVertical: paddingV,
            backgroundColor: props.color,
            borderRadius: props.borderRadius !== undefined ? props.borderRadius : 4,
            borderWidth: 0.5,
            borderColor: props.borderColor ? props.borderColor :  (props.color === color('white') ? color('gray') : props.color),
            opacity: props.disable ? 0.5 : 1,
            }}>
            {props.left}
            <Seperator width={10} />
            <Text
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={props.textColor ? props.textColor : (props.color === color('white') ? color('darkgray') : color('white'))}
              text={props.text}
            />
            <Seperator width={10} />
            {props.right}
          </View>
        )}
      </TouchableOpacity>
    </HView>
  );
};
