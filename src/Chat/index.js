import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Text from '../Text';
import Modal from '../Modal';
import Seperator from '../Seperator';
import Button from '../Button';
import HView from '../HView';
import TextInput from '../TextInput';
import Image from '../Image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import moment from 'moment';
import {screenWidth, color} from 'react-native-nuno-ui/style';

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

    const currentTimestamp = moment(createdAt).format('a h:mm');
    const prevTimestamp = index > 0 && item.UserId === props.messages[index-1].UserId && moment(prevCreatedAt).format('a h:mm');
    const currentDate = moment(createdAt).format('YYYY년 MM월 DD일');
    const nextDate = index < props.messages.length - 1 && moment(nextCreatedAt).format('YYYY년 MM월 DD일');

    // system message
    if (item.bySystem) {
      return (
        <View style={{padding: 20}}>
          <View style={{alignItems: 'center', backgroundColor: color('lightgray'), padding: 20, borderRadius: 5}}>
            <Text text={item.text} fontSize={props.fontSize || 14} color={'#FE7262'} />
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
                  <Text fontSize={props.fontSize || 14} color={color('gray')} text={currentDate} />
                </View>
              </View>
            </View>
          )}
          {/* {((index < props.messages.length - 1 && item.id !== props.messages[index+1].id) || index+1 === props.messages.length) && (
            <Text fontSize={props.fontSize || 14} color={'dimgray'} text={item.name} />
          )} */}
          <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', paddingHorizontal: 15, paddingVertical: 2}}>
            <Seperator width={70} />
            <HView style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              {currentTimestamp !== prevTimestamp && (
                <View style={{marginRight: 10}}>
                  <Text fontSize={14} color={color('darkgray')} text={currentTimestamp} />
                </View>
              )}
              <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 5, backgroundColor: color('theme'), padding: 10}}>
                {item.lat && item.lon ? (
                  <TouchableOpacity onPress={() => props.openMap({lat: item.lat, lng: item.lon})}>
                    <Text fontSize={props.fontSize || 14} color={color('white')} text={item.text} style={{textDecorationLine: 'underline'}} />
                  </TouchableOpacity>
                ) : (
                  <Text fontSize={props.fontSize || 14} color={color('white')} text={item.text} />
                )}
              </View>
            </HView>
          </HView>
        </View>
      );
    } else {
      return (
        <View>
          {currentDate !== nextDate && (
            <View style={{padding: 20}}>
              <Seperator line />
              <View style={{position: 'absolute', top: 10, alignItems: 'center', width: screenWidth}}>
                <View style={{backgroundColor: color('white'), paddingHorizontal: 20}}>
                  <Text fontSize={props.fontSize || 14} color={color('gray')} text={currentDate} />
                </View>
              </View>
            </View>
          )}
          <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 15, paddingVertical: 2}}>
            {((index < props.messages.length - 1 && item.UserId !== props.messages[index+1].UserId) || index+1 === props.messages.length) ? (
              <Image uri={item.photo} height={36} width={36} borderRadius={18} onPress={() => item.UserId !== null && props.gotoProfile(item.UserId)} />
              // item.avatar ? (
              //   <Image uri={item.avatar} height={36} width={36} borderRadius={18} onPress={() => null} />
              // ) : (
              //   <Image local uri={emptyAvatar} height={36} width={36} borderRadius={18} onPress={() => null} />
              // )
            ) : (
              <View style={{width: 36}} />
            )}
            <Seperator width={10} />
            <View style={{flex: 1}}>
              {((index < props.messages.length - 1 && item.UserId !== props.messages[index+1].UserId) || index+1 === props.messages.length) && (
                <View>
                  <Text fontSize={props.fontSize || 14} color={color('darkgray')} text={item.name} />
                  <Seperator height={10} />
                </View>
              )}
              <HView style={{flex: 1, alignItems: 'flex-end'}}>
                <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 5, borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: color('lightgray'), paddingVertical: 10, paddingHorizontal: 15}}>
                  {item.lat && item.lon ? (
                    <TouchableOpacity onPress={() => props.openMap({lat: item.lat, lng: item.lon})}>
                      <Text fontSize={props.fontSize || 14} color={color('black')} text={item.text} style={{textDecorationLine: 'underline'}} />
                    </TouchableOpacity>
                  ) : (
                    <Text fontSize={props.fontSize || 14} color={color('black')} text={item.text} />
                  )}
                </View>
                {currentTimestamp !== prevTimestamp && (
                  <View style={{marginLeft: 10}}>
                    <Text fontSize={14} color={color('darkgray')} text={currentTimestamp} />
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
      setMessage('');
      props.onSend({text: message});
    }
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={props.messages}
        keyExtractor={item => JSON.stringify(item.id)}
        renderItem={renderItem}
        inverted={true}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // ListFooterComponent={props.moredone ? null : <View style={{paddingVertical: 10}}><Loader /></View>}
        onEndReached={() => {
          console.log('chat endReched!');
          if (!props.moredone) {
            props.more();
          }
        }}
      />
      <Seperator marginBottom={5} />
      <HView style={{paddingHorizontal: 15, borderTopWidth: 0.5, borderTopColor: 'lightgray', paddingVertical: 2}}>
        {props.leftComponent}
        <View style={{flex: 1}}>
          <HView>
            <View style={{flex: 1}}>
              <TextInput placeholder={props.disable ? '메세지를 입력할수 없습니다': '메세지를 입력해주세요'} onChangeText={(e) => setMessage(e)} value={message} borderWidth={0} editable={!props.disable} />
            </View>
            <TouchableOpacity onPress={() => send()}>
              <MaterialIcons name={'send'} size={20} color={message ? 'black' : 'darkgray'} />
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
