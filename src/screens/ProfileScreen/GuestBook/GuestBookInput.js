import { View, Text,TouchableOpacity,StyleSheet,SafeAreaView,TextInput,Button, Alert} from 'react-native';
import React,{useState,useContext} from 'react';
import {InputFieldGuest, InputWrapperGuest,SubmitBtnGuest,  SubmitBtnTextGuest} from '../../../../styles/AddPost';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../../../utils/AuthProvider';

const GuestBookInput = () => {
  const {user, logout} =useContext(AuthContext);
  const[post,setPost]= useState(null);


  const[uploading,setUploading]= useState(false);
  const[transferred,setTransferred]= useState(0);

  const submitGuestbook = async()=>{

    firestore()
    .collection('guestbook')
    .add({
      userId:user.uid,
      post :post,
      postTime:firestore.Timestamp.fromDate(new Date()),
    })
    .then(()=>{
      console.log('Guestbook Added');
      setPost(null);
    })
    .catch((error)=>{
      console.log('something went wrong adding guestbook',error);
    });

    /*const uploadUri =image;
    let filename =uploadUri.substring(uploadUri.lastIndexOf('/')+1);

    const extension = filename.split('.').pop();
    const name =filename.split('.').slice(0,-1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);

    //set transferred s
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred/taskSnapshot.toltalBytes) *100
      );

    
    });

    try{
      await task;
      setUploading(false);
      Alert.alert(
        'Image uploaded!',
        'image uploaded to the firebase cloud'
      );
    }catch(e){
      console.log(e);
    }
    
    setImage(null);*/
  } 


    return (
  
      <InputWrapperGuest>
        <InputFieldGuest
          placeholder="방명록을 작성해주세요!"
          multiline
          numberOfLine={2}
          value={post}
          onChangeText={(content)=>setPost(content)}
        />
              <SubmitBtnGuest onPress={submitGuestbook}>
                <SubmitBtnTextGuest>작성</SubmitBtnTextGuest>
              </SubmitBtnGuest>
      </InputWrapperGuest>



  );
};

export default GuestBookInput;
const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: '#fff',
      width:'100%',
    },
    InputContainer:{
        margin:25,
    },
    InputMainContainer:{
        width:'100%',
        height:50,
        flexDirection: 'row',

    },
    Inputstyle:{
        width:'80%',
        height:'100%',
        borderBottomWidth :1,
        borderBottomColor: 'orange',
    },
    ButtonStyle:{
        width:'20%',
        height:20,
        marginLeft:10,
        textAlign: 'center',

    },
    

  });
  /*
        <View style={styles.InputContainer}>
      <View style={styles.InputMainContainer}>
      <TextInput style={styles.Inputstyle}
        placeholder="방명록 작성.."
        multiline
          >
      </TextInput>
      <Button style={styles.ButtonStyle}
        title="작성하기"
        color='orange'
        textAlign='center'
      ></Button>
      </View>
      </View>
      */