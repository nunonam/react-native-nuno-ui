import React from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import HView from '../HView';
import Text from '../Text';
import { Nuno } from 'react-native-nuno-ui';
import { color, ShadowStyle } from 'react-native-nuno-ui/style';

export default function Header({navigation, left, leftComponent, title, right, rightComponent, centerComponent, containerStyle, transparent}) {
  let headerLeft;
  let headerRight;
  let headerCenter = centerComponent || (
    <View style={{alignItems: 'center'}}>
      <Text fontSize={18} fontWeight={Nuno.config.headerTitleWeight || '500'} color={color('darkgray')} text={title}/>
    </View>
    );

  switch (left) {
    case 'close':
      headerLeft = (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 15, paddingVertical: 5}}>
          <AntDesign name={'close'} size={20} color={transparent ? color('white') : color('black')} />
        </TouchableOpacity>
      );
      break;
    case 'back':
      headerLeft = (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 15, paddingVertical: 5, ...ShadowStyle}}>
          <AntDesign name={'left'} size={20} color={transparent ? color('white') : color('black')} />
        </TouchableOpacity>
      );
      break;
    case 'menu':
      headerLeft = (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{paddingHorizontal: 15, paddingVertical: 5}}>
          <AntDesign name="menuunfold" size={20} color={color('black')} />
        </TouchableOpacity>
      );
      break;
    default:
      headerLeft = leftComponent || (
        <View style={{paddingHorizontal: 15, paddingTop: 5}}>
          <View style={{width: 24, height: 24}} />
        </View>
      );
      break;
  }
  switch (right) {
    case 'close':
      headerRight = (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 15, paddingVertical: 5}}>
          <AntDesign name={'close'} size={20} color={color('black')} />
        </TouchableOpacity>
      );
      break;
    case 'search':
      headerRight = (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingHorizontal: 15, paddingVertical: 5}}>
            <AntDesign name="search1" size={20} color={color('black')} />
          </TouchableOpacity>
        </View>
      );
      break;
    case 'setting':
      headerRight = (
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={{paddingHorizontal: 15, paddingVertical: 5}}>
          <AntDesign name="setting" size={20} color={color('black')} />
        </TouchableOpacity>
      );
      break;
    default:
      headerRight = rightComponent || (
        <View style={{paddingHorizontal: 15, paddingTop: 5}}>
          <View style={{width: 24, height: 24}} />
        </View>
      );
      break;
  }
  return (
    <HView
      style={{
        height: 50,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        borderBottomWidth: transparent ? 0 : 0.5,
        borderBottomColor: color('lightgray'),
        paddingTop: 5,
        position: transparent ? 'absolute' : undefined,
        top: transparent ? 0 : undefined,
        left: transparent ? 0 : undefined,
        right: transparent ? 0 : undefined,
        zIndex: transparent ? 1 : undefined,
        ...containerStyle,
      }}>
      {/* Left */}
      <View style={{alignItems: 'flex-start'}}>{headerLeft}</View>

      {/* Title */}
      {headerCenter}

      {/* Right */}
      <View style={{alignItems: 'flex-end'}}>{headerRight}</View>
    </HView>
  );
}

