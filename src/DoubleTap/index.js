import React from 'react';
import {View, Platform} from 'react-native';

export default function DoubleTap(props) {
  const [lastTap, setLastTap] = React.useState(null);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      props.onDoubleTap();
    } else {
      setLastTap(now);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      {props.children}
    </TouchableWithoutFeedback>
  );
}