import {
  Platform,
  Share,
  Alert,
  Linking,
  PermissionsAndroid,
  ActionSheetIOS,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-root-toast';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import { Nuno } from '.';
import { screenWidth } from './src/style';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';

export function log(func, data) {
  console.log(func, data);
}
export function error(func, data) {
  console.error(func, data)
}
export function logApi(func, data) {
  console.groupCollapsed(`[API] ${func}`);
  console.info(data);
  console.groupEnd();
}
export function errorApi(endpoint, data) {
  console.groupCollapsed(`[API ERROR] ${endpoint}`);
  console.error(data);
  console.groupEnd();
}
export function getAge(s) {
  // ISODateString => Date
  const b = s.split(/\D+/);
  const birthday = new Date(
    Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]),
  );

  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export async function getCurrentLocation() {
  let granted;
  if (Platform.OS === 'android') {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        // title: '',
        message: '현재 위치정보 확인을 위해 위치접근을 허용해 주세요',
      },
    );
  } else {
    granted = PermissionsAndroid.RESULTS.GRANTED;
  }
  return new Promise((resolve, reject) => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          console.log('current location', position);
          fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?' +
              new URLSearchParams({
                latlng: `${position.coords.latitude},${position.coords.longitude}`,
                key: Nuno.config.GEOCODE_API,
                // language: global.lang,
                // region: global.lang,
              }),
            {
              method: 'GET',
              // headers: {
              //   'Accept-Language': global.lang + '-KR',
              // },
            },
          )
            .then(async res => {
              const response = await res.json();
              console.log('geocoderFrom', response);
              if (response.status === 'OK') {
                resolve(response.results);
              } else {
                reject();
              }
            })
            .catch(err => {
              console.log(err);
              reject();
            });
        },
        error => {
          // See error code charts below.
          console.log('getCurrentPosition error', error.code, error.message);
          reject(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  });
}
export function saveRecentKeyword(keyword) {
  AsyncStorage.getItem('searchKeywords')
    .then(resStorage => {
      let locals = [];
      if (resStorage) {
        locals = JSON.parse(resStorage);
      }
      const found = locals.map(e => e.keyword).indexOf(keyword);
      if (found !== -1) {
        locals.splice(found, 1);
      }
      locals.splice(0, 0, {
        keyword: keyword,
        date: moment(new Date()).format('MM-DD'),
      });
      if (locals.length > 10) {
        locals.splice(10, 1);
      }
      AsyncStorage.setItem('searchKeywords', JSON.stringify(locals));
    })
    .catch(err => {
      console.log(err);
    });
}
export function showToast(msg) {
  Toast.show(msg, {
    duration: 1000,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 0.8,
    // backgroundColor: cs.theme,
    textStyle: {fontSize: 14, fontWeight: 'bold', color: 'white'},
    containerStyle: {
      width: screenWidth,
      height: 70 + (isIphoneX() ? getStatusBarHeight() : 0),
      paddingTop: isIphoneX() ? getStatusBarHeight() + 8 : 8,
      top: -20,
      borderRadius: 0,
      justifyContent: 'center',
    },
  });
}
export function share(deeplink, title, callback) {
  fetch(
    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${Nuno.config.FIREBASE_WEB_API}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        longDynamicLink: `${Nuno.config.dynamicLink}/?link=${deeplink}&ibi=${Nuno.config.BUNDLE_ID}&isi=${Nuno.config.IOS_STORE_ID}&apn=${Nuno.config.PACKAGE_NAME}`,
      }),
    },
  )
    .then(async response => {
      const link = await response.json();
      Share.share({
        message: link.shortLink,
        title: title,
      }).then(res => {
        if (res.action === Share.sharedAction) {
          callback && callback();
        } else if (res.action === Share.dismissedAction) {
          // dismissed
        }
      });
    })
    .catch(err => {
      Alert.alert(err);
    });
  Share.share({
    message: message,
    title: title,
  }).then(res => {
    if (res.action === Share.sharedAction) {
      callback();
    } else if (res.action === Share.dismissedAction) {
      // dismissed
    }
  });
}

export function getPhotos(index, multiple) {
  return new Promise((resolve, reject) => {
    if (index === 0) {
      ImagePicker.openCamera({
        // writeTempFile: false,
        width: 300,
        height: 300,
        mediaType: 'photo',
        // cropping: true,
        multiple: multiple,
      })
        .then(res => {
          console.log('ImagePicker openCamera', res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    }
    if (index === 1) {
      ImagePicker.openPicker({
        // writeTempFile: false,
        width: 300,
        height: 300,
        mediaType: 'photo',
        smartAlbums: ['UserLibrary'],
        // cropping: true,
        multiple: multiple,
      })
        .then(res => {
          console.log('ImagePicker openPicker', res);
          if (res.mime !== 'image/jpeg' && res.mime !== 'image/png') {
            Alert.alert(lang[global.lang].notSupportedFile);
            reject();
          } else {
            resolve(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    }
  });
}