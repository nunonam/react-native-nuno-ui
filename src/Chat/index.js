import React from 'react';
import {View, FlatList} from 'react-native';
import Text from '../Text';
import Modal from '../Modal';
import Seperator from '../Seperator';
import Button from '../Button';
import HView from '../HView';
import TextInput from '../TextInput';
import Image from '../Image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default ({messages, me}) => {
  const [visible, setVisible] = React.useState(true);
  const renderItem = ({item}) => {
    if (me.id === item.user.id) {
      return (
        <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', paddingHorizontal: 20, paddingVertical: 10}}>
          <Seperator width={50} />
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <View style={{borderRadius: 5, backgroundColor: 'lightgray', padding: 10}}>
              <Text fontSize={14} color={'dimgray'} text={item.text} />
            </View>
          </View>
          {/* <Image uri={item.user.avatar} height={50} width={50} borderRadius={25} onPress={() => null} /> */}
          <Seperator width={10} />
          <FontAwesome name={'user-circle'} color={'lightgray'} size={40} />
        </HView>
      );
    } else {
      return (
        <HView style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 20, paddingVertical: 10}}>
          {/* <Image uri={item.user.avatar} height={50} width={50} borderRadius={25} onPress={() => null} /> */}
          <FontAwesome name={'user-circle'} color={'lightgray'} size={40} />
          <Seperator width={10} />
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <View style={{borderRadius: 5, backgroundColor: 'lightgray', padding: 10}}>
              <Text fontSize={14} color={'dimgray'} text={item.text} />
            </View>
          </View>
          <Seperator width={50} />
        </HView>
      );
    }
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        inverted={true}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      <Seperator marginBottom={5} />
      <HView style={{paddingHorizontal: 20}}>
        <View style={{flex: 1}}>
          <TextInput placeholder={'메세지를 입력해주세요'} onChangeText={() => null} value={''} />
        </View>
        <Seperator width={10} />
        <Text text={'send'} />
      </HView>
      <Seperator bottom />
      <KeyboardSpacer />
    </View>
  );
}
