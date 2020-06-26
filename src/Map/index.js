import React from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';
import { screenWidth } from '../style';

export default function Map({latitude, longitude, showsMyLocationButton, showsScale}) {
  const onRegionChange = region => {
    console.log('onRegionChange', region);
    // setCoordinate(region);
  };
  if (!latitude || !longitude || DeviceInfo.isEmulator()) {
    latitude = 37.540024;
    longitude = 126.945670;

  }
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MapView
        // provider={'google'}
        style={{width: screenWidth, flex: 1}}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.006062463147259223,
          longitudeDelta: 0.005457624793052673,
        }}
        onRegionChangeComplete={e => onRegionChange(e)}
        showsMyLocationButton={showsMyLocationButton}
        showsScale={showsScale}
      />
      <View
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: -20,
          marginTop: -20,
        }}>
        <MaterialIcons name={'location-on'} color={'red'} size={40} />
      </View>
    </View>
  );
};
