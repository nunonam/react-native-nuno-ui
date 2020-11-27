import React from 'react';
import {View, ImageBackground} from 'react-native';
import Text from '../Text';
import Modal from '../Modal';
import Seperator from '../Seperator';
import Button from '../Button';
import { Nuno, HView } from '../..';
import { screenWidth, screenHeight, color } from 'react-native-nuno-ui/style';

export default ({
  children,
  alertVisible,
  alertTitle,
  alertText,
  alertButtonColor,
  backgroundImage,
  backgroundImageStyle,
  onBackdropPress,
  onConfirm,
  onCancel,
  nonFlex
}) => {
  return (
    <View style={{flex: nonFlex ? undefined : 1}}>
      {backgroundImage ? (
        <ImageBackground source={backgroundImage} style={{flex: 1, ...backgroundImageStyle}}>
          {children}
        </ImageBackground>
      ) : (
        children
      )}
      <Modal
        isVisible={alertVisible}
        onBackdropPress={onBackdropPress}>
        <View
          style={{padding: 15, backgroundColor: color('white'), borderRadius: 5}}>
          <View style={{flex: 1}} />
          <View>
            <Text fontSize={16} fontWeight={'600'} color={color('black')} text={alertTitle} style={{textAlign: 'center'}} />
            <Seperator height={30} />
            <Text fontSize={14} fontWeight={'200'} color={color('darkgray')} text={alertText} style={{textAlign: 'center'}} />
            <Seperator height={30} />
            <HView>
              {onCancel && (
                <>
                  <View style={{flex: 1}}>
                    <Button text={'취소'} color={alertButtonColor || color('gray')} onPress={onCancel} stretch size={'large'} />
                  </View>
                  <Seperator width={10} />
                </>
              )}
              <View style={{flex: 1}}>
                <Button text={'확인'} color={alertButtonColor || color('theme')} onPress={onConfirm} stretch size={'large'} />
              </View>
            </HView>
          </View>
          <View style={{flex: 1}} />
        </View>
      </Modal>
    </View>
  );
}
