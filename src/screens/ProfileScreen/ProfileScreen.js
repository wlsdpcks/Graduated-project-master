import React, {useState, useEffect, useContext} from 'react';


import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  
  
} from 'react-native';
import { AuthContext } from '../../utils/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import MarqueeText from 'react-native-marquee';
import firebase  from '@react-native-firebase/app';
import songs from '../../data/songdata';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {songT} from '../../components/MusicPlayer/MusicPlayer'
const ProfileScreen = ({navigation,route}) => {

  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [friendData, setFriendData] = useState([]);
  const [songIndex, setSongIndex]=useState(0);
  const [LoginuserData, setLoginUserData] = useState(null);

  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc( route.params ? route.params.uid : user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }
  const getLoginUser = async() => {
    const currentUser = await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setLoginUserData(documentSnapshot.data());
      }
    })
  }

  const fetchFriends = async () => {
    try {
      const list = [];

      await firestore()
        .collection('friends')
        .doc(firebase.auth().currentUser.uid)
        .collection('friendsinfo')
        .get()
        .then((querySnapshot) => {
           console.log('Total Friends: ', querySnapshot.size);
          
          querySnapshot.forEach((doc) => {
            const {
              name,
              sname,
              birthday,
            } = doc.data();
            list.push({
              name,
              sname,
              birthday,
            });
          });
        });

        setFriendData(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Friends: ', friendData );
    } catch (e) {
      console.log(e);
    }
  };  
  
  useEffect(() => {
    getUser();
    fetchFriends();
    getLoginUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  const FriendRequest = () => {
    Alert.alert(
      '회원님에게 친구요청을 보냅니다',
      '확실합니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed!'),
          style: '취소',
        },
        {
          text: '확인',
          onPress: () => Requset(),
        },
      ],
      {cancelable: false},
    );
  };

  const Requset = () => {
    

    firestore()
      .collection('Request')
      .doc(route.params ? route.params.uid : user.uid)
      .collection('RequestInfo')
      .doc(firebase.auth().currentUser.uid)
      .set({
  
        uid: firebase.auth().currentUser.uid,
        name: LoginuserData.name,
        sname: '별명',
        birthday: LoginuserData.birthday,
        userimg: LoginuserData.userImg,
      })
      .then(() => {
        console.log('requset Added!');
        Alert.alert(
          '회원님에게 친구를 요청하였습니다',
        );
  
        
      })
      .catch((error) => {
        console.log('error.', error);
      });
    
  };

  const onprofilePressed = () => {
    navigation.navigate('EditProfile');
};
const onMusicPressed = () => {
  
    navigation.navigate('Music');
};
const onEditFriendPressed = () => {
  navigation.navigate('Friend');
};

const onRequsetPressed = () => {
  navigation.navigate('Requset');
};
  const onweblogpress = () => {
    navigation.navigate('Weblog');
};

const onDiarypress = () => {
  navigation.navigate('Diary');
};
const onalbumpress = () => {
  navigation.navigate('Album', {name : userData.name ,uid : route.params ? route.params.uid : user.uid});
};
 
const onMiniroompress = () => {
  navigation.navigate('Miniroom');
}; 


const handleDelete = () => {};
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      
      <View style={styles.title}>
      {route.params ? (
        <>
        
        <TouchableOpacity style={{marginLeft: 15, justifyContent : 'center'}} onPress={() => navigation.goBack()}>
         
          
         <Ionicons name="arrow-back" size={25} color="#fff" />

        </TouchableOpacity>
          <View style={{ justifyContent : 'center', marginLeft: 75}}>
                <Text style={styles.titleText}>{userData ? userData.name : ''}님의 미니홈피</Text>
          </View>
        
      
      </>
      ) : (
        <>
        
        <View style={{ justifyContent : 'center', marginLeft: 105}}>
                <Text style={styles.titleText}>{userData ? userData.name : ''}님의 미니홈피</Text>
          </View>
        </>
          )}
        </View>

      <TouchableOpacity style={styles.music} onPress={() => onMusicPressed()}>
      <Text style={{ fontSize: 15, textAlign: 'center'}}>{songs[songIndex].title} - {songs[songIndex].artist}</Text>
            </TouchableOpacity>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titlecontainer}>
          <View style={styles.leftcontainer}>
            <TouchableOpacity onPress={() => onprofilePressed()}>
              <Image style={styles.userImg} source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}/>
            </TouchableOpacity>
          
          
          </View>
          
          <View style={styles.rightcontainer}>
            <View style={styles.action}>
            <Text style={{color : 'black'}}>이름                         <Text style={{textAlign:'center',  }}>{userData ? userData.name : ''}</Text></Text>
            </View>
            
            <View style={styles.action}>
            <Text style={{color : 'black'}}>나이                          <Text style={{textAlign:'center',  }}>{userData ? userData.age : ''}</Text></Text>
            </View>
            <View style={styles.action}>
            <Text style={{color : 'black'}}>생일                  <Text style={{textAlign:'center',  }}>{userData ? userData.birthday : ''}</Text></Text>
            </View>
            <View style={styles.action}>
            <Text style={{color : 'black'}}>오늘의 기분             <Text style={{textAlign:'center',  }}>행복</Text></Text>
            
            </View>
            <View style={styles.action}>
            <Text style={{color : 'black'}}>Point                       {userData ? userData.point : ''}</Text>
            </View>
            
            </View>
          </View> 
        
       
        
        
        <View style={styles.userInfoWrapper}>
        {route.params ? (
        <>
        <TouchableOpacity onPress={() => FriendRequest()}>
          <View style={styles.userInfoItem}>
            
            <Text style={styles.userInfoTitle2}>친구요청</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SNSProfile', {uid: userData.uid})}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle2}>SNS 방문</Text>
          </View>
          </TouchableOpacity>
        </>
        ) : (
            <>
                 <TouchableOpacity onPress={() => onEditFriendPressed()}>
          <View style={styles.userInfoItem}>
          <Text style={styles.userInfoTitle2}>친구 <Text style={styles.userInfoTitle}>{friendData.length}</Text></Text>
            
            
            
          </View>

          
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onRequsetPressed()}>
          <View style={styles.userInfoItem}>
          <Text style={styles.userInfoTitle2}>요청 목록</Text>
            
            
          </View>

          
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('SNSProfile', {uid: userData.uid})}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle2}>SNS 방문</Text>
          </View>
          </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.userBtnWrapper}>
              <TouchableOpacity style={styles.userBtn} onPress={() => onDiarypress()}>
                <Text style={styles.userBtnTxt}>다이어리</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userBtn} onPress={() => onalbumpress()}>
                <Text style={styles.userBtnTxt}> 사진첩</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.userBtn} onPress={() => onweblogpress()}>
                <Text style={styles.userBtnTxt}> 방명록</Text>
              </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.miniroom} onPress={() => onMiniroompress()}>
        <View>
        <Text style={{fontSize:20,textAlign:'center',marginBottom:10, fontFamily: "DungGeunMo", color: "#129fcd" }}>{userData ? userData.name : ''}님의 Mini Room</Text>
          <Image source={{uri: 'https://t1.daumcdn.net/cafeattach/MT4/648d42cb50cafc47f7d02fdfc380f91449afca84'}}
       style={{width: 400, height: 230,marginTop:0}}>

          </Image>
        </View>
        
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  titlecontainer: {
    flex: 1,
    flexDirection: 'row', // 혹은 'column'
  },
  leftcontainer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  userinfotext: {
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: "center",
  },

  rightcontainer: {
    flex:0.8,
    
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:10,
   
  },
  music:{
    marginTop:10,
    height:25,
    marginLeft:25,
    marginRight:25,
  },

  title:{ 
    height:50,
    backgroundColor: 'orange',
    flexDirection: 'row', 
    
   
  },
  titleText:{
    fontFamily: "DungGeunMo",
    justifyContent: 'space-around',
    fontSize: 20,
    color:'white',
   
  },
  userImg: {
    height: 125,
    width: 125,
    borderRadius: 75,
    backgroundColor: '#fff',
    
  },
  action: {
    
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 1,
    
    paddingBottom: 5,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
      },
  userBtn: {
    width:120,
    backgroundColor:'orange',
    borderColor: 'orange',
    borderBottomColor:'#fff',
    borderWidth:1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  userBtnTxt: {
    fontFamily: "DungGeunMo",
    color: '#fff',
    textAlign:'center',  
    fontSize:15,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    color: 'black',

    fontSize: 18,
    
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoTitle2: {
    color: '#129fcd',
    fontFamily: "DungGeunMo",
    fontSize: 18,
    marginBottom: 5,
  },
  userInfoSubTitle: {
    
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
  },
  miniroom: {
    width:'100%',
    height:300,
    justifyContent: 'space-around',
    alignItems:'center',
    paddingVertical: 8,
    paddingHorizontal: 8,

  },

});