import { View,  ActivityIndicator, Text,TouchableOpacity,StyleSheet,SafeAreaView,Button} from 'react-native';
import React, { useState,useEffect,useContext,useCallback } from 'react';
import { InputFieldDiary, InputTitle, InputWrapper,Boundary, SubmitBtn, AddImageD,
  SubmitBtnText, DiaryBtn, DiaryBtnText, DiaryBtnWapper, AddImage,StatusWrapper, } from '../../../../styles/AddPost';
import DatePicker from '../../../components/DatePicker/DatePicker';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../../../utils/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'; 
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase  from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import useStore from '../../../../store/store'
import { ScrollView } from 'react-native-gesture-handler';
import {date2} from '../Diary/Diary';


const AddDiary = () =>{

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const {setPhotoName,SetBody,SetPost} = useStore();

  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState([null]);
  const [body, setBody] = useState(null);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const updatePost = async () => {
    const currentPhotoId = Math.floor(100000 + Math.random() * 9000).toString();
    const currentuserId = firebase.auth().currentUser.uid
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    firestore()
    .collection('Diary')
    .doc(firebase.auth().currentUser.uid)
    .collection('DiaryDetails')
    .doc(date2)  
    .update({
      postid : currentPhotoId,
      post: post,
      body: body,
      img: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      commentcount : 0,

    })
    .then(()=>{
      navigation.goBack();
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  useEffect(() => {
    setDeleted(false);
  }, [deleted,refreshing]);

  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`DiaryPhotos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

    return(
        <SafeAreaView style= {styles.container}>
        <ScrollView>
            <InputWrapper>
            <View style= {styles.DateWapper}>
            <DatePicker/>
            </View>

            <InputTitle
                placeholder="제목입력.."
                value={post}
                onChangeText={(content) => setPost(content)}
            />
            <Boundary/>
            <View style= {styles.Wapper}>
                <DiaryBtn>
                    <DiaryBtnText>굵게</DiaryBtnText>
                </DiaryBtn>
                <DiaryBtn>
                    <DiaryBtnText>밑줄</DiaryBtnText>
                </DiaryBtn>
                <DiaryBtn>
                    <DiaryBtnText>기울기</DiaryBtnText>
                </DiaryBtn>
                <DiaryBtn>
                    <DiaryBtnText>글자크기</DiaryBtnText>
                </DiaryBtn>
            </View>
            <InputFieldDiary
            placeholder="내용입력.."
            multiline
            numberOfLines={10}
            value={body}
            onChangeText={(content) => setBody(content)}
            />
             <View  style= {styles.image}>
            {image != null ? <AddImageD source={{uri: image}} /> : null}
            </View>
{uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <DiaryBtn onPress={updatePost}>
            <DiaryBtnText>Post </DiaryBtnText>
            
          </DiaryBtn>
        )}

            </InputWrapper>
          </ScrollView>

            <ActionButton buttonColor="#ffa500">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="사진 촬영"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="갤러리에서 선택"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
        </SafeAreaView>

        
    );

};
/*
            <View  style= {styles.image}>
            {image != null ? <AddImageD source={{uri: image}} /> : null}
            </View>*/

export default AddDiary;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',

    },
    DateWapper:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginright:10,
    },
    Wapper:{
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      margin:10,
  },
  image:{
    width: '100%',
    height: 150,
    alignSelf: 'flex-start',
  },
    photobtn:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      height:40,
    },

})
