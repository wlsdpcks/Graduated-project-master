import React, {useEffect, useState} from 'react';

import {Image, StyleSheet, Dimensions} from 'react-native';

export default function PostImage({post}) {
  const [posts, setPosts] = useState(null);
  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              uid,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              uid,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
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

      console.log('posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return <Image source={{uri: 'posts.postImg'}} style={Styles.postImg} />;
}

const Styles = StyleSheet.create({
  postImg: {
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').width,
    resizeMode: 'contain',
  },
});
