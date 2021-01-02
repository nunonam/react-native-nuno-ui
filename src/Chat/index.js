import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Text from '../Text';
import Modal from '../Modal';
import Seperator from '../Seperator';
import Button from '../Button';
import HView from '../HView';
import TextInput from '../TextInput';
import Image from '../Image';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {screenWidth, color} from 'react-native-nuno-ui/style';
import { formatAMPM, formatYYMMDD } from '../../funcs';
import { ProfileBar } from 'react-native-nuno-ui';
import Icon from 'react-native-nuno-ui/src/Icon';

export default (props) => {
  const [message, setMessage] = React.useState('');

  const renderItem = ({item, index}) => {
    let createdAt, prevCreatedAt, nextCreatedAt;
    createdAt = new Date(item.createdAt); // our Date object

    if (index > 0) {
      prevCreatedAt = new Date(props.messages[index-1].createdAt);
    }
    if (index < props.messages.length - 1) {
      nextCreatedAt = new Date(props.messages[index+1].createdAt);
    }

    const currentTimestamp = formatAMPM(createdAt);
    const prevTimestamp = index > 0 && item.UserId === props.messages[index-1].UserId && formatAMPM(prevCreatedAt);
    const currentDate = formatYYMMDD(createdAt);
    const nextDate = index < props.messages.length - 1 && formatYYMMDD(nextCreatedAt);

    // system message
    if (item.system) {
      return (
        <View style={{padding: 20}}>
          <View style={{alignItems: 'center', backgroundColor: color('lightgray'), padding: 20, borderRadius: 5}}>
            <Text text={item.text} fontSize={props.fontSize || 12} color={color('darkgray')} />
          </View>
        </View>
      )
    }

    // user message
    if (props.me.id === item.UserId) {
      return (
        <View>
          {currentDate !== nextDate && (
            <View style={{padding: 20}}>
              <Seperator line />
              <View style={{position: 'absolute', top: 10, alignItems: 'center', width: screenWidth}}>
                <View style={{backgroundColor: color('white'), paddingHorizontal: 20}}>
                  <Text fontSize={props.fontSize || 10} color={color('gray')} text={currentDate} />
                </View>
              </View>
            </View>
          )}
          <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', paddingHorizontal: 15, paddingVertical: 2}}>
            <Seperator width={70} />
            <HView style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              {currentTimestamp !== prevTimestamp && (
                <View style={{marginRight: 10}}>
                  <Text fontSize={10} color={color('gray')} text={currentTimestamp} />
                </View>
              )}
              <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 5, backgroundColor: color('theme'), padding: 10}}>
                {item.lat && item.lon ? (
                  <TouchableOpacity onPress={() => props.openMap({lat: item.lat, lng: item.lon})}>
                    <Text fontSize={props.fontSize || 12} color={color('white')} text={item.text} style={{textDecorationLine: 'underline'}} />
                  </TouchableOpacity>
                ) : (
                  <Text fontSize={props.fontSize || 12} color={'white'} text={item.text} />
                )}
              </View>
            </HView>
          </HView>
        </View>
      );
    } else { // 채팅상대 메세지
      return (
        <View>
          {currentDate !== nextDate && (
            <View style={{padding: 20}}>
              <Seperator line />
              <View style={{position: 'absolute', top: 10, alignItems: 'center', width: screenWidth}}>
                <View style={{backgroundColor: color('white'), paddingHorizontal: 20}}>
                  <Text fontSize={props.fontSize || 10} color={color('gray')} text={currentDate} />
                </View>
              </View>
            </View>
          )}
          <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 15, paddingVertical: 2}}>
            {((index < props.messages.length - 1 && item.UserId !== props.messages[index+1].UserId) || index+1 === props.messages.length) ? (
              <ProfileBar
                size={30}
                user={props.tUser}
                onlyImage
                onPress={() => props.tUser ? props.gotoProfile(props.tUser.id) : null}
              />
            ) : (
              <View style={{width: 40}} />
            )}
            {/* <Seperator width={6} /> */}
            <View style={{flex: 1}}>
              {((index < props.messages.length - 1 && item.UserId !== props.messages[index+1].UserId) || index+1 === props.messages.length) && (
                <View>
                  <Text fontSize={props.fontSize || 12} color={color('darkgray')} text={props.tUser?.name} />
                  <Seperator height={10} />
                </View>
              )}
              <HView style={{flex: 1, alignItems: 'flex-end'}}>
                <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 5, borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: color('lightgray'), paddingVertical: 10, paddingHorizontal: 15}}>
                  {item.lat && item.lon ? (
                    <TouchableOpacity onPress={() => props.openMap({lat: item.lat, lng: item.lon})}>
                      <Text fontSize={props.fontSize || 12} color={color('black')} text={item.text} style={{textDecorationLine: 'underline'}} />
                    </TouchableOpacity>
                  ) : (
                    <Text fontSize={props.fontSize || 12} color={color('black')} text={item.text} />
                  )}
                </View>
                {currentTimestamp !== prevTimestamp && (
                  <View style={{marginLeft: 10}}>
                    <Text fontSize={10} color={color('gray')} text={currentTimestamp} />
                  </View>
                )}
              </HView>
            </View>
            <Seperator width={70} />
          </HView>
        </View>
      );
    }
  };
  const send = () => {
    if (message) {
      if (props.onSend({text: message})) {
        setMessage('');
      }
    }
  };
  const openCalendar = () => {
    props.navigation.navigate('Calendar', {
      return: (data) => {
        props.onSend({date: date});
      },
    });
  }
  const openAddress = () => {
    props.navigation.navigate('Address', {
      return: ({address, coords}) => {
        props.onSend({address: address, coords: coords});
      },
    });
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={props.messages}
        keyExtractor={item => JSON.stringify(item.id)}
        renderItem={renderItem}
        inverted={true}
        onEndReached={() => {
          console.log('ENDREACED');
          if (!props.last) {
            props.setPage(props.page + 1);
          }
        }}
        initialNumToRender={50}
        onEndReachedThreshold={0.1}
      />
      <Seperator marginBottom={5} />
      <HView style={{borderTopWidth: 0.5, borderTopColor: color('lightgray')}}>
        {props.leftComponent}
        <View style={{flex: 1}}>
          <HView>
            <TouchableOpacity onPress={openCalendar} style={{padding: 15, paddingRight: 7}}>
              <Icon name={'calendar'} size={20} color={color('black')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openAddress} style={{padding: 15, paddingLeft: 7}}>
              <Icon name={'map-marker'} size={20} color={color('black')} />
            </TouchableOpacity>
            <View style={{flex: 1, paddingVertical: 2}}>
              <TextInput
                placeholder={props.disable ? '메세지를 입력할수 없습니다': '메세지를 입력해주세요'}
                onChangeText={(e) => setMessage(e)}
                value={message}
                borderWidth={0}
                editable={!props.disable}
                // autoFocus={!props.disable}
              />
            </View>
            <TouchableOpacity onPress={() => send()} style={{padding: 15}}>
              <Icon name={'send'} size={20} color={message ? color('black') : color('gray')} />
            </TouchableOpacity>
          </HView>
        </View>
      </HView>
      <Seperator bottom />
      {Platform.OS === 'ios' && (
        <KeyboardSpacer topSpacing={-getBottomSpace()} />
      )}
    </View>
  );
}
