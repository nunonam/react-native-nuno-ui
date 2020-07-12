import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Loader from '../Loader';
import HView from '../HView';
import Text from '../Text';
import { Nuno } from '../..';

export default function ButtonMulti({items, selectedItems, onPress, color, textColor, borderColor, borderRadius}) {
  return (
    <HView style={{flexWrap: 'wrap'}}>
      {items.map((e) => {
        return (
          <TouchableOpacity
            key={e.code}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginRight: 4,
              marginBottom: 4,
              backgroundColor: selectedItems.filter(f => f.code == e.code).length > 0 ? Nuno.config.themeColor : color,
              borderRadius: borderRadius !== undefined ? borderRadius : 4,
              borderWidth: 1,
              borderColor: borderColor ? borderColor :  (color === 'white' ? 'darkgray' : color),
            }}
            onPress={onPress}>
            <Text
              fontSize={14}
              color={textColor ? textColor : (color === 'white' ? 'darkgray' : 'white')}
              text={e.name}
            />
          </TouchableOpacity>
        );
      })}
    </HView>
  );
};
