import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = ({size, color}) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Loader;
