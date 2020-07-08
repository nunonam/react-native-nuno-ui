import React from 'react';
import {View} from 'react-native';
import Text from '../Text';
import Modal from '../Modal';
import Seperator from '../Seperator';
import Button from '../Button';
import { Nuno, HView } from '../..';

export default ({children, alertVisible, alertTitle, alertText, alertButtonColor, onBackdropPress, onConfirm, onCancel}) => {
  return (
    <View style={{flex: 1}}>
      {children}
      <Modal
        isVisible={alertVisible}
        onBackdropPress={onBackdropPress}>
        <View
          style={{padding: 20, backgroundColor: 'white', borderRadius: 5}}>
          <View style={{flex: 1}} />
          <View>
            <Text fontSize={18} fontWeight={'bold'} color={'black'} text={alertTitle} style={{textAlign: 'center'}} />
            <Seperator height={30} />
            <Text fontSize={16} fontWeight={'500'} color={'dimgray'} text={alertText} style={{textAlign: 'center'}} />
            <Seperator height={30} />
            <HView>
              {onCancel && (
                <>
                  <View style={{flex: 1}}>
                    <Button text={'확인'} color={alertButtonColor || 'gray'} onPress={onConfirm} stretch />
                  </View>
                  <Seperator width={10} />
                </>
              )}
              <View style={{flex: 1}}>
                <Button text={'확인'} color={alertButtonColor || Nuno.config.themeColor} onPress={onConfirm} stretch />
              </View>
            </HView>
          </View>
          <View style={{flex: 1}} />
        </View>
      </Modal>
    </View>
  );
}
