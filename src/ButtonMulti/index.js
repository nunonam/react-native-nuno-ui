import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Loader from '../Loader';
import HView from '../HView';
import Text from '../Text';
import { Nuno } from 'react-native-nuno-ui';
import { color } from 'react-native-nuno-ui/style';


export default function ButtonMulti(props) {
  const handleOnPress = (e) => {
    const foundIndex = props.selectedItems.indexOf(e);
    let newSelectedItems = [...props.selectedItems];
    if (foundIndex === -1) {
      newSelectedItems.push(e);
    } else {
      newSelectedItems.splice(foundIndex, 1);
    }
    props.onPress(newSelectedItems);
  }
  return (
    <HView style={{flexWrap: 'wrap'}}>
      {props.items.map((e) => {
        const selected = props.selectedItems.filter(f => f == e.code).length > 0;
        if (props.selectedOnly && !selected) {
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
                backgroundColor: selected ? color('themelight') : props.color,
                borderRadius: props.borderRadius !== undefined ? props.borderRadius : 4,
                borderWidth: 1,
                borderColor: selected ? color('themelight') :  (props.color === color('white') ? color('darkgray') : props.color),
              }}
              onPress={props.selectedOnly ? props.onPress : () => handleOnPress(e.code)}
              activeOpacity={props.selectedOnly ? 1 : 0.5}>
              <Text
                fontSize={14}
                color={selected ? 'white' : (props.color === color('white') ? color('darkgray') : color('white'))}
                text={e.name}
              />
            </TouchableOpacity>
          );
        }
      })}
    </HView>
  );
};
