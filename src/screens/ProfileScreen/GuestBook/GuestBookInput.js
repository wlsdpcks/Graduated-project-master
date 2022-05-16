import { View, Text,TouchableOpacity,StyleSheet,SafeAreaView,TextInput,Button} from 'react-native';
import React,{useState} from 'react';
import {Container} from '../../../../styles';

const GuestBookInput = () => {


    return (
      <SafeAreaView style={styles.container}>
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
      
      

      </SafeAreaView>


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