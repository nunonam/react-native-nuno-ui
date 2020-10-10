import React from 'react';
import Image from '../Image';
import { TouchableOpacity, View } from 'react-native';
import Seperator from '../Seperator';
import Text from '../Text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Nuno } from 'react-native-nuno-ui';

export default ({size, uri, name, desc, status, icon, onPress}) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={onPress}>
      <View>
        {uri ? (
          <Image
            height={size}
            width={size}
            borderRadius={Math.floor(size / 2)}
            uri={uri}
            resizeMode={'cover'}
            onPress={onPress}
          />

        ) : (
          <FontAwesome name={'user-circle'} size={size} color={'lightgray'} />
        )}
        {icon && (
          <View style={{position: 'absolute', left: -5, top: -3}}>
            <MaterialCommunityIcons name={'heart-multiple'} size={15} color={'red'} />
          </View>
        )}
      </View>
      <Seperator width={10} />
      <View>
        {name && <Text text={name} fontSize={12} />}
        {desc && <Text text={desc} fontSize={12} color={'gray'} />}
        {status && (
          <Text text={status} fontSize={12} color={Nuno.config.themeColor} fontWeight={'bold'} />
        )}
      </View>
    </TouchableOpacity>
  )
};