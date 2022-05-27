import React,{useEffect, useState} from 'react';
import { View, Text,TouchableOpacity,FlatList,SafeAreaView} from 'react-native';
import GuestBookInput from './GuestBookInput';
import GuestPostCard from '../../../utils/GuestPostCard';
import {Container} from '../../../../styles/FeedStyles';
import firestore from '@react-native-firebase/firestore';


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
  const[guestBook,setguestBook]=useState(null);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchGuestbook = async()=>{
     try{
       const list =[];
       await firestore()
       .collection('guestbook')
       .get()
       .then((querySnapshot)=>{
         querySnapshot.forEach(doc=>{
           const {userId,post,postTime} = doc.data();
           list.push({
            id:doc.id,
            userId,
            userImg:'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            userName:'Test Name',
            postTime:postTime,
            post,
         });
        });
      });

      setguestBook(list);
      if (loading){
        setLoading(false);
      }
      console.log('guestbook:',guestBook);

     } catch(e){
       console.log(e);
     }
    }
    fetchGuestbook();
  },[]);

    return (
        <Container>
        <GuestBookInput/>
        <FlatList
        data={guestBook}
        renderItem={({item})=> <GuestPostCard item={item}/>}
        keyExtractor={item =>item.id}
        showsVerticalScrollIndicator={false}
        />
        </Container>
  );
};

export default Weblog;
