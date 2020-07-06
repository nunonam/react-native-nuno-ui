# react-native-nuno-ui
A library to help nuno project more easier

## Install ##
`yarn add react-native-nuno-ui`

## Dependency ##
`yarn add @react-native-community/datetimepicker @react-native-community/picker react-native-device-info react-native-fast-image react-native-image-crop-picker react-native-maps react-native-vector-icons`

## iOS pod file ##
cd ios && pod install

```
  pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
  pod 'RNDateTimePicker', :path => '../node_modules/@react-native-community/datetimepicker/RNDateTimePicker.podspec'
  pod 'RNDeviceInfo', :path => '../node_modules/react-native-device-info'
  # React Native Maps dependencies
  pod 'react-native-google-maps', :path => '../node_modules/react-native-maps'
  pod 'GoogleMaps'
  pod 'Google-Maps-iOS-Utils'
```

Edit Info.plist for react-native-vector-icons
List of all available fonts to copy & paste in info.plist
```
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>
```

### For react-native-geolocation-service

#### ios
Update info.plist

NSLocationWhenInUseUsageDescription

#### android
```
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## Example ##
Preparing
