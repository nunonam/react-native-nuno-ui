import React from 'react';
import {Switch} from 'react-native';
import { Nuno } from '../..';

export default ({checked, disabled, onPress}) => {
  return (
    <Switch
      value={checked}
      onChange={onPress}
      trackColor={{true: Nuno.config.themeColor, false: 'lightgray'}}
      disabled={disabled}
    />
  );
}