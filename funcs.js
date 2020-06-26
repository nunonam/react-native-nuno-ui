import {
  Platform,
  Share,
  Alert,
  Linking,
  PermissionsAndroid,
  ActionSheetIOS,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import chalk from 'chalk';

export function log(data) {
  console.log(data);
}
export function error(data) {
  console.error(data)
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
export function share(message, title, callback) {
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