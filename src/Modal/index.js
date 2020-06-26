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
      style={{margin: fullScreen ? 0 : 26}}
      >
      {children}
    </Modal>
  );
}
