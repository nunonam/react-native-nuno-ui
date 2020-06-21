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

const inputAccessoryViewID = 'keyboard-id';

export default (props) => {
  let inputRef = React.useRef();
  return (
    <View>
      {props.title && (
        <View>
          <Text fontSize={14} fontWeight={'bold'} text={props.title} />
          <Seperator height={10} />
        </View>
      )}
      <HView>
        <View style={{flex: 1}}>
          {props.mask ? (
            <MaskedInput
              ref={props.inputRef}
              style={{
                fontSize: 14,
                color: 'dimgray',
                backgroundColor: props.backgroundColor || 'white',
                height: props.multiline ? 150 : (props.height || 44),
                justifyContent: 'center',
                paddingVertical: 10,
                textAlignVertical: 'center',
                borderWidth: props.borderWidth || 1,
                borderColor: 'lightgray',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
              placeholder={props.placeholder}
              placeholderTextColor={'gray'}
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
              secureTextEntry={props.secureTextEntry}
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
              ref={props.inputRef}
              // ref={e => (inputRef.current = e)}
              style={{
                fontSize: 14,
                color: 'dimgray',
                backgroundColor: props.backgroundColor || 'white',
                height: props.multiline ? 150 : (props.height || 44),
                justifyContent: 'center',
                paddingVertical: 10,
                textAlignVertical: 'center',
                borderWidth: props.borderWidth || 1,
                borderColor: 'lightgray',
                borderRadius: 4,
                paddingHorizontal: 10,
              }}
              placeholder={props.placeholder}
              placeholderTextColor={'gray'}
              onChangeText={props.onChangeText}
              value={props.value}
              autoFocus={props.autoFocus}
              maxLength={props.maxLength}
              secureTextEntry={props.secureTextEntry}
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
              fontWeight={'medium'}
              color={'lightgray'}
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
            onPress={props.handleEye}
            style={{position: 'absolute', right: 20}}>
            {props.secureTextEntry ? (
              <AntDesign name={'eye'} size={20} color={'dartgray'} />
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

      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View
            style={{
              alignItems: 'flex-end',
              backgroundColor: 'lightgray',
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
              <AntDesign name={'down'} size={20} color={'gray'} />
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};
