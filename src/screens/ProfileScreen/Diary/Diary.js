
import { View, Text,TouchableOpacity,StyleSheet,SafeAreaView,Image} from 'react-native';
import React, { useState,useEffect } from 'react';
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


  const onAddDiarypress = () => {
    navigation.navigate('AddDiary');
  };

  const [items,setItems]=useState({
    '2022-05-05':[
      {name: ' ', cookies:true},
    ],


  }); 


const renderCard = ({item})=>{
    return (
    <TouchableOpacity Style={styles.itemConstainer}>
    <Card>
    <Card.Content>
    <View style={styles.diaryTitle}>
    <Text>내미니룸~/item.Title/</Text>
    </View>
    <View style={styles.picContainer}>
<Image source={{uri: 'https://t1.daumcdn.net/cafeattach/MT4/648d42cb50cafc47f7d02fdfc380f91449afca84'}}
       style={styles.pic}/> 
    </View>
       <View style={styles.line}/>
    <Text>/item.content/</Text>
    <View style={styles.iconContainer}>
    <Ionicons style={{marginRight:270}}
     name="heart-outline" size={20} color="#777777"/> 
    <Ionicons name="share-outline" size={20} color="#777777"/>
    </View>
    <Text style={{marginTop:10}}>/item/</Text>
    </Card.Content>
    </Card>
    </TouchableOpacity>
  );
};

    return (
      <SafeAreaView style={{flex:1}}>
      <Agenda 
      markingType={'custom'}
      items={items}
      renderItem={({item})=> {return <renderCard item={item} />
      }}
      minDate={'2022-03-01'}
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