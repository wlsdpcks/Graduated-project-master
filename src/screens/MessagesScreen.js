import React,{useState,useEffect,useContext} from 'react'
import { View, Text ,Image,FlatList,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../utils/AuthProvider'
import {FAB} from 'react-native-paper'


import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../Chat/ChatTheme';
import SearchInput from '../Chat/Components/common/SearchInput'
  
const MessagesScreen = ({navigation}) => {
     console.log(user)
    const [users,setUsers] = useState(null)
    const {user, logout} = useContext(AuthContext);
    const getUsers = async ()=>{
             const querySanp = await firestore().collection('users').where('uid','!=', user.uid).get()
             const allusers = querySanp.docs.map(docSnap=>docSnap.data())
            //  console.log(allusers)
            setUsers(allusers)
    }

    useEffect(()=>{
        getUsers()
    },[])
    /*
    const showStoryCircle = () => {
      if (hasStory) {
        return {
          borderColor: theme.colors.storyBorder,
          borderWidth: 2
        }
      }
    };
    const showNotification = (type) => {
      if (notification && type === "number") {
        return (
          <View style={styles.notificationCircle}>
            <Text style={styles.notification}>{notification}</Text>
          </View>
        );
      } else if (notification && type === "imageCircle") {
        return {
          borderColor: theme.colors.primary
        }
      }
    };
    */
    
    const RenderCard = ({item})=>{
      return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.conversation}
        onPress={() => navigation.navigate('CHAT', {name:item.name,uid:item.uid,img:item.userImg,
        
      })}>

          <TouchableOpacity 
            onPress={() => setModalVisible(currentValue => !currentValue)}
            style={[styles.imageContainer]}>
            <Image source={{ uri: item.userImg }} style={styles.img} />
          </TouchableOpacity>
          <View style={{
              flex: 1,
              justifyContent: 'center'
            }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text numerOfLine={1} style={styles.username}>{item.name}</Text>
              <Text style={styles.time}>time</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={styles.message}>lastMessage</Text>
              
            </View>
          </View>
        </TouchableOpacity>
        </View>
      )
}
return (
      <View style={{ backgroundColor: theme.colors.white, flex: 1 }}>
        <SearchInput />
        <FlatList 
          data={users}
          renderItem={({item})=> {return <RenderCard item={item} /> }}
          keyExtractor={(item)=>item.uid}
        />
         <FAB
            style={styles.fab}
            icon="face-profile"
            color="black"
            onPress={() => navigation.navigate("account")}
        />
        
    </View>
)
}

export default MessagesScreen
const styles = StyleSheet.create({
img:{width:60,height:60,borderRadius:30,backgroundColor:"orange"},
text:{
   fontSize:18,
   marginLeft:15,
},

mycard:{
   flexDirection:"row",
   margin:3,
   padding:4,
   backgroundColor:"white",
   borderBottomWidth:1,
   borderBottomColor:'grey'
},
fab: {
position: 'absolute',
margin: 16,
right: 0,
bottom: 0,
backgroundColor:"white"
},
container: {

},
conversation: {
  flexDirection: 'row',
  paddingBottom: 25,
  paddingRight: 20,
  paddingLeft: 10
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
image: {
  height: 55,
  width: 55
},
username: {
  fontSize: theme.fontSize.title,
  color: theme.colors.title,
  width: 210
},
message: {
  fontSize: theme.fontSize.message,
  width: 240,
  color: theme.colors.subTitle
},
time: {
  fontSize: theme.fontSize.subTitle,
  color: theme.colors.subTitle,
  fontWeight: '300'
},
notificationCircle: {
  backgroundColor: theme.colors.primary,
  borderRadius: 50,
  height: 20,
  width: 20,
  marginRight: 5,
  alignItems: 'center',
  justifyContent: 'center'
},
notification: {
  color: theme.colors.white,
  fontWeight: 'bold',
  fontSize: 10
},
});