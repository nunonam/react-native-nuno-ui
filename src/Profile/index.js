import React from 'react';
import Image from '../Image';

export default ({size, uri, name, onPress}) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={onPress}>
      <Image
        height={size}
        width={size}
        borderRadius={Math.floor(size / 2)}
        uri={uri}
        resizeMode={'cover'}
        onPress={onPress}
      />
      <Seperator width={10} />
      {name && <Text text={name} fontSize={12} />}
    </HView>
  )
};