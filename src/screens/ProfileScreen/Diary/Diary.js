
import { View, Text,TouchableOpacity,StyleSheet,SafeAreaView,Image,RefreshControl} from 'react-native';
import React, {useEffect,useCallback,useState } from 'react';
import {Agenda} from 'react-native-calendars';
import { Card } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';



const timeToString =(time)=> {
   const date =new Date(time);
  return date.toISOString().split('T')[0];
};




const Diary = () => {
  const [posts, setPosts] = useState(null);
  const navigation = useNavigation();
  const [DiaryData, setDiaryData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const getDiary = async() => {
    const querySanp = await firestore()
    .collection('Diary')
    .doc(firebase.auth().currentUser.uid)
    .collection('DiaryDetails')
    .get()

    const allDiary = querySanp.docs.map(docSnap=>docSnap.data())
    setDiaryData(allDiary)
    
  }

  const onAddDiarypress = () => {
    navigation.navigate('AddDiary');
  };

  const DeleteComment =  async (item) => {
    
 
    try {
      const rows = await addCollection.where('comment', '==', item.comment);

      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete()

      
      
        });
      }).then(() => {
      setDeleted(true);

      Alert.alert(
        '댓글 삭제 완료!',
        );

      console.log('Delete Complete!', rows);
    })
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getDiary();
    getUser();
    setDeleted(false);
  }, [deleted,refreshing]);

const RenderCard = ({item})=>{
    return (
    <TouchableOpacity Style={styles.itemConstainer}>
    <Card>
    <Card.Content>
    <View style={styles.diaryTitle}>
    <Text>{item.post}</Text>
    </View>
    <View style={styles.picContainer}>
<Image  source={{uri: item.postImg}} style={styles.pic}/> 
    </View>
    <Text>{item.body}</Text>
    </Card.Content>
    </Card>
    </TouchableOpacity>
  );
};

    return (
      <SafeAreaView style={{flex:1}}>
      <Agenda 
      markingType={'custom'}
      items={DiaryData}
      renderItem={({item})=> {return <RenderCard item={item} />
      }}
      refreshControl={
          <RefreshControl
             refreshing={refreshing}
             onRefresh={onRefresh}
           />
         }
      minDate={'2022-04-01'}
      maxDate={'2022-08-28'}
      pastScrollRange={2}
      futureScrollRange={2}

      theme={{
      todayTextColor: '#FFA500',
      selectedDayBackgroundColor: '#FFA500',
      }}
      />
      
        <ActionButton buttonColor="rgb(255, 165, 0)" title="다이어리작성" onPress={()=>onAddDiarypress()}>
            <Icon name="createDiary" style={styles.actionButtonIcon} />

        </ActionButton>

      </SafeAreaView>
  );
};

export default Diary;

const styles = StyleSheet.create({
  itemConstainer:{
    marginRight:10,
    marginTop:17
    },
    diaryTitle:{
      marginBottom:10,
      fontSize:18,
    },
    picContainer:{
      width:200,
      height:200,
      marginLeft:50,
    },
    pic:{
      width:'100%',
      height:'100%',

    },
    line:{
      marginTop:10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,

    },
    iconContainer:{
      flexDirection: 'row',

    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },


  });