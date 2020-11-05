import React from 'react';
import {Switch} from 'react-native';
import { Nuno } from 'react-native-nuno-ui';
import {color} from 'react-native-nuno-ui/style';

export default ({checked, disabled, onPress}) => {
  return (
    <Switch
      value={checked}
      onChange={onPress}
      trackColor={{true: color('theme'), false: 'lightgray'}}
      disabled={disabled}
    />
  );
}