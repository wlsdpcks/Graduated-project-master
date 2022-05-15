import { View, Text,TouchableOpacity,StyleSheet,FlatList,Image,Button} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../../utils/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';

const Request = () => {

  const {user, logout} = useContext(AuthContext);
  const [requsetData, setRequsetData] = useState(null);

  const getRequset = async() => {
    const querySanp = await firestore()
    .collection('Request')
    .doc(firebase.auth().currentUser.uid)
    .collection('RequestInfo')
    .get()

    const allrequests = querySanp.docs.map(docSnap=>docSnap.data())
    setRequsetData(allrequests)
  }
  useEffect(() => {
    getRequset();
  }, []);

  const RenderCard = ({item})=>{
    return (
        <View style={{flexDirection:'row',flex:1,width:370}}>
          
          <View style={{width:40,height:40,marginRight:20}}>
          <TouchableOpacity onPress={() => {}} style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: item.userimg}}/>
          </TouchableOpacity>
          </View>
          
          <View style={{flexDirection:'row',flex: 1, justifyContent: "space-between", alignItems: "center"}}>
          <Text style={{marginRight:50}}>{item.name}</Text>
          <Text style={{marginRight:30}}>{item.sname}</Text>
          <Text style={{}}>{item.birthday}</Text>
          <Button title='hi'></Button>
          </View>
        
        </View>
    )
}
    return (
    <View style={styles.container}>
        <Text style={{fontSize:20, marginBottom: 10}}>요청 목록</Text>
        <View style={styles.title}>
          <View style={{width:40}}></View>
          <Text style={{flex:1,textAlign: 'center',}}>이름</Text>
          <Text style={{flex:1,textAlign: 'center',}}>별명</Text>
          <Text style={{flex:1,textAlign: 'center',}}>생일</Text>  
          <View style={{width:40}}></View>
        </View>
        <FlatList 
          data={requsetData}
          renderItem={({item})=> {return <RenderCard item={item} /> }}
        />
    </View>
        
    
  );
};

export default Request;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      alignItems: 'center',
    },
    title:{
      flexDirection: 'row', // 혹은 'column'
      marginBottom:10,
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
    imageContainer: {
      borderRadius: 20,
      height: 40,
      width: 40,
      overflow: 'hidden',
    },
    image: {
      height: 40,
      width: 40
    }
  
  });