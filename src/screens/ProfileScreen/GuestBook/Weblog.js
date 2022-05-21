import React,{useState} from 'react';
import { View, Text,TouchableOpacity,FlatList,SafeAreaView} from 'react-native';
import GuestBookInput from './GuestBookInput';
import GuestPostCard from '../../../utils/GuestPostCard';
import {Container} from '../../../../styles/FeedStyles';


const Posts=[
  {
    id:'1',
    userName:'yejin',
    userImg: require('../../../../assets/images/freestyleY.jpg'),
    postTime:'4 mins ago',
    post:'yoyo whats up'
  },
  {
    id:'2',
    userName:'yeyeyejin',
    userImg: require('../../../../assets/images/freestyleY.jpg'),
    postTime:'0 mins ago',
    post:'wahahahaha'
  },
  {
    id:'3',
    userName:'happpy',
    userImg: require('../../../../assets/images/freestyleY.jpg'),
    postTime:'32mins ago',
    post:'hayhay!'
  },

];

const Weblog = () => {

    return (
        <Container>
        <GuestBookInput/>
        <FlatList
        data={Posts}
        renderItem={({item})=> <GuestPostCard item={item}/>}
        keyExtractor={item =>item.id}
        />
        </Container>
  );
};

export default Weblog;
