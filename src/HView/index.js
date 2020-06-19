import React from 'react';
import {View} from 'react-native';

export default function HView({style, children}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', ...style}}>
      {children}
    </View>
  );
}
