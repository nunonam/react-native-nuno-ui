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
import { Nuno, Loader } from 'react-native-nuno-ui';
import moment from 'moment';
import {screenWidth} from '../style';

export default ({
  messages,
  me,
  more,
  moredone,
  emptyAvatar,
  fontSize,
  leftComponent,
  onSend,
  openMap,
}) => {
  const [message, setMessage] = React.useState('');

  const renderItem = ({item, index}) => {
    let createdAt, prevCreatedAt, nextCreatedAt;
    createdAt = new Date(item.createdAt); // our Date object

    if (index > 0) {
      prevCreatedAt = new Date(messages[index-1].createdAt);
    }
    if (index < messages.length - 1) {
      nextCreatedAt = new Date(messages[index+1].createdAt);
    }

    const currentTimestamp = moment(createdAt).format('a h:mm');
    const prevTimestamp = index > 0 && item.id === messages[index-1].id && moment(prevCreatedAt).format('a h:mm');
    const currentDate = moment(createdAt).format('YYYY년 MM월 DD일');
    const nextDate = index < messages.length - 1 && moment(nextCreatedAt).format('YYYY년 MM월 DD일');

    // system message
    if (item.id === 0) {
      return (
        <View style={{padding: 20}}>
          <View style={{alignItems: 'center', backgroundColor: 'whitesmoke', padding: 20, borderRadius: 5}}>
            <Text text={item.text} fontSize={fontSize || 14} color={'#FE7262'} />
          </View>
        </View>
      )
    }

    // user message
    if (me.id === item.id) {
      return (
        <View>
          {currentDate !== nextDate && (
            <View style={{padding: 20}}>
              <Seperator line />
              <View style={{position: 'absolute', top: 10, alignItems: 'center', width: screenWidth}}>
                <View style={{backgroundColor: 'white', paddingHorizontal: 20}}>
                  <Text fontSize={fontSize || 14} color={'gray'} text={currentDate} />
                </View>
              </View>
            </View>
          )}
          {/* {((index < messages.length - 1 && item.id !== messages[index+1].id) || index+1 === messages.length) && (
            <Text fontSize={fontSize || 14} color={'dimgray'} text={item.name} />
          )} */}
          <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', paddingHorizontal: 15, paddingVertical: 2}}>
            <Seperator width={70} />
            <HView style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              {currentTimestamp !== prevTimestamp && (
                <View style={{marginRight: 10}}>
                  <Text fontSize={14} color={'darkgray'} text={currentTimestamp} />
                </View>
              )}
              <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 5, backgroundColor: Nuno.config.themeColor, padding: 10}}>
                {item.lat && item.lon ? (
                  <TouchableOpacity onPress={() => openMap({lat: item.lat, lng: item.lon})}>
                    <Text fontSize={fontSize || 14} color={'white'} text={item.text} style={{textDecorationLine: 'underline'}} />
                  </TouchableOpacity>
                ) : (
                  <Text fontSize={fontSize || 14} color={'white'} text={item.text} />
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
                <View style={{backgroundColor: 'white', paddingHorizontal: 20}}>
                  <Text fontSize={fontSize || 14} color={'gray'} text={currentDate} />
                </View>
              </View>
            </View>
          )}
          <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 15, paddingVertical: 2}}>
            {((index < messages.length - 1 && item.id !== messages[index+1].id) || index+1 === messages.length) ? (
              item.avatar ? (
                <Image uri={item.avatar} height={36} width={36} borderRadius={18} onPress={() => null} />
              ) : (
                <Image local uri={emptyAvatar} height={36} width={36} borderRadius={18} onPress={() => null} />
              )
            ) : (
              <View style={{width: 36}} />
            )}
            <Seperator width={10} />
            <View style={{flex: 1}}>
              {((index < messages.length - 1 && item.id !== messages[index+1].id) || index+1 === messages.length) && (
                <View>
                  <Text fontSize={fontSize || 14} color={'dimgray'} text={item.name} />
                  <Seperator height={10} />
                </View>
              )}
              <HView style={{flex: 1, alignItems: 'flex-end'}}>
                <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 5, borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'lightgray', paddingVertical: 10, paddingHorizontal: 15}}>
                  {item.lat && item.lon ? (
                    <TouchableOpacity onPress={() => openMap({lat: item.lat, lng: item.lon})}>
                      <Text fontSize={fontSize || 14} color={'black'} text={item.text} style={{textDecorationLine: 'underline'}} />
                    </TouchableOpacity>
                  ) : (
                    <Text fontSize={fontSize || 14} color={'black'} text={item.text} />
                  )}
                </View>
                {currentTimestamp !== prevTimestamp && (
                  <View style={{marginLeft: 10}}>
                    <Text fontSize={14} color={'darkgray'} text={currentTimestamp} />
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
      onSend({
        text: message,
        avatar: me.avatar,
        name: me.name,
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={messages}
        keyExtractor={item => item.index}
        renderItem={renderItem}
        inverted={true}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // ListFooterComponent={moredone ? null : <View style={{paddingVertical: 10}}><Loader /></View>}
        onEndReached={() => {
          console.log('chat endReched!');
          if (!moredone) {
            more();
          }
        }}
      />
      <Seperator marginBottom={5} />
      <HView style={{paddingHorizontal: 15, borderTopWidth: 1, borderTopColor: 'lightgray', paddingVertical: 2}}>
        {leftComponent}
        <View style={{flex: 1}}>
          <HView>
            <View style={{flex: 1}}>
              <TextInput placeholder={'메세지를 입력해주세요'} onChangeText={(e) => setMessage(e)} value={message} borderWidth={0} />
            </View>
            <TouchableOpacity onPress={() => send()}>
              <MaterialIcons name={'send'} size={20} color={Nuno.themeColor} />
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
