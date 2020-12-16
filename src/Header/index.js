import React from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import HView from '../HView';
import Text from '../Text';
import Icon from '../Icon';
import { color, ShadowStyle } from 'react-native-nuno-ui/style';

export default function Header(props) {
  let leftComponent;
  let rightComponent;
  let centerComponent;

  if (typeof props.center === 'string') {
    centerComponent = (
      <View style={{alignItems: 'center'}}>
        <Text fontSize={16} fontWeight={'500'} color={color('darkgray')} text={props.center}/>
      </View>
    )
  } else {
    centerComponent = props.center;
  }

  if (typeof props.right === 'string') {
    rightComponent = (
      <View style={{padding: 15}}>
        <Text fontSize={14} fontWeight={'bold'} color={color('theme')} text={props.right}/>
      </View>
    )
  } else {
    rightComponent = props.right;
  }

  if (typeof props.left === 'string') {
    switch (props.left) {
      case 'close':
        leftComponent = (
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{padding: 15}}>
            <Icon name={'close'} size={24} color={props.transparent ? color('white') : color('black')} />
          </TouchableOpacity>
        );
        break;
      case 'back':
        leftComponent = (
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{padding: 15}}>
            <Icon name={'arrow-left'} size={24} color={props.transparent ? color('white') : color('black')} />
          </TouchableOpacity>
        );
        break;
      case 'menu':
        leftComponent = (
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}
            style={{padding: 15}}>
            <Icon name={'menu'} size={24} color={color('black')} />
          </TouchableOpacity>
        );
        break;
      default:
        leftComponent = (
          <View style={{padding: 15, width: 24, height: 24}} />
        );
        break;
    }
  } else {
    leftComponent = props.left;
  }

  // if (typeof props.right === 'string') {
  //   switch (props.right) {
  //     case 'close':
  //       rightComponent = (
  //         <TouchableOpacity
  //           onPress={() => props.navigation.goBack()}
  //           style={{padding: 15}}>
  //           <Icon name={'close'} size={24} color={color('black')} />
  //         </TouchableOpacity>
  //       );
  //       break;
  //     case 'search':
  //       rightComponent = (
  //         <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //           <TouchableOpacity
  //             onPress={() => null}
  //             style={{padding: 15}}>
  //             <Icon name={'search'} size={24} color={color('black')} />
  //           </TouchableOpacity>
  //         </View>
  //       );
  //       break;
  //     case 'setting':
  //       rightComponent = (
  //         <TouchableOpacity
  //           onPress={() => props.navigation.navigate('Setting')}
  //           style={{padding: 15}}>
  //           <Icon name={'setting'} size={24} color={color('black')} />
  //         </TouchableOpacity>
  //       );
  //       break;
  //     default:
  //       rightComponent = (
  //         <View style={{padding: 15, width: 24, height: 24}} />
  //       );
  //       break;
  //   }
  // } else {
  //   rightComponent = props.right;
  // }

  return (
    <HView
      style={{
        backgroundColor: color('smokewhite'),
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        borderBottomWidth: props.transparent ? 0 : 0.5,
        borderBottomColor: color('lightgray'),
        position: props.transparent ? 'absolute' : undefined,
        top: props.transparent ? 0 : undefined,
        left: props.transparent ? 0 : undefined,
        right: props.transparent ? 0 : undefined,
        zIndex: props.transparent ? 1 : undefined,
        ...props.containerStyle,
      }}>
      {/* Left */}
      <View style={{alignItems: 'flex-start', flex: 0.2}}>{leftComponent}</View>

      {/* Title */}
      <View style={{alignItems: 'center', flex: 0.6}}>{centerComponent}</View>

      {/* Right */}
      <View style={{alignItems: 'flex-end', flex: 0.2}}>{rightComponent}</View>
    </HView>
  );
}

