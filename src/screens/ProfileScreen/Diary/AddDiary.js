import { View, Text,TouchableOpacity,StyleSheet,SafeAreaView,Button} from 'react-native';
import React, { useState,useEffect,useContext } from 'react';
import { InputFieldDiary, InputTitle, InputWrapper,Boundary, SubmitBtn, SubmitBtnText, DiaryBtn, DiaryBtnText, DiaryBtnWapper } from '../../../../styles/AddPost';
import DatePicker from '../../../components/DatePicker/DatePicker';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../../../utils/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const AddDiary = () =>{

  const navigation =useNavigation();

  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [title,setTitle]=useState(null);
  const [diary, setDiary] = useState(null);

  

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
  
  
    const submitDiary = async () => {
      const currentuserId = firebase.auth().currentUser.uid
      const imageUrl = await uploadImage();
      console.log('Image Url: ', imageUrl);
      console.log('Diary: ', diary);
  
      firestore()
      .collection('Diary')
      .Document('???')
      .add({
        
        uid: user.uid,
        title:title,
        diary: diary,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),

      })
      .then(() => {
        console.log('Diary Added!');
        Alert.alert(
          '다이어리 작성완료!',
        );

        setTitle(null);
        setDiary(null);
        navigation.navigate('Diary', {currentuserId: currentuserId});
      })
      .catch((error) => {
        console.log('Something went wrong with added diary to firestore.', error);
      });
    }
  
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
  
      const storageRef = storage().ref(`diarys/${filename}`);
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
            <InputWrapper>
            <View style= {styles.Wapper}>
            <DatePicker/>
            <View style={styles.photobtn}>
            <DiaryBtn>
                    <DiaryBtnText>카메라</DiaryBtnText>
                </DiaryBtn>
                <DiaryBtn>
                    <DiaryBtnText>갤러리</DiaryBtnText>
                </DiaryBtn>
            </View>
            </View>

            <InputTitle
                placeholder="제목입력.."
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
            />

                <DiaryBtn>
                    <DiaryBtnText>저장</DiaryBtnText>
                </DiaryBtn>

            </InputWrapper>
        </SafeAreaView>
    );

};

export default AddDiary;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',

    },
    Wapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        margin:10,
    },
    Wapper:{
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      margin:10,
  },
    photobtn:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      height:40,
    },

})
