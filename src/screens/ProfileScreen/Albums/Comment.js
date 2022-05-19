import { View, Text,TouchableOpacity,StyleSheet,FlatList,Image,TextInput} from 'react-native';
import React, {useState, useEffect, useContext,useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import {FAB} from 'react-native-paper'
import { theme } from '../../../Chat/ChatTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { AuthContext } from '../../../utils/AuthProvider';
const Comment = ({navigation,route}) => {
  const [CommentData, setCommentData] = useState([]);
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [comment, setComment] = useState(null);

  const getComment = async() => {
    const querySanp = await firestore()
    .collection('Albums')
    .doc(firebase.auth().currentUser.uid)
    .collection('groups')
    .doc(route.params.foldername)
    .collection('photos')
    .doc(route.params.postid)
    .collection('comment')
    .get()

    const allcomments = querySanp.docs.map(docSnap=>docSnap.data())
    setCommentData(allcomments)
      
    
  }
  const SubmitComment = async () => {
    
    

    const querySanp = await firestore()
    .collection('Albums')
    .doc(firebase.auth().currentUser.uid)
    .collection('groups')
    .doc(route.params.foldername)
    .collection('photos')
    .doc(route.params.postid)
    .collection('comment')
    .add({
  
      username : userData.name,
      userimg : userData.userImg,
      comment : comment,
      commentTime: firestore.Timestamp.fromDate(new Date()),
    })
    .then(() => {
      console.log('Groups Added!');
      
     
        
   

      
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }
  useEffect(() => {
    getComment();
    getUser();
  }, []);
  



  const RenderCard = ({item})=>{
    return (
      <View style={styles.row}>
        <View style={styles.conversation}> 
        
      <TouchableOpacity 
            onPress={() => setModalVisible()}
            style={[styles.imageContainer]}>
            <Image source={{ uri: item.userimg }} style={styles.img} />
          </TouchableOpacity>
          <View style={{
              flex: 1,
              justifyContent: 'center'
            }}>
            <View style={{
              flexDirection: 'row',
              
            }}>
              <Text numerOfLine={1} style={styles.username}>{item.username}</Text>
             
            </View>
            <View style={{
              flexDirection: 'row',
            }}>
              <Text style={styles.message}>{item.comment}</Text>
              
            </View>
            <View style={{
              flexDirection: 'row',
            }}>
              <Text style={styles.message}>{moment(item.commentTime.toDate()).fromNow()}</Text>
              
            </View>
            </View>
            
            
            </View>
            </View>
        
        
        
       
    )
}
    return (
      <View style={styles.container}>
         <View style={styles.row}>
         <Ionicons name="chatbubble-ellipses" size={25} color="gray" /> 
         <Text style={{marginBottom : 20, marginLeft : 10, fontSize : 18}}><Text style={{color : 'black', fontWeight : 'bold',}}>{CommentData.length}</Text>개의 댓글이 있어요</Text>
       
         </View>
         
       

        
        

        
        <FlatList 
          data={CommentData}
          renderItem={({item})=> {return <RenderCard item={item} />
        
        }}
        />
      
        
        
      <TextInput
            style={styles.textInput}
            value={comment}
            onChangeText={(text) => {setComment(text)}}
            placeholder="폴더 이름을 입력해주세요."
          />
          <TouchableOpacity onPress={() => SubmitComment()}>
          <Text style ={{color : 'black',marginLeft : 350, fontFamily : 'DungGeunMo'}}>추가</Text>
          </TouchableOpacity>
      
        
  
        </View>
        
        
    
  );
};

export default Comment;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding : 20
      
     
    },

    folderContainer :{
      flexDirection: 'row', // 혹은 'column'
      marginBottom: 15,
    },
    titleConainer:{
      flexDirection: 'column', // 혹은 'column'
    },
    conversation: {
      flexDirection: 'row',
      paddingBottom: 25,
      paddingRight: 20,
      paddingTop : 20,
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      
      borderColor: '#D3D3D3',
  },
      
    title:{
      flexDirection: 'row', // 혹은 'column'
      flex: 1,
    },
    miniroom: {
      width:'100%', 
      height:150,
      justifyContent: 'space-around',
      alignItems:'center',
      marginTop: 30,
      paddingVertical: 8,
      paddingHorizontal: 12,

    

    },
    img:{width:60,height:60,borderRadius:30,backgroundColor:"orange"},
    username: {
      fontSize: theme.fontSize.title,
      color: theme.colors.title,
      width: 210
    },
    message: {
      fontSize: theme.fontSize.message,
      width: 240,
      color: theme.colors.subTitle,
      marginTop : 5,
    },
    imageContainer: {
      marginRight: 15,
      borderRadius: 25,
      height: 50,
      width: 50,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center' 
    },
  });