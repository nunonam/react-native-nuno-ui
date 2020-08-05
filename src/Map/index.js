import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { screenWidth, screenHeight, ShadowStyle } from '../style';
import Seperator from '../Seperator';
import { Nuno } from '../..';
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
  getCurrentPosition,
  markerOnSelect,
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
      const loc = await getCurrentLocation(Nuno.config.lang);
      const temp = {...camera};
      temp.center = loc.coords;
      setCamera(temp);
      getCurrentPosition(loc.coords);
    }
    getLoc();
  }, []);
  const onRegionChangeComplete = async e => {
    const temp = await mapRef.getCamera();
    temp.altitude = 1;
    setCamera(temp);
    getCurrentPosition(temp.center);
  };
  const onPressCurrent = async () => {
    const loc = await getCurrentLocation(Nuno.config.lang);
    const temp = {...camera};
    temp.center = loc.coords;
    mapRef.animateCamera(temp, {duration: 500});
    getCurrentPosition(loc.coords);
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
    <View style={{flex: 1, alignItems: 'center'}}>
      <MapView
        provider={Nuno.config.mapProvider}
        ref={e => mapRef = e}
        style={{width: screenWidth, flex: 1}}
        camera={camera}
        initialCamera={camera}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {markers.map((e, i) => (
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
