import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import { color } from 'react-native-nuno-ui/style';

export default function ButtonGroup(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: props.cols ? 'wrap' : undefined,
        justifyContent: 'space-evenly',
      }}>
      {props.cols === undefined ? (
        props.items.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => props.onPress(e.code)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: typeof props.value === 'string' ? (props.value === e.code ? props.color : color('lightgray')) : (props.value.indexOf(e.code) !== -1 ? props.color : color('lightgray')),
                zIndex: typeof props.value === 'string' ? (props.value === e.code ? 100 : undefined) : (props.value.indexOf(e.code) !== -1 ? 100 : undefined),
                alignItems: 'center',
                paddingVertical: 10,
                marginLeft: i !== 0 ? -1 : 0,
              }}>
              <Text
                fontSize={14}
                fontWeight={'500'}
                text={e.name}
                color={typeof props.value === 'string' ? (props.value === e.code ? props.color : color('gray')) : (props.value.indexOf(e.code) !== -1 ? props.color : color('gray'))}
              />
            </TouchableOpacity>
          );
        })
      ) : (
        props.items.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => props.onPress(e.code)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: props.value === e.code ? props.color : color('lightgray'),
                zIndex: props.value === e.code ? 100 : undefined,
                alignItems: 'center',
                paddingVertical: 10,
                marginLeft:
                  props.cols === undefined
                    ? i === 0
                      ? 0
                      : -1
                    : 0 === i % props.cols
                    ? 0
                    : -1,
                marginTop: props.cols === undefined ? undefined : i < props.cols ? 0 : -1,
              }}>
              <Text
                fontSize={14}
                fontWeight={'500'}
                text={e.name}
                color={props.value === e.code ? props.color : color('gray')}
              />
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
}
