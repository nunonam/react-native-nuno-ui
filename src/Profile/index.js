import React from 'react';
import Image from '../Image';
import { TouchableOpacity } from 'react-native';
import Seperator from '../Seperator';
import Text from '../Text';

export default ({size, uri, name, onPress}) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={onPress}>
      <Image
        height={size}
        width={size}
        borderRadius={Math.floor(size / 2)}
        uri={uri}
        resizeMode={'cover'}
        onPress={onPress}
      />
      <Seperator width={10} />
      {name !== undefined && <Text text={name} fontSize={12} />}
    </TouchableOpacity>
  )
};