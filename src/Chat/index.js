import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Text from '../Text';
import Modal from '../Modal';
import Seperator from '../Seperator';
import Button from '../Button';
import HView from '../HView';
import TextInput from '../TextInput';
import Image from '../Image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import { Nuno, Loader } from 'react-native-nuno-ui';
import moment from 'moment';
import {screenWidth} from '../style';

export default ({messages, me, more, moredone, emptyAvatar, fontSize, leftComponent, onSend}) => {
  const [message, setMessage] = React.useState('');

  const renderItem = ({item, index}) => {
    const currentTimestamp = moment(new Date(item.createdAt.replace(' ', 'T'))).format('a h:mm');
    const prevTimestamp = index > 0 && item.id === messages[index-1].id && moment(new Date(messages[index-1].createdAt.replace(' ', 'T'))).format('a h:mm');
    const currentDate = moment(new Date(item.createdAt.replace(' ', 'T'))).format('YYYY년 MM월 DD일');
    const nextDate = index < messages.length - 1 && moment(new Date(messages[index+1].createdAt.replace(' ', 'T'))).format('YYYY년 MM월 DD일');
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
          <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', paddingHorizontal: 15, paddingVertical: 2}}>
            <Seperator width={70} />
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 5, backgroundColor: Nuno.config.themeColor, padding: 10}}>
                <Text fontSize={fontSize || 14} color={'white'} text={item.text} />
                {currentTimestamp !== prevTimestamp && (
                  <View style={{position: 'absolute', left: -60, bottom: 0}}>
                    <Text fontSize={14} color={'darkgray'} text={currentTimestamp} />
                  </View>
                )}
              </View>
            </View>
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
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <View style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 5, borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundColor: 'lightgray', paddingVertical: 10, paddingHorizontal: 15}}>
                <Text fontSize={fontSize || 14} color={'black'} text={item.text} />
                {currentTimestamp !== prevTimestamp && (
                  <View style={{position: 'absolute', right: -60, bottom: 0}}>
                    <Text fontSize={14} color={'darkgray'} text={currentTimestamp} />
                  </View>
                )}
              </View>
            </View>
            <Seperator width={50} />
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
        avatar: me.avatar
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
      <HView style={{paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: 'lightgray', paddingVertical: 10}}>
        {leftComponent}
        <View style={{flex: 1, borderWidth: 1, borderColor: 'lightgray', borderRadius: 20}}>
          <HView>
            <View style={{flex: 1, paddingLeft: 13}}>
              <TextInput placeholder={'메세지를 입력해주세요'} onChangeText={(e) => setMessage(e)} value={message} borderWidth={0} />
            </View>
            <TouchableOpacity onPress={() => send()} style={{paddingHorizontal: 20, paddingVertical: 10}}>
              <Text text={'전송'} fontSize={14} fontWeight={'bold'} />
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
