import React from 'react';
import Toggle from 'react-native-toggle-element';
import { Nuno } from '../..';

export default ({checked, disabled, onPress}) => {
  return (
    // <Switch
    //   value={checked}
    //   onChange={onPress}
    //   trackColor={{true: Nuno.config.themeColor, false: 'lightgray'}}
    //   disabled={disabled}
    // />
    <Toggle
      disabled
      value={checked}
      onToggle={onPress}
      leftTitle="Left"
      rightTitle="Right"
      thumbButton={{
        width: 30,
        height: 30,
        radius: 15,
      }}
      trackBar={{
        activeBackgroundColor: Nuno.config.themeColor,
        inActiveBackgroundColor: 'lightgray',
        // borderActiveColor: '#86c3d7',
        // borderInActiveColor: '#1c1c1c',
        // borderWidth: 5,
        width: 50,
      }}
    />
  );
}