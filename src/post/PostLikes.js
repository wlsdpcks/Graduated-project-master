import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from 'res/colors';

export default function PostLikes({post}) {
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

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => console.log('Pressed Post Likes')}
      style={{marginLeft: 15, marginTop: 10, marginEnd: 15}}>
      <Text style={{color: colors.text, fontWeight: 'bold'}}>
        {posts.likes} likes{' '}
      </Text>
    </TouchableOpacity>
  );
}
