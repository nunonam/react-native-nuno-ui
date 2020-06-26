import React from 'react';
import {View} from 'react-native';
import Text from '../Text';
import Modal from '../Modal';
import Seperator from '../Seperator';
import Button from '../Button';

export default ({children, alertVisible, alertSetVisible, alertTitle, alertText, alertButtonColor}) => {
  // const [visible, setVisible] = React.useState(false);
  return (
    <View style={{flex: 1}}>
      {children}
      <Modal
        isVisible={alertVisible}
        onBackdropPress={() => alertSetVisible(false)}>
        <View
          style={{padding: 20, backgroundColor: 'white', borderRadius: 5}}>
          <View style={{flex: 1}} />
          <View>
            <Text fontSize={22} fontWeight={'bold'} color={'black'} text={alertTitle} />
            <Seperator height={50} />
            <Text fontSize={16} fontWeight={'500'} color={'dimgray'} text={alertText} />
            <Seperator height={50} />
            <Button text={'확인'} color={alertButtonColor} onPress={() => alertSetVisible(false)} stretch />
          </View>
          <View style={{flex: 1}} />
        </View>
      </Modal>
    </View>
  );
}
