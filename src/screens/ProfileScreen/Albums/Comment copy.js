import { View, Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import React, {useState, useEffect, useContext,useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import {FAB} from 'react-native-paper'

const Comment = ({navigation,route}) => {
  const [CommentData, setCommentData] = useState([]);

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

  useEffect(() => {
    getComment();
    
  }, []);
  



  const RenderCard = ({item})=>{
    return (
     
        
      <Text style={{fontSize : 18,fontFamily: 'DungGeunMo'}}> {item.username}</Text>
     
      
        
        
        
       
    )
}
    return (
      <View style={styles.container}>
         <View style={styles.row}>
           <View style={{padding: 20}}>
           <Text><Text style={{color : 'black', fontWeight : 'bold'}}>{CommentData.length}</Text>개의 댓글이 있어요</Text>
           </View>
         </View>
         
        <View style={styles.folderContainer}>

      <Text>{route.params.name}</Text>
        
        
        </View>
        
        <FlatList 
          data={CommentData}
          renderItem={({item})=> {return <RenderCard item={item} />
        
        }}
        />
      
        
        
        
      
        
  
        </View>
        
        
    
  );
};

export default Comment;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
      
     
    },

    folderContainer :{
      flexDirection: 'row', // 혹은 'column'
      marginBottom: 15,
    },
    titleConainer:{
      flexDirection: 'column', // 혹은 'column'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
  });