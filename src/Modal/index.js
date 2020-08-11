import React from 'react';
import Modal from 'react-native-modal';

export default ({isVisible, animationIn, animationOut, onBackdropPress, fullScreen, children}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={animationIn}
      animationOut={animationOut}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.5}
      avoidKeyboard={true}
      style={{margin: fullScreen ? 0 : 45}}
      >
      {children}
    </Modal>
  );
}
