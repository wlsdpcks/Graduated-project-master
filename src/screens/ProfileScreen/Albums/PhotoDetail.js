import { View, Text ,Image,FlatList,StyleSheet,TouchableOpacity,TextInput,Dimensions} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore'
import firebase  from '@react-native-firebase/app';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

var { height, width } = Dimensions.get('window');

const PhotoDeatil = ({route,navigation}) => {

  const [posts,setPosts] = useState([])
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  const getPosts = async ()=>{
    const querySanp = await firestore().collection('Albums')
    .doc(firebase.auth().currentUser.uid)
    .collection('groups')
    .doc(route.params.foldername)
    .collection('photos')
    .orderBy('postTime', 'desc')
    .get()
    const allposts = querySanp.docs.map(docSnap=>docSnap.data())
   //  console.log(allusers)
   console.log('Posts: ', posts );
   setPosts(allposts)
   
}

useEffect(()=>{
    getPosts()
},[])

const RenderCard = ({item})=>{
    return (
        <View style={styles.container}>
        <View style={styles.title2}>
        <Text style={{fontSize : 20, fontFamily: 'DungGeunMo', padding : 5}}> {item.post}</Text>
        <TouchableOpacity style={{marginLeft: 15, justifyContent : 'center'}} onPress={() => navigation.goBack()}>
         
        <View style={{marginRight :15}}>
         <Ionicons name="ellipsis-horizontal" size={25} color="black" />
        </View>
        </TouchableOpacity>
        </View>
            
        <Image source={{uri: item.img}} style={styles.postImg} />
        <Text style={{fontSize : 20, fontFamily: 'DungGeunMo', padding : 5}}> {item.body}</Text>
        <View style={styles.row}>
        <Text style={{fontSize : 20, fontFamily: 'DungGeunMo', padding : 5, marginBottom : 10}}> {moment(item.postTime.toDate()).fromNow()}</Text>
        
        </View>
        <View style={styles.row2}>
        <View style={styles.title3}>
        <TouchableOpacity style={{marginLeft: 15, justifyContent : 'center'}} onPress={() => navigation.goBack()}>
         
         <View style={{padding : 10, marginTop : 10, marginBottom : 15}}>
          <Ionicons name="heart" size={25} color="gray" />
         </View>
         </TouchableOpacity>
         <View style={{marginTop : 23, marginBottom : 15}}>
        <Text style={{fontSize : 17, fontFamily: 'DungGeunMo'}}>추천</Text>
        </View>
        <TouchableOpacity style={{marginLeft: 15, justifyContent : 'center'}} onPress={() => navigation.goBack()}>
         
         <View style={{padding : 10  ,marginTop : 10, marginBottom : 15}}>
          <Ionicons name="chatbubble-ellipses" size={25} color="gray" />
         </View>
         </TouchableOpacity>
         <View style={{marginTop : 23, marginBottom : 15}}>
        <Text style={{fontSize : 17, fontFamily: 'DungGeunMo'}}>댓글</Text>
        </View>
        
        </View>
        
        </View> 

        
          </View>
         
      )
  }

    return (
      <View style={styles.container}>
        <View style={styles.title}>

          <TouchableOpacity style={{marginLeft: 15, justifyContent : 'center'}} onPress={() => navigation.goBack()}>
         
        
         <Ionicons name="arrow-back" size={25} color="black" />
        
        </TouchableOpacity>
        <View style={{ justifyContent : 'center', marginLeft: 120}}>
        <View style={styles.folderContainer}>
      <Icon name="folder"  size={23} color="orange"/>
      <Text style={{fontSize : 18,fontFamily: 'DungGeunMo'}}> {route.params.foldername}</Text>
        
        
        
        </View>
            </View>
        </View>
    
        <FlatList 
          data={posts}
          renderItem={({item})=> {return <RenderCard item={item} />
        
        }}
        />    
        
       
        
        </View>
        
        
    
  );
};

export default PhotoDeatil;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
     
    },


    padding: {
        padding : 20,
        backgroundColor: '#fff',
        
       
      },
    folderContainer :{
      flexDirection: 'row', // 혹은 'column'
     
      
    },
    titleConainer:{
      flexDirection: 'column', // 혹은 'column'
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
    title:{ 
        height:50,
        backgroundColor: 'white',
        flexDirection: 'row', 
        
       
      },
      title2:{ 
        
        justifyContent: 'space-between',
        flexDirection: 'row', 
        
       
      },

      title3:{ 
        
        
        flexDirection: 'row', 
        
       
      },
      postImg: {
        height: Dimensions.get('screen').height / 3,
        width: Dimensions.get('screen').width,
        
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        
        borderColor: '#D3D3D3',
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 10,
        marginBottom : 20,
        
        borderColor: '#D3D3D3',
    },
  });