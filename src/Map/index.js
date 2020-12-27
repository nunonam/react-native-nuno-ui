import React from 'react';
import {View, TouchableOpacity, Linking, Alert} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import { screenWidth, color, ShadowStyle } from 'react-native-nuno-ui/style';
import Seperator from '../Seperator';
import { Icon, Nuno } from 'react-native-nuno-ui';
import { getCurrentLocation, getAddressFromGeoCode } from 'react-native-nuno-ui/funcs';
import Text from '../Text';

export default function Map({
  latitude,
  longitude,
  customCenter,
  showZoom,
  showCurrent,
  markers,
  markerComponent,
  showButton,
  buttonText,
  onMapReady,
  getCurrentPosition,
  markerOnSelect,
  style,
}) {
  let mapRef = React.useRef();
  const [camera, setCamera] = React.useState({
    center: {
      latitude: latitude || 0,
      longitude: longitude || 0,
    },
    pitch: 1,
    heading: 1,
    altitude: 1,
    zoom: 15,
  });

  React.useEffect(() => {
    async function getLoc() {
      try {
        const loc = await getCurrentLocation(Nuno.config.LANG);
        const temp = {...camera};
        temp.center = loc.coords;
        setCamera(temp);
        getCurrentPosition && getCurrentPosition(loc.coords);
      } catch (err) {
        if (err === 'denied') {
          Alert.alert('위치정보 동의', '현재 내위치를 확인하기 위해 위치정보 동의가 필요합니다.', [
            {
              text: '취소',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: '설정하기',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]);
        }
      }
    }
    if (!latitude && !longitude) {
      getLoc();
    }
  }, []);
  const onRegionChangeComplete = async e => {
    const temp = await mapRef.getCamera();
    temp.altitude = 1;
    setCamera(temp);
    getCurrentPosition && getCurrentPosition(temp.center);
  };
  const onPressCurrent = async () => {
    const loc = await getCurrentLocation(Nuno.config.LANG);
    const temp = {...camera};
    temp.center = loc.coords;
    mapRef.animateCamera(temp, {duration: 500});
    getCurrentPosition && getCurrentPosition(loc.coords);
  };

  const onPressZoomOut = () => {
    const temp = {...camera};
    temp.zoom = temp.zoom === 1 ? 1 : temp.zoom - 1;
    mapRef.animateCamera(temp, {duration: 500});
  };
  const onPressZoomIn = () => {
    const temp = {...camera};
    temp.zoom = temp.zoom === 20 ? 20 : temp.zoom + 1;
    mapRef.animateCamera(temp, {duration: 500});
  };
  return (
    <View style={{flex: 1, alignItems: 'center', ...style}}>
      <MapView
        provider={Nuno.config.MAP_PROVIDER}
        onMapReady={onMapReady}
        ref={e => mapRef = e}
        // style={{width: screenWidth, flex: 1}}
        camera={camera}
        showsCompass={false}
        initialCamera={camera}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {markers && markers.map((e, i) => (
          <Marker
            key={i}
            coordinate={e.coords}
            title={e.title}
            description={e.description}
            image={e.markerComponent}
            onPress={() => markerOnSelect(e)}
          >
            <Callout>
              {/* <View style={{paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgray'}}> */}
                <Text text={e.title} fontSize={14} />
              {/* </View> */}
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: -20,
          marginTop: -20,
        }}>
        {customCenter || <Icon name={'map-marker'} size={40} color={'red'} />}
      </View>
      {/* zoom control */}
      <View style={{position: 'absolute', bottom: 20, right: 20}}>
      {showZoom && (
        <View>
          <TouchableOpacity
            onPress={onPressZoomIn}
            style={{
              backgroundColor: color('white'),
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: color('lightgray'),
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              ...ShadowStyle,
            }}>
            <Icon name={'plus'} size={20} />
          </TouchableOpacity>
          <Seperator height={10} />
          <TouchableOpacity
            onPress={onPressZoomOut}
            style={{
              backgroundColor: color('white'),
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: color('lightgray'),
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              ...ShadowStyle,
            }}>
            <Icon name={'minus'} size={20} />
          </TouchableOpacity>
        </View>)}
        {showCurrent && (
          <View>
            <Seperator height={10} />
            <TouchableOpacity
              onPress={() => onPressCurrent()}
              style={{
                backgroundColor: color('white'),
                width: 40,
                height: 40,
                borderRadius: 20,
                borderColor: color('lightgray'),
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                ...ShadowStyle,
              }}>
              <Icon name={'location'} size={20} />
            </TouchableOpacity>
          </View>)}
        <Seperator bottom />
      </View>
    </View>
  );
};
