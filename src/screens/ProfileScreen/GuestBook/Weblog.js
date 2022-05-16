import { View, Text,TouchableOpacity,StyleSheet,TextInput,SafeAreaView} from 'react-native';
import React,{useState} from 'react';
import GuestBookInput from './GuestBookInput';


const Weblog = () => {
  const [contents,setContents] = useState('ㅎㅇㅎㅇ');


    return (
      <SafeAreaView style={styles.container}>
        <GuestBookInput/>
      

      </SafeAreaView>


  );
};

export default Weblog;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', // 혹은 'column'
      backgroundColor: '#fff',


      width:'100%',

      alignItems: 'center',
    },
   

  });