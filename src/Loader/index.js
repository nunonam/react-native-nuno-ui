import React from 'react';
import {ActivityIndicator} from 'react-native';

export const Loader = ({size, color}) => {
  return <ActivityIndicator size={size} color={color} />;
};
