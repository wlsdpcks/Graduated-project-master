import { View, Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,Button,Dimensions,ScrollView} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';
import React,{useState,useEffect} from 'react'
import { DraxView,DraxProvider,DraxList } from 'react-native-drax';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import useStore from '../../../store/store';
import MiniroomBox from '../../components/MiniroomBox/MiniroomBox';
import { renderNode } from 'react-native-elements/dist/helpers';

const gestureRootViewStyle = { flex: 1 };
const ToolInven = () => {

  const {isaddress,setIsaddress} = useStore();
  const usersCollection = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('tool'); 
  const [tool, setTool] = useState();

  const MakeBox = (item) => {
    setIsaddress(item);
    console.log(isaddress);
  }
  const getShopData = async () => {
    try {
      const data = await usersCollection.get();
      setTool(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getShopData();
  }, []);
  return (
    <GestureHandlerRootView
      style={gestureRootViewStyle}>
    <ScrollView>
    <View style={styles.container}>
      {
        tool?.map((row, idx) => {
         {
            return  <TouchableOpacity onPress={()=>{MakeBox(row.address)}} style={{borderWidth:1}}>
            <Image source ={{uri:row.address}} style={{width:70,height:70,}} resizeMode="contain" ></Image>
            </TouchableOpacity>;} 
      })
      }
    </View>


    <DraxProvider>
    <View style={styles.container}>
        <DraxView
            style={styles.draggable}
            onDragStart={() => {
                console.log('start drag');
            }}
            payload="world"
        >
        </DraxView>
        <DraxView
            style={styles.receiver}
            onReceiveDragEnter={({ dragged: { payload } }) => {
                console.log(`hello ${payload}`);
                
            }}
            onReceiveDragExit={({ dragged: { payload } }) => {
                console.log(`goodbye ${payload}`);
            }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
                console.log(`received ${payload}`);
            }}
        />
    </View>
</DraxProvider>
    
    </ScrollView>
    </GestureHandlerRootView>
  )
}
export default ToolInven;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 혹은 'column'
    padding: 20,
    alignItems: 'center',
    flexWrap:"wrap",
},
draggable: {
  width: 70,
  height: 70,
  borderWidth:1,
},
receiver: {
  width: 70,
  height: 70,
  backgroundColor: 'green',
},
draggableBox: {
  height: (Dimensions.get('window').width / 4) - 12,
    borderRadius: 80,
    width: (Dimensions.get('window').width / 4) - 12,
    justifyContent: 'center',
    flexWrap:'wrap',
    borderWidth:1,
    flex:1,

},
});
