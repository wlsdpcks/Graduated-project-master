import {View ,StyleSheet,Animated,PanResponder,Image,Button } from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'

const MiniroomBox =({test,name,x=10,y=10}) => {
  
  const placex=x;
  const placey=y;
  console.log('위치확인'+placex,placey);
  const tool = test;
  const testname = name;
  const {placeX,setplaceX} = useStore();
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool');
  useEffect(() => {
  }, [tool,placeX]);
  const addItem = (x,y,address,name) => {
      const rows = addminiroom.where('name', '==', name);
      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            getx:x,
            gety:y,
            address:address,
            name:name,
          })
        });
      });
      console.log('----------------------');
      console.log(testname);
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
        addItem(gesture.moveX,gesture.moveY,tool,name);
      },
    })
  ).current;
    return(
      <View style={{transform: [{ translateX: 10 }, { translateY: 10 }]}}>
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