import React from 'react';
import {View} from 'react-native';
import Text from '../Text';
import Modal from '../Modal';
import Seperator from '../Seperator';
import Button from '../Button';
import { color } from 'react-native-nuno-ui/style';

export default ({title, description, onPress}) => {
  const [visible, setVisible] = React.useState(true);
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}>
      <View
        style={{padding: 20, backgroundColor: color('white'), borderRadius: 5}}>
        <View style={{flex: 1}} />
        <View>
          <Text fontSize={22} fontWeight={'bold'} color={color('black')} text={title} />
          <Seperator height={50} />
          <Text fontSize={16} fontWeight={'500'} color={color('darkray')} text={description} />
          <Seperator height={50} />
          <Button text={'확인'} color={color('theme')} onPress={onPress ? onPress : () => setVisible(false)} stretch />
        </View>
        <View style={{flex: 1}} />
      </View>
    </Modal>
  );
}
