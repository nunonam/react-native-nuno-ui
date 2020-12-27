import {Dimensions} from 'react-native';
import { Nuno } from 'react-native-nuno-ui';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const bottomTabHeight = 50;

export const ShadowStyle = {
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
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

export function color(lightValue) {
  switch (lightValue) {
    case 'black':
      return Nuno.config.DARKMODE ? 'white' : 'black';
    case 'darkgray':
      return Nuno.config.DARKMODE ? '#DEDEDE' : '#333333';
    case 'gray':
      return Nuno.config.DARKMODE ? '#616161' : '#a9a9a9';
    case 'lightgray':
      return Nuno.config.DARKMODE ? '#333333' : '#DEDEDE';
    case 'white':
      return Nuno.config.DARKMODE ? 'black' : 'white';
    case 'smokewhite':
      return Nuno.config.DARKMODE ? '#151515' : '#F9F9F9';
    case 'theme':
      return Nuno.config.DARKMODE ? Nuno.config.THEME : Nuno.config.THEME;
    case 'themelight':
      return Nuno.config.DARKMODE ? Nuno.config.THEME_DARK : Nuno.config.THEME_LIGHT;
    case 'themedark':
      return Nuno.config.DARKMODE ? Nuno.config.THEME_LIGHT : Nuno.config.THEME_DARK;
    default:
      return Nuno.config.DARKMODE ? 'white' : 'black';
  }
}
