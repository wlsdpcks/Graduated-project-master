import {View ,StyleSheet,Animated,PanResponder,Image,Button } from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'

const MiniroomBox =({test,name,x,y}) => {
  
  const [rows,setrows] = useState();
  const {placeX,setplaceX,wpqkf,setwpqkf} = useStore();
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool');
  
  const checktItem = async () => {
    try{
    const data = await firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool').where("name", '==', name).get();
    console.log(data);
    setrows(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log(rows[0].getx);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    checktItem();
  }, []);

  var testx;
  var testy;
  const placex = x;
  const placey = y;
  const tool = test;
  const testname = name;
  console.log('내이름은 ',name)
  
  const addItem = (x,y,address,name) => {
      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc);
          doc.ref.update({
            getx:x,
            gety:y,
            address:address,
            name:name,
          })
        });
      });
      console.log('----------------------');
      console.log('이름: ',name);
      console.log('x좌표: ',x);
      console.log('y좌표: ',y);
      console.log('address: ',address);
      console.log('save complete');
  };
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y,}
        ],{ useNativeDriver: false }, //오류 메시지를 없애기용 
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      onPanResponderEnd: (evt , gesture) => {
        // firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).onSnapshot(doc =>{    
        //   console.log(doc.data())
        // })
        testx=gesture.moveX;
        testy=gesture.moveY;
        setplaceX(gesture.moveX);
        addItem(gesture.moveX,gesture.moveY,test,name);
      },
    })
  ).current;
    return(
      <View style={{transform: [{translateX: 1} , {translateY:2}]}}>
        <Animated.View style={{transform: [{ translateX: pan.x }, { translateY: pan.y }]}}{...panResponder.panHandlers} >
            <View style={styles.box}>
                <Image source={{uri:`${test}`}} resizeMode='stretch' style={{borderWidth:1,flex:1}}></Image>
            </View>
      </Animated.View>
      </View>
        )
    }

    const styles =StyleSheet.create({
        box:{
            translateX:1,
            translateY:-300,
            height: 40,
            width: 40,
            borderColor: "blue",
            borderWidth:1,
          },
    });
    export default MiniroomBox