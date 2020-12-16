import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Text from '../Text';
import { color } from 'react-native-nuno-ui/style';

export default function Checkbox({
  multiple,
  type,
  size,
  // color,
  checked,
  onPress,
  label,
  labelColor,
  fontWeight,
  disabled,
  customChecked,
  customUnChecked,
}) {
  let iconChecked, iconUnchecked, labelSize, iconSize;
  switch (size) {
    case 'small':
      labelSize = 12;
      iconSize = 18;
      break;
    case 'large':
      labelSize = 18;
      iconSize = 28;
      break;
    default:
      labelSize = 14;
      iconSize = 22;
      break;
  }
  if (multiple) {
    iconChecked = customChecked || <MaterialIcons
      name={'check-box'}
      color={disabled ? 'gray' : color('theme')}
      size={iconSize}
    />;
    iconUnchecked = customUnChecked || <MaterialIcons
      name={'check-box-outline-blank'}
      color={disabled ? 'gray' : 'dimgray'}
      size={iconSize}
    />;
  } else {
    iconChecked = customChecked || <MaterialIcons
      name={'radio-button-checked'}
      color={disabled ? 'gray' : color('theme')}
      size={iconSize}
    />;
    iconUnchecked = customUnChecked || <MaterialIcons
      name={'radio-button-unchecked'}
      color={disabled ? 'gray' : 'dimgray'}
      size={iconSize}
    />;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      {checked ? iconChecked : iconUnchecked}
      {label && (
        <View style={{marginLeft: 6}}>
          <Text
            fontSize={labelSize}
            fontWeight={fontWeight ? fontWeight : (checked ? 'bold' : '300')}
            color={(disabled || !checked) ? color('gray') : labelColor || color('darkgray')}
            text={label}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
