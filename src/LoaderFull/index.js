import React from 'react';
import {
  Modal,
  ActivityIndicator,
  View,
} from 'react-native';
import { color } from 'react-native-nuno-ui/style';

export function LoaderFull(props) {
  return (
    <Modal visible={true} transparent animationType={'none'}>
      <View
        style={{
          flex: 1,
          // backgroundColor: color('lightgray'),
          // opacity: 0.7,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={color('black')} />
      </View>
    </Modal>
  );
};
