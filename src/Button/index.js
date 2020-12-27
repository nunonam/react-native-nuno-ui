import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Loader from '../Loader';
import HView from '../HView';
import Text from '../Text';
import { color } from 'react-native-nuno-ui/style';
import Seperator from 'react-native-nuno-ui/src/Seperator';

export default function Button(props) {
  let fontSize, fontWeight, paddingHorizontal, height;
  const borderstyle = {borderWidth: 0.5, borderRadius: 4};
  const textstyle = {color: 'white'};
  switch (props.size) {
    case 'small':
      fontSize = 12;
      fontWeight = 'normal';
      paddingHorizontal = props.paddingHorizontal || 10;
      height = 24;
      if (props.rounded) {
        borderstyle.borderRadius = 12;
      }
      break;
    case 'large':
      fontSize = 16;
      fontWeight = 'bold';
      paddingHorizontal = props.paddingHorizontal || 20;
      height = 44;
      if (props.rounded) {
        borderstyle.borderRadius = 22;
      }
      break;
    case 'medium':
    default:
      fontSize = 13;
      fontWeight = 'bold';
      paddingHorizontal = props.paddingHorizontal || 10;
      height = 34;
      if (props.rounded) {
        borderstyle.borderRadius = 17;
      }
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
  if (props.borderRadius !== undefined) {
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
            height: height,
            paddingHorizontal: paddingHorizontal,
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
              justifyContent: 'center',
              ...borderstyle,
              }}>
              <Loader color={props.color === color('white') ? color('black') : color('white')} />
            </View>
          )}
          {props.bottom && (
            <Seperator bottom color={props.disable ? color('lightgray') : props.color} />
          )}
      </TouchableOpacity>
    </HView>
  );
};
