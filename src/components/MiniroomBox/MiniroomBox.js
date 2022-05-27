import {View ,StyleSheet,Animated,PanResponder,Image,Button } from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'

const MiniroomBox =({test,x,y,name}) => {
  var testx, testy;
  const tool = test;
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool');
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

      console.log(name);
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
        firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).onSnapshot(doc =>{    
          console.log(doc.data())
        })
        //console.log('주소는~');
        //console.log(`${tooladdress}`)
        testx=gesture.moveX;
        testy=gesture.moveY;
        console.log(testx,testy);
        addItem(gesture.moveX,gesture.moveY,tool,name);
      },
    })
  ).current;
    return(
        <Animated.View style={{transform: [{ translateX: pan.x }, { translateY: pan.y }]}}{...panResponder.panHandlers}>
            <View style={styles.box}>
                <Image source={{uri:`${test}`}} resizeMode='stretch' style={{borderWidth:1,flex:1}}></Image>
            </View>
      </Animated.View>
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