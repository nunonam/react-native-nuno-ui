import React from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

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
    <TouchableOpacity onPress={handleDoubleTap} activeOpacity={1}>
      {props.children}
    </TouchableOpacity>
  );
}