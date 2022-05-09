import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../res/colors';
import images from '../res/images';
import Icon from 'react-native-vector-icons/AntDesign'
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../../styles/FeedStyles';
import {Image, Dimensions,Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import ProgressiveImage from './ProgressiveImage';
import ADIcon from 'react-native-vector-icons/AntDesign';
import AppText from '../components/Sns/AppText'
import { AuthContext } from './AuthProvider';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

const PostCard = ({item, likesCount, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [likeIcon, setLikeIcon] = useState(false)
  const [currentUserLike, setCurrentUserLike] = useState(false)
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(likesCount);
  const handleLiked = () => {
    !isLiked
      ? setNumberOfLikes(numberOfLikes + 1)
      : setNumberOfLikes(numberOfLikes - 1);
    setIsLiked(!isLiked);
  };
  function tapToLike(likeIcon) {
    
    if (likeIcon % 2 === 0) {
      return images.redHeart;
    } else {
      return images.like;
    }
  }
  const onLikePress = (userId, postId, item) => {
    item.likesCount += 1;
    setCurrentUserLike(true)
    firebase.firestore()
        .collection("posts")
        .doc(userId)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .set({})
        .then()
    props.sendNotification(user.notificationToken, "New Like", `${props.currentUser.name} liked your post`, { type: 0, postId, user: firebase.auth().currentUser.uid })

}
const onDislikePress = (userId, postId, item) => {
    item.likesCount -= 1;

    setCurrentUserLike(false)
    firebase.firestore()
        .collection("posts")
        .doc(userId)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(firebase.auth().currentUser.uid)
        .delete()
}

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card key={item.id}>
        <View style={Styles.container}>
      <View style={Styles.nameContainer}>
        <Image
          source={{uri: userData
            ? userData.userImg ||
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
            : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
        }}
          style={Styles.personImage}
        />
        <View>
        <TouchableOpacity onPress={onPress}>
          <Text style={Styles.personName}> {userData ? userData.name || 'Test' : 'Test'}{' '} </Text>
          </TouchableOpacity>
        </View>
      </View>
     
    </View>
          
       
      
      
    <Image source={{uri: item.postImg}} style={Styles.postImg} />

    <View style={Styles.container}>
      <View style={Styles.iconContainer}>
        <View style={Styles.leftIcons}>
          <TouchableWithoutFeedback onPress={handleLiked}>
            {isLiked ? (
              <ADIcon name="heart" size={25} color={'#ff0800'}  />
            ) : (
              <ADIcon name="hearto" size={25} color={'#545454'}  />
            )}
            </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => console.log('Pressed Comment')}>
          <FontistoIcon name="comment" size={23} color={'#545454'}  />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => console.log('Pressed Direct Message')}>
          <Ionicons name ="paper-plane-outline" size={23} color={'#545454'}  />
        </TouchableOpacity>
        </View>
      </View>
    </View>
    <AppText style={Styles.likes}>{numberOfLikes} likes</AppText>
    <View
      style={{
        marginStart: 15,
        marginEnd: 15,
        flexDirection: 'column',
        marginTop: 10,
      }}>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 13}}>
      {userData ? userData.name : ''}
      </Text>
      <Text style={{color: 'black'}}>{item.post}</Text>
    </View>
    <TouchableOpacity
      style={{marginTop: 5, marginStart: 15}}
      onPress={() => console.log('Pressed Post Comments')}>
      <Text style={{color: colors.textFaded2}}>
        View all  comments
      </Text>
    </TouchableOpacity> 

    <Text
        style={{
          color: colors.textFaded2,
          marginTop: 5,
          marginStart: 15,
          fontSize: 12,
        }}>
       {moment(item.postTime.toDate()).fromNow()}
      </Text>

 
    </Card>
  );
};

export default PostCard;
const Styles = StyleSheet.create({
container: {
  backgroundColor: 'white',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 12,
  marginBottom: 6,
  marginStart: 10,
  marginEnd: 10,
  alignItems: 'center',
},
nameContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
},
personImage: {
  width: 30,
  height: 30,
  borderRadius: 30,
},
personName: {
  color: 'black',
  marginStart: 10,
  fontWeight: 'bold',
},
placeName: {
  color: colors.text,
  marginStart: 10,
  fontSize: 12,
},
iconMore: {
  height: 15,
  width: 15,
},
postImg: {
  height: Dimensions.get('screen').height / 3,
  width: Dimensions.get('screen').width,
  
},
container2: {
  justifyContent: 'space-between',
  flexDirection: 'row',
  //paddingStart: 20,
  marginEnd: 15,
  marginTop: 15,
},
actionIcons: {
  width: 23,
  height: 23,
  marginStart: 15,
},
container3: {
  padding: 15,
},
iconContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 10,
},
leftIcons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 100,
},
likes: {
  fontSize: 14,
  fontWeight: 'bold',
},
});
