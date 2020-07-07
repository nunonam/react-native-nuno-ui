import React from 'react';
import Image from '../Image';
import { TouchableOpacity, View } from 'react-native';
import Seperator from '../Seperator';
import Text from '../Text';

export default ({size, uri, name, desc, onPress}) => {
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
      <View>
        {name !== undefined && <Text text={name} fontSize={12} />}
        {desc !== undefined && <Text text={desc} fontSize={12} color={'gray'} />}
      </View>
    </TouchableOpacity>
  )
};