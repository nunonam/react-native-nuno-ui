import React from 'react';
import Image from '../Image';
import { TouchableOpacity, View } from 'react-native';
import Seperator from '../Seperator';
import Text from '../Text';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Nuno } from 'react-native-nuno-ui';
import { getAge } from 'react-native-nuno-ui/funcs';

export default ({
  size,
  user,
  desc,
  status,
  icon,
  onlyImage,
  onPress,
  onPressImage
}) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={onPress}>
      <View>
        {user?.photo ? (
          <Image
            height={size}
            width={size}
            borderRadius={Math.floor(size / 2)}
            uri={user.photo}
            resizeMode={'cover'}
            onPress={onPressImage || onPress}
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
      {!onlyImage && <View>
        {user ? (
          <Text
            text={user.name + ' • ' + getAge(user.birthday) + '세 • ' + user.height + 'cm'}
            fontSize={12}
          />
         ) : (
          <Text text={'탈퇴한 회원입니다'} fontSize={12} />
         )}
        {desc && <Text text={desc} fontSize={12} color={'gray'} />}
        {status && (
          <Text text={status} fontSize={12} color={Nuno.config.themeColor} fontWeight={'bold'} />
        )}
      </View>}
    </TouchableOpacity>
  )
};