import React from 'react';
import {Platform, NativeModules, Modal, View, TouchableOpacity} from 'react-native';
import Seperator from '../Seperator';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Text from '../Text';

export default function DateTime({locale, mode, value, title, placeholder, minuteInterval, onValueChange, pickerClose, borderWidth}) {
  const [showPicker, setShowPicker] = React.useState(false);

  if (!locale) {
    locale = Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;
  }
  if (!value) {
    value = new Date();
  }
  let formattedValue;
  switch (mode) {
    case 'time':
      formattedValue = value.toLocaleTimeString(locale, {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
      });
      break;
    default:
      formattedValue = value.toLocaleDateString(locale);
      break;
  }

  return (
    <View>
      {title && (
        <>
          <Text fontSize={16} fontWeight={'500'} text={title} color={'dimgray'} />
          <Seperator height={10} />
        </>
      )}
      <TouchableOpacity
        onPress={() => setShowPicker(!showPicker)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderWidth: borderWidth !== undefined ? borderWidth : 1,
          borderColor: 'lightgray',
          borderRadius: 5,
          paddingHorizontal: 10,
          height: 44,
        }}>
        <View style={{flex: 1}}>
          {formattedValue ? (
            <Text fontSize={14} color={'dimgray'} text={formattedValue} />
          ) : (
            <Text fontSize={14} color={'gray'} text={placeholder} />
          )}
        </View>
        <View>
          <AntDesign name={'down'} size={10} color={'black'} />
        </View>
      </TouchableOpacity>

      {Platform.OS === 'ios' ? (
        <Modal
          visible={showPicker}
          transparent
          onBackdropPress={() => setShowPicker(!showPicker)}
          animationType={'slide'}>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity style={{flex: 1}} onPress={() => setShowPicker(!showPicker)} />
            {pickerClose && <View
              style={{
                height: 50,
                backgroundColor: 'lightgray',
                borderColor: 'lightgray',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => setShowPicker(!showPicker)}
                style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <AntDesign name={'down'} size={20} color={'gray'} />
              </TouchableOpacity>
            </View>}
            <View style={{backgroundColor: 'lightgray'}}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <RNDateTimePicker
                  mode={mode || 'date'}
                  locale={locale}
                  format="lll"
                  display="default"
                  minuteInterval={minuteInterval}
                  onChange={(e, date) => {
                    onValueChange(date);
                  }}
                  value={value}
                />
              </View>
              <Seperator bottom />
            </View>
          </View>
        </Modal>
      ) : (
        showPicker && (
          <RNDateTimePicker
            mode={mode || 'date'}
            locale={locale}
            format="lll"
            display="spinner"
            onChange={(e, date) => {
              setShowPicker(false);
              if (e.type === 'set') {
                onValueChange(date);
              }
            }}
            value={value}
          />
        )
      )}
    </View>
  );
}
