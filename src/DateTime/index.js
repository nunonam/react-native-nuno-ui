import React from 'react';
import {Platform, Modal, View, TouchableOpacity} from 'react-native';
import Seperator from '../Seperator';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Text from '../Text';
import { Nuno } from 'react-native-nuno-ui';
import { color } from 'react-native-nuno-ui/style';
import { formatYYMMDD } from 'react-native-nuno-ui/funcs';

export default function DateTime(props) {
  const [showPicker, setShowPicker] = React.useState(false);
  let formattedValue;
  switch (props.mode) {
    case 'time':
      formattedValue = props.value ? props.value.toLocaleTimeString(Nuno.config.LANG, {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
      }) : '';
      break;
    default:
      formattedValue = props.value ? formatYYMMDD(props.value) : '';
      break;
  }

  return (
    <View>
      {props.title && (
        <>
          <Text fontSize={16} fontWeight={'500'} text={props.title} color={color('darkgray')} />
          <Seperator height={10} />
        </>
      )}
      <TouchableOpacity
        onPress={
          props.disable
            ? () => null
            : () => setShowPicker(!showPicker)
        }
        activeOpacity={
          props.disable ? 1 : 0.5
        }
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: color('white'),
          borderWidth: props.borderWidth !== undefined ? props.borderWidth : 0.5,
          borderColor: color('lightgray'),
          borderRadius: 5,
          paddingHorizontal: 10,
          height: 44,
        }}>
        <View style={{flex: 1}}>
          {formattedValue ? (
            <Text fontSize={14} color={color('darkgray')} text={formattedValue} />
          ) : (
            <Text fontSize={14} color={color('gray')} text={props.placeholder} />
          )}
        </View>
        <View>
          <AntDesign name={'down'} size={10} color={color('black')} />
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
            {props.closeBar && <View
              style={{
                height: 50,
                backgroundColor: props.closeBarColor || color('lightgray'),
                borderColor: color('lightgray'),
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => setShowPicker(!showPicker)}
                style={{paddingHorizontal: 20, paddingVertical: 10}}>
                <AntDesign name={'close'} size={20} color={color('gray')} />
              </TouchableOpacity>
            </View>}
            <View style={{backgroundColor: props.backgroundColor || color('lightgray')}}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <RNDateTimePicker
                  mode={props.mode || 'date'}
                  locale={Nuno.config.LANG}
                  maximumDate={props.maximumDate}
                  format="lll"
                  display="default"
                  minuteInterval={props.minuteInterval}
                  onChange={(e, date) => {
                    props.onChange(date);
                  }}
                  textColor={color('black')}
                  value={props.value || new Date()}
                />
              </View>
              <Seperator bottom />
            </View>
          </View>
        </Modal>
      ) : (
        showPicker && (
          <RNDateTimePicker
            mode={props.mode || 'date'}
            locale={Nuno.config.LANG}
            maximumDate={props.maximumDate}
            format="lll"
            display="spinner"
            onChange={(e, date) => {
              setShowPicker(false);
              if (e.type === 'set') {
                props.onChange(date);
              }
            }}
            textColor={color('black')}
            value={props.value || new Date()}
          />
        )
      )}
    </View>
  );
}
