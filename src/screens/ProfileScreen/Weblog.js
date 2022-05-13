import { View, Text,TouchableOpacity,StyleSheet,TextInput,SafeAreaView} from 'react-native';
import React,{useState} from 'react';

const Weblog = () => {
  const [contents,setContents] = useState('ㅎㅇㅎㅇ');


    return (
      <SafeAreaView style={styles.container}>
        
        <View style={styles.guestbook}>
          <Text style={styles.post}> 방명록 :{contents}</Text>
        <View style={styles.input}></View>
          <TextInput 
            style={StyleSheet.inputText}
            placeholder='guest book'
            onChangeText={(val)=>setContents(val)}/>
        </View>

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
    input: {
      borderWidth:1,
      width:300,
      borderBottomColor:'gray',

    },
    titleText:{
      flex: 1,
      fontSize:20,
      color:'#fff',
    },
    title:{
      height:50,
      backgroundColor: 'orange',
      justifyContent: "center",
      flexDirection: 'row',
      alignItems: "center",
     
    },
    guestbook:{
      width:'100%',
      padding:20,
    },
    post : {
      height:500,
      
    }

  });