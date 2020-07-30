import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import MapView, {AnimatedRegion, Animated, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { screenWidth, screenHeight, ShadowStyle } from '../style';
import Seperator from '../Seperator';
import { Nuno } from '../..';
import { getCurrentLocation, getAddressFromGeoCode } from 'react-native-nuno-ui/funcs';

export default function Map({
  latitude,
  longitude,
  showsMyLocationButton,
  showsScale,
  customCenter,
  showZoom,
  showCurrent,
  getCurrentPosition,
}) {
  let mapRef = React.useRef();
  const [region, setRegion] = React.useState({
    latitude: latitude || 0,
    longitude: longitude || 0,
    latitudeDelta: 0.00522,
    longitudeDelta: screenWidth / screenHeight * 0.00522,
  });

  React.useEffect(() => {
    async function getLoc() {
      const loc = await getCurrentLocation(Nuno.config.lang);
      setRegion({...region, ...loc.coords});
      getCurrentPosition(loc);
    }
    getLoc();
  }, []);
  const onRegionChange = async region => {
    console.log('onRegionChange', region);
    const loc = await getAddressFromGeoCode(region.latitude, region.longitude);
    setRegion(region);
    getCurrentPosition(loc);
  };
  const onPressCurrent = async () => {
    const loc = await getCurrentLocation(Nuno.config.lang);
    setRegion({...region, ...loc.coords});
    getCurrentPosition(loc);
  };

  const onPressZoomOut = () => {
    const temp = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(temp);
    // mapRef.animateToRegion(temp, 100);
  };
  const onPressZoomIn = () => {
    const temp = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(temp);
    // mapRef.animateToRegion(temp, 100);
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Animated
        provider={Nuno.config.mapProvider}
        ref={e => mapRef = e}
        style={{width: screenWidth, flex: 1}}
        region={new AnimatedRegion(region)}
        initialRegion={region}
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
        <View>
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
        </View>)}
        {showCurrent && (
          <View>
            <Seperator height={10} />
            <TouchableOpacity
              onPress={() => onPressCurrent()}
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
          </View>)}
          <Seperator bottom />
        </View>
    </View>
  );
};
