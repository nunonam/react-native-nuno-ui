import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import { screenWidth, screenHeight, ShadowStyle } from '../style';
import Seperator from '../Seperator';
import { Nuno } from '../..';

export default function Map({latitude, longitude, showsMyLocationButton, showsScale, customCenter, showZoom, showCurrent}) {
  let mapRef = React.useRef();
  const [latitudeDelta, setLatitudeDelta] = React.useState(0.00522);
  const [longitudeDelta, setLongitudeDelta] = React.useState(screenWidth / screenHeight * 0.00522);
  const onRegionChange = region => {
    console.log('onRegionChange', region);
    // setCoordinate(region);
  };
  const onPressZoomOut = () => {
    setLatitudeDelta(latitudeDelta * 2);
    setLongitudeDelta(longitudeDelta * 2);
    mapRef.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta * 2,
      longitudeDelta: longitudeDelta * 2,
    }, 100);
  };
  const onPressZoomIn = () => {
    setLatitudeDelta(latitudeDelta / 2);
    setLongitudeDelta(longitudeDelta / 2);
    mapRef.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta / 2,
      longitudeDelta: longitudeDelta / 2,
    }, 100);
  };
  if (!latitude || !longitude || DeviceInfo.isEmulator()) {
    latitude = 37.540024;
    longitude = 126.945670;
  }
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MapView
        provider={Nuno.config.mapProvider}
        ref={e => mapRef = e}
        style={{width: screenWidth, flex: 1}}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        onRegionChangeComplete={e => onRegionChange(e)}
        showsMyLocationButton={showsMyLocationButton}
        // showsScale={showsScale}
      />
      <View
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: -20,
          marginTop: -20,
        }}>
        {customCenter || <MaterialIcons name={'location-on'} color={'red'} size={40} />}
      </View>
      {/* zoom control */}
      <View style={{position: 'absolute', bottom: 20, right: 20}}>
      {showZoom && (
        <>
          <TouchableOpacity
            onPress={onPressZoomIn}
            style={{
              backgroundColor: 'white',
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: 'lightgray',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              ...ShadowStyle,
            }}>
            <Entypo name={'plus'} size={20} />
          </TouchableOpacity>
          <Seperator height={10} />
          <TouchableOpacity
            onPress={onPressZoomOut}
            style={{
              backgroundColor: 'white',
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: 'lightgray',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              ...ShadowStyle,
            }}>
            <Entypo name={'minus'} size={20} />
          </TouchableOpacity>
        </>)}
        {showCurrent && (
          <>
            <Seperator height={10} />
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                width: 40,
                height: 40,
                borderRadius: 20,
                borderColor: 'lightgray',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                ...ShadowStyle,
              }}>
              <MaterialIcons name={'my-location'} size={20} />
            </TouchableOpacity>
          </>)}
        </View>
      )}
    </View>
  );
};
