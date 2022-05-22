import React, {useEffect, useState,useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import PostCard from '../../utils/PostCard';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import  firebase from '@react-native-firebase/app';
import {Container} from '../../../styles/FeedStyles';
import { AuthContext } from '../../utils/AuthProvider';
import useStore from '../../../store/store';



const SnsScreen = ({navigation,route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [currentUserLike, setCurrentUserLike] = useState(false)
  const {Post,SetPost} = useStore(); // 0522새로고침용
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
    
    

  const fetchPosts = async () => {
    try {
      const list = [];

      
      await firestore()
        
      .collection("posts")
      .orderBy('postTime', 'desc')
      .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              post,
              uid,
              postImg,
              postTime,
              likes,  
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              uid,
              postTime: postTime,
              postImg,
              post,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);
      
      if (loading) {
        setLoading(false);
      }

    
    } catch (e) {
      console.log(e);
    }
  };



  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted,refreshing,Post]);

  const handleDelete = (postId) => {
    Alert.alert(
      '글 삭제하기',
      '확실합니까?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} 성공적으로 삭제되었습니다.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          '글이 삭제되었습니다.',
          '당신의 글이 성공적으로 삭제되었습니다!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

  const ListHeader = () => {
    return null;
  };
  return (

        <Container>
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <PostCard
                item={item}
                onDelete={handleDelete}
                onPress={() =>
                  {
                  navigation.navigate('SNSProfile', {uid: item.uid})
                  
                  }
                }
              />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </Container>
    
   
  );
};

export default SnsScreen;
