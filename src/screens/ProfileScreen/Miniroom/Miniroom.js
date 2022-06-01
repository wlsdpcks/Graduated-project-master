import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Button,Dimensions,Animated,PanResponder, ImageBackground} from 'react-native';
import React,{useState,useEffect,useRef} from 'react'
import { DraxView,DraxProvider,DraxList } from 'react-native-drax';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import ToolInven from './ToolInven';
import MinimiInven from './MinimiInven';
import MusicInven from './MusicInven';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useNavigation} from '@react-navigation/native';
import MiniroomBox from '../../../components/MiniroomBox/MiniroomBox';
import useStore from '../../../../store/store';
import firestore from '@react-native-firebase/firestore'; 
import firebase  from '@react-native-firebase/app';

const initial = 'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Background%2Fbackground1.png?alt=media&token=f59b87fe-3a69-46b9-aed6-6455dd80ba45';
const Tab = createMaterialTopTabNavigator();
//const Tab = createBottomTabNavigator();
const gestureRootViewStyle = { flex: 1};
const Miniroom = () => {  
  const usersBackgroundCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('background').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersMinimeCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('minime').doc(firebase.auth().currentUser.uid+ 'mid');
  const usersToolCollection = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool'); 
  const {tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime} = useStore();
  const [tool, setTool] = useState();
  const [Back, setBack] = useState(null);
  const [Minime, setMinime] = useState(null);
  const getBackgroundData = async () => {
    try {
      const data = await usersBackgroundCollection.get();
      setBack(data._data.address);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getMinime = async () => {
    try {
      const data = await usersMinimeCollection.get();
      setMinime(data._data.address);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTool = async () => {
    try {
      const datatool = await usersToolCollection.get();
      setTool(datatool._docs.map(doc => ({ ...doc.data(), id: doc.id, })));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getBackgroundData();
    getMinime();
    getTool();
  }, [tooladdress,Backaddress,BuyItem,placeX,countItem,isMinime]);
  return (
    <View style={{flex:1}}>      
    <View style={{flex:1,width:'100%',height:'100%'}}>
          < ImageBackground style={styles.background} source={{uri:`${Back ? Back : initial}`}}></ ImageBackground>
              </View>
          < Image style={styles.minime} source={{uri:`${Minime ? Minime : initial}`}}></ Image>
            <View style={styles.item}>
            {
        tool?.map((row, idx) => {
         {
            return  <MiniroomBox test={row.address} name={row.name} x={row.getx} y={row.gety}></MiniroomBox>} 
      })
      }
            </View>
          
        <View style={styles.miniroom}>
        <Tab.Navigator>
      <Tab.Screen name="가구" component={ToolInven} />
      <Tab.Screen name="미니미" component={MinimiInven} />
      <Tab.Screen name="배경" component={MusicInven} />
    </Tab.Navigator>
        </View>
    </View>
  ); 
};

export default Miniroom;
const styles = StyleSheet.create({
    miniroom: {
      height:250,
    },
    background: {
      flex: 1,
      resizeMode:'stretch',
      position: 'absolute',
      height: '100%',
      weight: '100%',
      opacity: 0.8,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    item: {
      position: 'absolute',

    },
    minime: {
      resizeMode:'stretch',
      position: 'absolute',
      transform: [{translateX: 150} , {translateY:200}],
      width:100,
      height:100,
    }
  });