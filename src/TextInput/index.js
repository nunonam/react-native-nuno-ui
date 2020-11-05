import React from 'react';
import {
  Keyboard,
  Platform,
  InputAccessoryView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaskedInput from 'react-native-masked-input-text';
import Text from '../Text';
import HView from '../HView';
import Seperator from '../Seperator';
import { Nuno } from 'react-native-nuno-ui';
import {color} from 'react-native-nuno-ui/style';

const inputAccessoryViewID = 'keyboard-id';

export default (props) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(props.showEye ? true : false);

  return (
    <View>
      {props.title && (
        <View>
          <Text fontSize={16} fontWeight={'500'} text={props.title} color={'dimgray'} />
          <Seperator height={10} />
        </View>
      )}
      <HView>
        <View style={{flex: 1}}>
          {props.mask ? (
            <MaskedInput
              ref={props.forwardRef}
              style={{
                fontSize: 14,
                color: props.textColor || 'dimgray',
                backgroundColor: props.backgroundColor || 'white',
                height: props.height || (props.multiline ? 150 : 44),
                justifyContent: 'center',
                padding: props.padding !== undefined ? props.padding : 10,
                textAlignVertical: props.multiline ? 'top' : 'center',
                borderWidth: props.borderWidth !== undefined ? props.borderWidth : 1,
                borderColor: props.borderColor || 'lightgray',
                borderRadius: 5,
              }}
              placeholder={props.placeholder}
              placeholderTextColor={props.placeholderTextColor || 'gray'}
              onChangeText={props.onChangeText}
              onChange={props.onChange}
              blurOnSubmit={props.blurOnSubmit}
              onKeyPress={props.onKeyPress}
              value={props.value}
              autoFocus={props.autoFocus}
              maxLength={props.maxLength}
              multiline={props.multiline}
              keyboardType={props.keyboardType}
              returnKeyType={props.returnKeyType}
              returnKeyLabel={props.returnKeyLabel}
              numberOfLines={props.numberOfLines}
              secureTextEntry={secureTextEntry}
              clearButtonMode={props.clearButtonMode}
              autoCapitalize={props.autoCapitalize}
              onContentSizeChange={props.onContentSizeChange}
              onSubmitEditing={props.onSubmitEditing}
              inputAccessoryViewID={inputAccessoryViewID}
              mask={props.mask}
              editable={props.editable}
              onFocus={props.onFocus}
              onBlur={props.onBlur}
            />
          ) : (
            <TextInput
              ref={props.forwardRef}
              style={{
                fontSize: 14,
                color: props.textColor || 'dimgray',
                backgroundColor: props.backgroundColor || 'white',
                height: props.height || (props.multiline ? 150 : 44),
                justifyContent: 'center',
                padding: props.padding !== undefined ? props.padding : 10,
                textAlignVertical: props.multiline ? 'top' : 'center',
                borderWidth: props.borderWidth !== undefined ? props.borderWidth : 1,
                borderColor: props.borderColor || 'lightgray',
                borderRadius: 4,
              }}
              placeholder={props.placeholder}
              placeholderTextColor={props.placeholderTextColor || 'gray'}
              onChangeText={props.onChangeText}
              value={props.value}
              autoFocus={props.autoFocus}
              maxLength={props.maxLength}
              secureTextEntry={secureTextEntry}
              autoCapitalize={props.autoCapitalize}
              multiline={props.multiline}
              editable={props.editable}
              numberOfLines={props.numberOfLines}
              returnKeyType={props.returnKeyType}
              returnKeyLabel={props.returnKeyLabel}
              keyboardType={props.keyboardType}
              clearButtonMode={props.clearButtonMode}
              onContentSizeChange={props.onContentSizeChange}
              onSubmitEditing={props.onSubmitEditing}
              inputAccessoryViewID={inputAccessoryViewID}
              onBlur={props.onBlur}
            />
          )}
        </View>
        {props.showRemain && (
          <View style={{position: 'absolute', right: 0, top: -30}}>
            <Text
              fontSize={14}
              fontWeight={'500'}
              color={'gray'}
              text={
                props.value.length
                  ? props.value.length + ' / ' + props.maxLength
                  : 0 + ' / ' + props.maxLength
              }
            />
          </View>
        )}

        {props.showEye && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={{position: 'absolute', right: 20}}>
            {secureTextEntry ? (
              <AntDesign name={'eye'} size={20} color={'lightgray'} />
            ) : (
              <AntDesign name={'eye'} size={20} color={'black'} />
            )}
          </TouchableOpacity>
        )}

        {props.unit && (
          <View style={{position: 'absolute', right: 5}}>
            <Text fontSize={14} text={props.unit} />
          </View>
        )}
      </HView>

      {Platform.OS === 'ios' && props.keyboardClose && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View
            style={{
              alignItems: 'flex-end',
              backgroundColor: props.keyboardCloseBackgroundColor || color('theme'),
              borderTopWidth: 1,
              borderTopColor: 'lightgray',
            }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                height: 50,
                width: 90,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => Keyboard.dismiss()}>
              <AntDesign name={'close'} size={20} color={props.keyboardCloseColor || 'white'} />
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};
