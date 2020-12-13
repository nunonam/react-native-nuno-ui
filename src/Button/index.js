import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Loader from '../Loader';
import HView from '../HView';
import Text from '../Text';
import { color } from 'react-native-nuno-ui/style';
import Seperator from 'react-native-nuno-ui/src/Seperator';

export default function Button(props) {
  let fontSize, fontWeight, paddingV, paddingH;
  const borderstyle = {borderWidth: 0.5, borderRadius: 4};
  const textstyle = {color: 'white'};
  switch (props.size) {
    case 'small':
      fontSize = 12;
      fontWeight = 'normal';
      paddingV = props.paddingVertical || 2;
      paddingH = props.paddingHorizontal || 10;
      break;
    case 'medium':
      fontSize = 13;
      fontWeight = 'bold';
      paddingV = props.paddingVertical || 7;
      paddingH = props.paddingHorizontal || 10;
      break;
    case 'large':
      fontSize = 16;
      fontWeight = 'bold';
      paddingV = props.paddingVertical || 12;
      paddingH = props.paddingHorizontal || 20;
      break;
    default:
      fontSize = 14;
      fontWeight = 'bold';
      paddingV = props.paddingVertical || 10;
      paddingH = props.paddingHorizontal || 15;
      break;
  }

  // border style
  if (props.borderColor) {
    borderstyle.borderColor = props.borderColor;
  } else {
    if (props.color === color('white')) {
      borderstyle.borderColor = color('gray');
    } else {
      borderstyle.borderWidth = 0;
    }
  }
  if (props.borderRadius) {
    borderstyle.borderRadius = props.borderRadius;
  }

  // text color
  if (props.disable) {
    textstyle.color = color('gray');
  } else {
    if (props.textColor) {
      textstyle.color = props.textColor;
    } else {
      if (props.color === color('white')) {
        textstyle.color = color('darkgray');
      }
    }
  }
  return (
    <HView>
      <TouchableOpacity
        style={{flex: props.stretch ? 1 : undefined}}
        activeOpacity={props.loading ? 1 : 0.5}
        onPress={props.onPress}
        disabled={props.disable || props.loading}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: paddingH,
            paddingVertical: paddingV,
            backgroundColor: props.disable ? color('lightgray') : props.color,
            ...borderstyle,
            }}>
            {props.left}
            <Seperator width={10} />
            <Text
              fontSize={fontSize}
              fontWeight={fontWeight}
              text={props.text}
              style={textstyle}
            />
            <Seperator width={10} />
            {props.right}
          </View>
          {props.loading && (
            <View style={{
              backgroundColor: props.color,
              borderRadius: props.borderRadius !== undefined ? props.borderRadius : 4,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center'
              }}>
              <Loader color={props.color === color('white') ? color('black') : color('white')} />
            </View>
          )}
      </TouchableOpacity>
    </HView>
  );
};
