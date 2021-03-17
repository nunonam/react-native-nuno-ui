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
import { Nuno } from 'react-native-nuno-ui';
import { screenWidth, color } from 'react-native-nuno-ui/style';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import deviceInfoModule from 'react-native-device-info';
import analytics from '@react-native-firebase/analytics';
import Axios from 'axios';
import proj4 from 'proj4';

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
export function errorApi(req, err) {
  console.groupCollapsed(`[API ERROR] ${req}`);
  console.error(err);
  console.groupEnd();

  // 네트워크 에러
  // if (!err.response) {
  //   Alert.alert('죄송합니다', '사용중인 네트워크 상태를 확인해 주세요');
  //   return;
  // }

  if (__DEV__) {
    Alert.alert(`[ERROR] ${req}`, err.message || JSON.stringify(err));
  } else {
    Alert.alert('죄송합니다', '문제가 발생하였습니다. 확인후 빠른시간에 정상화 하도록 하겠습니다');
  }
  if (err.response?.status < 500) {
    const deviceVersion = deviceInfoModule.getVersion();

    Axios.post('error', {
      request: {restApi: req},
      error: err.message || JSON.stringify(err),
      from: 'frontend',
      version: deviceVersion,
    })
    .then((res) => console.log('[ERROR UPLOAD]', res.data))
    .catch((e) => console.log('[ERROR UPLOAD] error', e));
  }
}
export function getNameByCode(array, code) {
  const temp = array.filter((e) => e.code === code);
  if (temp.length > 0) {
    return temp[0].name;
  } else {
    return '';
  }
}
export function getDescByCode(array, code) {
  const temp = array.filter((e) => e.code === code);
  if (temp.length > 0) {
    return temp[0].desc;
  } else {
    return '';
  }
}
export function getIndexById(array, id) {
  const foundIndex = array.map((e) => e.id === id).indexOf(id);
  return foundIndex;
}
export function numberToCurrency(value) {
  if (value === undefined || value === null) {
    return '';
  }
  const temp = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  return temp;
}
export function currencyToNumber(value) {
  if (value === undefined || value === null) {
    return 0;
  }
  let num = Number(value.replace(/[^0-9.-]+/g, ''));
  return num;
}
export function ga(event, payload) {
  // event, payload 둘다 string
  analytics().logEvent(event, {
    id: new Date().getTime(),
    item: payload,
  });
}
export function checkEmail(email) {
  if (email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return {
        valid: false,
        msg: '이메일 형식에 맞지않습니다.',
      };
    } else {
      return {
        valid: true,
      };
    }
  }
}
export function checkPassword(password, repassword) {
  if (password !== repassword) {
    return {
      valid: false,
      msg: '입력된 두 비밀번호가 서로 다릅니다',
    };
  }
  if (!password.length || !repassword.length) {
    return {
      valid: false,
      msg: '비밀번호를 입력해주세요',
    };
  }
  if (password) {
    // 비밀번호 형식은 최소6자에서 최대20자, 영문 대소문자, 숫자,
    // 특수기호를 입력할수 있고 대문자와 특수기호가 하나씩 필수로 포함해야된다 .
    // 포함 되지 않을 때는 “비밀번호 형식은 최소6자에서 최대 20자, 영문 대문자와
    // 특수기호가 하나씩 포함되어야 합니다.” 에러 메세지를 보여준다.
    // const re = /^(?=.*[A-Z])(?=.*[$@$!%*#?&])[a-zA-Z0-9\d$@$!%*#?&]{6,20}$/

    // 비밀번호 형식은 영문 대소문자, 숫자 반드시포함 6자리 이상 (특수문자 포함되어도 상관없음 필수는 아님)
    const rule = /^(?=.*[0-9])(?=.*[A-z])[A-z0-9\d$@$!%*#?&]{6,}$/;
    if(!rule.test(password)) {
      return {
        valid: false,
        msg: '비밀번호 영문과 숫자가 포함 6자리 이상이어야 합니다',
      };
    }
  }

  return {
    valid: true,
  };
}
export function getAge(s) {
  if (!s) {
    return 0;
  }
  // ISODateString => Date
  const b = s.split(/\D+/);
  const birthday = new Date(
    Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]),
  );

  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export function gotoStore() {
  if (Platform.OS === 'android') {
    Linking.openURL(Nuno.config.ANDROID_PLAY_STORE).catch(err => console.log(err));
  } else {
    Linking.openURL(Nuno.config.IOS_APP_STORE).catch(err => console.log(err));
  }
}
export async function getAddressFromGeoCode(latitude, longitude) {
  return new Promise((resolve, reject) => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?' +
        new URLSearchParams({
          latlng: `${latitude},${longitude}`,
          key: Nuno.config.GOOGLE_API_KEY,
          language: Nuno.config.LANG,
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
          resolve({
            address: response.results[0].address_components[response.results[0].address_components.length-3].short_name + ' ' + response.results[0].address_components[response.results[0].address_components.length-4].short_name,
            coords: {
              latitude: latitude,
              longitude: longitude,
            }
          });
        } else {
          reject();
        }
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}
export function getPlaces(keyword) {
  return new Promise((resolve, reject) => {
    fetch(
      'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
        new URLSearchParams({
          query: keyword,
          key: Nuno.config.GOOGLE_API_KEY,
          fields: 'formatted_address,name,geometry',
          language: 'ko-KR',
          region: 'ko-KR',
        }),
      {
        method: 'GET',
      },
    )
      .then(async res => {
        const response = await res.json();
        resolve({data: response.results});
      })
      .catch(err => {
        reject(err);
      });
  });
}
export async function getCurrentCoords() {
  const isEmulator = await deviceInfoModule.isEmulator();
  return new Promise((resolve, reject) => {
    if (isEmulator) {
      resolve({latitude: 37.568676, longitude: 126.978031});
    } else {
      Geolocation.getCurrentPosition(
        position => {
          console.log('current location', position);
          resolve(position);
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
export function convertToEPSG4326(x, y) {
  var from = '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs';
  var to = '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees';
  return proj4(from, to, [x, y]);
}
export async function getCurrentLocation() {
  /*
  * 사용하기 위해서 GCM console 에서 GeoCoding API 설정이 필요하다
  */
  let granted;
  if (Platform.OS === 'android') {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        message: '근접 회원님과의 매칭을 위해 회원님의 위치정보를 허락해주세요',
      },
    );
  } else {
    granted = await Geolocation.requestAuthorization('whenInUse');
    // granted = PermissionsAndroid.RESULTS.GRANTED;
  }
  const isEmulator = await deviceInfoModule.isEmulator();

  return new Promise((resolve, reject) => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      if (isEmulator) {
        resolve({
          address: '서울시 중구',
          coords: {latitude: 37.568676, longitude: 126.978031},
        });
      } else {
        Geolocation.getCurrentPosition(
          position => {
            console.log('current location', position);
            fetch(
              'https://maps.googleapis.com/maps/api/geocode/json?' +
                new URLSearchParams({
                  latlng: `${position.coords.latitude},${position.coords.longitude}`,
                  key: Nuno.config.GOOGLE_API_KEY,
                  language: Nuno.config.LANG,
                }),
              {
                method: 'GET',
              },
            )
              .then(async res => {
                const response = await res.json();
                console.log('geocoderFrom', response);
                if (response.status === 'OK') {
                  resolve({
                    address: response.results[0].address_components[response.results[0].address_components.length-3].short_name + ' ' + response.results[0].address_components[response.results[0].address_components.length-4].short_name,
                    coords: position.coords
                  });
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
            console.log('getCurrentPosition error', error);
            reject();
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } else {
      console.log('location permission not granted');
      reject('denied');
    }
  });
}
export async function saveRecentKeyword(keyword, max) {
  return new Promise((resolve, reject) => {
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
          date: new Date().toISOString(),
        });
        if (locals.length > max) {
          locals.splice(10, 1);
        }
        AsyncStorage.setItem('searchKeywords', JSON.stringify(locals));
        resolve(locals);
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}
export async function removeRecentKeyword(keyword) {
  return new Promise((resolve, reject) => {
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
        AsyncStorage.setItem('searchKeywords', JSON.stringify(locals));
        resolve(locals);
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}
export async function getRecentKeyword() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('searchKeywords')
      .then(resStorage => {
        let locals = [];
        if (resStorage) {
          locals = JSON.parse(resStorage);
        }
        resolve(locals);
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}
export function showToast(msg, duration) {
  Toast.show(msg, {
    duration: duration || 3000,
    position: Toast.positions.TOP,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    backgroundColor: color('themedark'),
    textStyle: {fontSize: 12, color: color('white'), textAlign: 'left'},
    containerStyle: {
      width: screenWidth - 20,
      // height: 60,
      marginTop: isIphoneX() ? getStatusBarHeight() + 8 : 8,
      top: -10,
      // borderWidth: 0.5,
      // borderColor: color('lightgray'),
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: 15,
      paddingVertical: 20,
    },
  });
}
export const swap = (arr, index1, index2) => arr.map((val, idx) => {
  if (idx === index1) return arr[index2];
  if (idx === index2) return arr[index1];
  return val;
})
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function share(deeplink, title, message, image) {
  return new Promise((resolve, reject) => {
      fetch(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${Nuno.config.FIREBASE_WEB_API}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longDynamicLink: `${Nuno.config.DYNAMIC_LINK}/?link=${deeplink}&efr=1&ibi=${Nuno.config.BUNDLE_ID}&isi=${Nuno.config.IOS_STORE_ID}&apn=${Nuno.config.PACKAGE_NAME}&st=${title}&sd${message}&si=${image}`,
        }),
      },
    )
      .then(async response => {
        const link = await response.json();
        console.log('shortlink', link.shortLink);
        Share.share({
          message: link.shortLink,
          title: title,
        }, {
          subject: title,
          dialogTitle: title,
        }).then(res => {
          if (res.action === Share.sharedAction) {
            resolve();
          } else if (res.action === Share.dismissedAction) {
            reject();
          }
        });
      })
      .catch(err => {
        Alert.alert(err);
      });
    });
}
export function getDateFromHours(timeStr) {
  const h = timeStr.split(':')[0];
  const m = timeStr.split(':')[1];
  const s = '0';
  let date = new Date();
  return date.setHours(h, m, s);
}
export function formatAMPM(d) {
  if (d) {
    const date = new Date(d);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  } else {
    return '';
  }
}
export function formatDash(d) {
  if (d) {
    const date = new Date(d);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;

    return year + '-'  + month + '-' + day;
  } else {
    return '';
  }
}
export function formatDot(d) {
  if (d) {
    const date = new Date(d);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;

    return year + '.'  + month + '.' + day;
  } else {
    return '';
  }
}
export function formatYYMMDD(d, cr) {
  if (d) {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return year + '년 ' + (cr ? '\n' : '') + month + '월 ' + day + '일';
  } else {
    return '';
  }
}
export function formatYYMM(d) {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return year + '년 ' + month + '월 ';
}
export function fromNow(date) {

  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    // return Math.floor(interval) + " 년 전";
    return formatYYMMDD(date);
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    // return Math.floor(interval) + " 달 전";
    return formatYYMMDD(date);
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " 일 전";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " 시간 전";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " 분 전";
  }
  return Math.floor(seconds) + " 초 전";
}
export function getDatefromNow(date) {

  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 86400;

  if (interval > 1) {
    return Math.floor(interval);
  } else {
    return 0;
  }
}
export function toHourMinSecFormat(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";
  if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
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

export function check(value) {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof value === 'string') {
    return value.length > 0 ? true : false;
  }

  if (typeof value === 'object') {
    return Object.entries(value).length > 0 ? true : false;
  }

  return false;
}