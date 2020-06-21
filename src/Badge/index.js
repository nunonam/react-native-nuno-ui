import React from 'react';
// import {View} from 'react-native';
import Text from '../Text';
import HView from '../HView';

export default function Badge({count, containerStyle}) {
  if (count !== 0) {
    return (
      <HView
        style={{
          backgroundColor: 'red',
          height: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 6,
          ...containerStyle,
        }}>
        <Text fontSize={10} fontweight={'bold'} color={'white'} text={count} />
      </HView>
    );
  } else {
    return null;
  }
}
