import React from 'react';
import {ActivityIndicator} from 'react-native';

export default function Loader({size, color}) {
  return <ActivityIndicator size={size} color={color} />;
};
