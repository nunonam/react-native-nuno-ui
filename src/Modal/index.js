import React from 'react';
import Modal from 'react-native-modal';
import { Platform } from 'react-native';

export default ({isVisible, animationIn, animationOut, onBackdropPress, fullScreen, children}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={animationIn}
      animationOut={animationOut}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.5}
      avoidKeyboard={Platform.OS === 'ios' ? true : false}
      style={{margin: fullScreen ? 0 : 45}}
      >
      {children}
    </Modal>
  );
}
