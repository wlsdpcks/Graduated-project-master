import { View, Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../utils/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';

const Friend = () => {

  const {user, logout} = useContext(AuthContext);
  const [friendData, setFriendData] = useState(null);

  const getFriend = async() => {
    const querySanp = await firestore()
    .collection('friends')
    .doc(firebase.auth().currentUser.uid)
    .collection('friendsinfo')
    .get()

    const allfriends = querySanp.docs.map(docSnap=>docSnap.data())
    setFriendData(allfriends)
      
    
  }
  useEffect(() => {
    getFriend();
  }, []);

  const RenderCard = ({item})=>{
    return (
      
      <View style={styles.title}>

      <Text style={{justifyContent:'space-between',}}>{item.name}</Text>
      <Text >{item.sname}</Text>
      <Text >{item.birthday}</Text>

    </View>

      
     
    )
}
    return (
    <View style={styles.container}>
        <Text style={{fontSize:20, paddingBottom: 10}}>친구 목록</Text>
        <View style={styles.title}>
          <Text style={{flex:1,textAlign: 'center',}}>이름</Text>
          <Text style={{flex:1,textAlign: 'center',}}>별명</Text>
          <Text style={{flex:1,textAlign: 'center',}}>생일</Text>  
        </View>

        <FlatList 
          data={friendData}
          renderItem={({item})=> {return <RenderCard item={item} /> }}
        />
        
        
    </View>
  );
};

export default Friend;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', // 혹은 'column'
      backgroundColor: '#fff',
      padding: 20,
      alignItems: 'center',
    },
    title:{
      flexDirection: 'row', // 혹은 'column'
      
    },
    title2:{
      flexDirection: 'row', // 혹은 'column'
    },
    miniroom: {
      width:'100%', 
      height:150,
      justifyContent: 'space-around',
      alignItems:'center',
      marginTop: 30,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderColor: 'green',
    },
  });
