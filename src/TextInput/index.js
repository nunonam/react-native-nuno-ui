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
import Text from '../Text';
import HView from '../HView';
import Seperator from '../Seperator';
import { Icon, Nuno } from 'react-native-nuno-ui';
import {color} from 'react-native-nuno-ui/style';

const inputAccessoryViewID = 'keyboard-id';

export default (props) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(props.showEye ? true : false);

  return (
    <View>
      {props.title && (
        <View>
          <Text fontSize={16} fontWeight={'500'} text={props.title} color={color('darkgray')} />
          <Seperator height={10} />
        </View>
      )}
      <HView>
        <View style={{flex: 1}}>
          <TextInput
            ref={props.forwardRef}
            style={{
              fontSize: 14,
              color: props.color || color('darkgray'),
              backgroundColor: props.backgroundColor || color('white'),
              height: props.height || (props.multiline ? 150 : 44),
              justifyContent: 'center',
              padding: props.padding !== undefined ? props.padding : 10,
              textAlignVertical: props.multiline ? 'top' : 'center',
              borderWidth: props.borderWidth !== undefined ? props.borderWidth : 0.5,
              borderColor: props.borderColor || color('lightgray'),
              borderRadius: props.borderRadius !== undefined ? props.borderRadius : 4,
              ...props.style,
            }}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor || color('gray')}
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
        </View>
        {props.showRemain && (
          <View style={{position: 'absolute', right: 0, top: -30}}>
            <Text
              fontSize={14}
              fontWeight={'500'}
              color={color('gray')}
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
              <AntDesign name={'eye'} size={20} color={color('lightgray')} />
            ) : (
              <AntDesign name={'eye'} size={20} color={color('black')} />
            )}
          </TouchableOpacity>
        )}

        {props.showMagnify && (
          <View
            style={{position: 'absolute', right: 20}}>
            <Icon name={'magnify'} size={24} color={color('theme')} />
          </View>
        )}
        {props.unit && (
          <View style={{position: 'absolute', right: 10}}>
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
              borderTopColor: color('lightgray'),
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
              <AntDesign name={'close'} size={20} color={props.keyboardCloseColor || color('white')} />
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};
