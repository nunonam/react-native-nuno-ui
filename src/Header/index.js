import React from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import HView from '../HView';
import Text from '../Text';
import { Nuno } from '../..';

export default function Header({navigation, left, leftComponent, title, right, rightComponent, containerStyle}) {
  let headerLeft;
  let headerRight;
  let headerCenter = <Text fontSize={18} fontWeight={Nuno.config.headerTitleWeight || '500'} color={Nuno.config.textColor || 'dimgray'} text={title}/>;

  switch (left) {
    case 'close':
      headerLeft = (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 20, paddingVertical: 5}}>
          <AntDesign name={'close'} size={16} color={'black'} />
        </TouchableOpacity>
      );
      break;
    case 'back':
      headerLeft = (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 20, paddingVertical: 5}}>
          <AntDesign name={'left'} size={16} color={'black'} />
        </TouchableOpacity>
      );
      break;
    case 'menu':
      headerLeft = (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{paddingHorizontal: 20, paddingVertical: 5}}>
          <AntDesign name="menuunfold" size={18} color={'black'} />
        </TouchableOpacity>
      );
      break;
    default:
      headerLeft = leftComponent || (
        <View style={{paddingHorizontal: 20, paddingTop: 5}}>
          <View style={{width: 24, height: 24}} />
        </View>
      );
      break;
  }
  switch (right) {
    case 'search':
      headerRight = (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <AntDesign name="search1" size={20} color={'black'} />
          </TouchableOpacity>
        </View>
      );
      break;
    case 'setting':
      headerRight = (
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={{paddingHorizontal: 20, paddingVertical: 5}}>
          <AntDesign name="setting" size={20} color={'black'} />
        </TouchableOpacity>
      );
      break;
    default:
      headerRight = rightComponent || (
        <View style={{paddingHorizontal: 20, paddingTop: 5}}>
          <View style={{width: 24, height: 24}} />
        </View>
      );
      break;
  }
  return (
    <HView
      style={{
        height: 52,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingTop: 5,
        ...containerStyle,
      }}>
      {/* Left */}
      <View style={{alignItems: 'flex-start'}}>{headerLeft}</View>

      {/* Title */}
      <View style={{alignItems: 'center'}}>{headerCenter}</View>

      {/* Right */}
      <View style={{alignItems: 'flex-end'}}>{headerRight}</View>
    </HView>
  );
}

