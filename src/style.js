import {Dimensions} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const bottomTabHeight = 50;

export const ShadowStyle = {
  shadowColor: 'black',
  shadowOffset: {
    width: 2,
    height: 5,
  },
  shadowOpacity: 0.36,
  shadowRadius: 6,
  elevation: 11,
};

export const ShadowStyleUp = {
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
};

