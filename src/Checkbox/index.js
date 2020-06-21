import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Text from '../Text';

export default function Checkbox({
  multiple,
  type,
  size,
  color,
  checked,
  onPress,
  label,
  labelColor,
  disabled,
}) {
  let iconName, labelSize;
  switch (type) {
    case 'square':
      iconName = checked ? 'checksquare' : 'checksquareo';
      break;
    default:
      iconName = checked ? 'checkcircle' : 'checkcircleo';
      break;
  }
  switch (size) {
    case 'small':
      labelSize = 14;
      break;
    case 'large':
      labelSize = 18;
      break;
    default:
      labelSize = 16;
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <AntDesign
        name={iconName}
        color={disabled ? 'darkgray' : color || 'black'}
        size={22}
      />
      {label && (
        <View style={{marginLeft: 6}}>
          <Text
            fontSize={labelSize}
            color={disabled ? 'darkgray' : labelColor || 'black'}
            text={label}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
