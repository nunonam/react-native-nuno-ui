import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../Text';

export default function ButtonGroup({color, cols, items, onPress, value}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: cols ? 'wrap' : undefined,
        justifyContent: 'space-evenly',
      }}>
      {cols === undefined &&
        items.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={onPress(e.code)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: value === e.code ? color : 'lightgray',
                zIndex: value === e.code ? 100 : undefined,
                alignItems: 'center',
                paddingVertical: 10,
                marginLeft: i !== 0 ? -1 : 0,
              }}>
              <Text
                fontSize={14}
                fontWeight={'500'}
                text={e.name}
                color={value === e.code ? color : 'gray'}
              />
            </TouchableOpacity>
          );
        })}
      {cols &&
        items.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={onPress(e.code)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: value === e.code ? color : 'lightgray',
                zIndex: value === e.code ? 100 : undefined,
                alignItems: 'center',
                paddingVertical: 10,
                marginLeft:
                  cols === undefined
                    ? i === 0
                      ? 0
                      : -1
                    : 0 === i % cols
                    ? 0
                    : -1,
                marginTop: cols === undefined ? undefined : i < cols ? 0 : -1,
              }}>
              <Text
                fontSize={14}
                fontWeight={'500'}
                text={e.name}
                color={value === e.code ? color : 'gray'}
              />
            </TouchableOpacity>
          );
        })}
    </View>
  );
}
