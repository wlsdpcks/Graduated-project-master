import {View ,StyleSheet,Animated,PanResponder,Image,Button } from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import { Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'

const MiniroomBox =() => {
  const {tooladdress,settooladdress} = useStore();
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid);
  const addItem = (x,y,address) => {
    addminiroom.collection('tool').add({
        getx:x,
        gety:y,
        image:address
      })
      console.log('x좌표: ',x);
      console.log('y좌표: ',y);
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
        console.log('주소는~');
        console.log(`${tooladdress}`)
        addItem(gesture.moveX,gesture.moveY,tooladdress);
      },
    })
  ).current;
    return(
        <Animated.View style={{transform: [{ translateX: pan.x }, { translateY: pan.y }]}}{...panResponder.panHandlers}>
            <View style={styles.box}>
                <Image source={{uri:`${tooladdress}`}} resizeMode='stretch' style={{borderWidth:1,flex:1}}></Image>
            </View>
      </Animated.View>
        )
    }

    const styles =StyleSheet.create({
        box:{
            translateX:194,
            translateY:-150,
            height: 40,
            width: 40,
            borderColor: "blue",
            borderWidth:1,
            borderRadius: 5
          },
    });
    export default MiniroomBox