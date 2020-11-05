import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Loader from '../Loader';
import HView from '../HView';
import Text from '../Text';
import { Nuno } from 'react-native-nuno-ui';
import { color as themeColor } from 'react-native-nuno-ui/style';


export default function ButtonMulti({items, selectedItems, onPress, color, selectedOnly, borderRadius}) {
  const handleOnPress = (e) => {
    const foundIndex = selectedItems.indexOf(e);
    let newSelectedItems = [...selectedItems];
    if (foundIndex === -1) {
      newSelectedItems.push(e);
    } else {
      newSelectedItems.splice(foundIndex, 1);
    }
    onPress(newSelectedItems);
  }
  return (
    <HView style={{flexWrap: 'wrap'}}>
      {items.map((e) => {
        const selected = selectedItems.filter(f => f == e.code).length > 0;
        if (selectedOnly && !selected) {
          return null;
        } else {
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
                backgroundColor: selected ? themeColor('theme') : color,
                borderRadius: borderRadius !== undefined ? borderRadius : 4,
                borderWidth: 1,
                borderColor: selected ? themeColor('theme') :  (color === 'white' ? 'darkgray' : color),
              }}
              onPress={selectedOnly ? onPress : () => handleOnPress(e.code)}>
              <Text
                fontSize={14}
                color={selected ? 'white' : (color === 'white' ? 'darkgray' : 'white')}
                text={e.name}
              />
            </TouchableOpacity>
          );
        }
      })}
    </HView>
  );
};
