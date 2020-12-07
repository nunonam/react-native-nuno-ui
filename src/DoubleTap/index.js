import React from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function DoubleTap(props) {
  const [lastTap, setLastTap] = React.useState(null);
  const [showAnimation, setShowAnimation] = React.useState(false);
  const scale = React.useRef(new Animated.Value(0)).current;
  const AnimatedFontisto = Animated.createAnimatedComponent(Fontisto);
  const interpolateScale = scale.interpolate({inputRange:[0,1], outputRange:[0,1]})

  const start = () => {
    Animated.spring(scale, {
      toValue: 1,
      duration: 500,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      setShowAnimation(false);
    });
  };
  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < 300) {
      setShowAnimation(true);
      props.onDoubleTap();
      start();
    } else {
      setLastTap(now);
    }
  }

  return (
    <TouchableOpacity onPress={handleDoubleTap} activeOpacity={1}>
      {props.children}
      {showAnimation && (
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
          <AnimatedFontisto
            name={'check'}
            size={60}
            color={'white'}
            style={{
              transform:[{scale: interpolateScale}],
              color: 'white',
              ...Platform.select({
                ios: {
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.9,
                  shadowRadius: 3,
                },
                android: {
                  textShadowColor: 'black',
                  textShadowOffset: {width: 0, height: 0},
                  textShadowRadius: 3,
                },
              }),
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}