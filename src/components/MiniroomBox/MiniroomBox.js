import {View ,StyleSheet,Animated,PanResponder,Image,Button} from 'react-native';
import React,{useRef, useState,useEffect} from 'react'
import useStore from '../../../store/store';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import{ useAnimatedGestureHandler,withSpring } from 'react-native-reanimated';
const MiniroomBox =({test,name,x,y}) => {
  
  const tool = test;
  const testname = name;
  let dlatlx= x;
  let dlatly= y;
  const addminiroom = firestore().collection('miniroom').doc(firebase.auth().currentUser.uid).collection('room').doc(firebase.auth().currentUser.uid).collection('tool');
  const {placeX,setplaceX,Itemhold,setItemhold,countItem} = useStore();
  
  const checktItem = () => {
    try{
    console.log('마운트!');
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    checktItem();
    return () => {
      console.log('언마운트!');
      console.log('x좌표 : ',dlatlx);
      console.log('y좌표 : ',dlatly);
      addItem(dlatlx,dlatly,tool,testname);
    }
  }, []);
  
  const addItem = (x,y,address,name) => {
    const rows = addminiroom.where('name', '==', name);  
    rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //x=Math.floor(x/20)*20;
          //y=Math.floor(y/20)*20;
          //if(x>=360)x=370;
          //if(y>=320)y=320;
          doc.ref.update({
            getx:x,
            gety:y,
            address:address,
            name:name,
          })
        });
      });
      console.log('----------------------');
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
        dlatlx =gesture.moveX;
        dlatly =gesture.moveY;
        setplaceX(gesture.moveX);
        //setHoldx(dlatlx);
        //setHoldy(dlatly);
        console.log('아이템 : ',name);
        console.log('x좌표 : ',dlatlx);
        console.log('y좌표 : ',dlatly);
      },
    })
  ).current;
    return(
      <View style={{position:'absolute',transform: [{translateX: x} , {translateY:y}]}}>
        <Animated.View style={{width:10,height:10,backgroundColor:'red',position:'absolute',transform: [{ translateX: pan.x }, { translateY: pan.y }]}}{...panResponder.panHandlers}>
            <View style={styles.box}>
                <Image source={{uri:`${test}`}} resizeMode='stretch' style={{flex:1}}></Image>
            </View>
      </Animated.View>
      </View>
        )
    }

    const styles =StyleSheet.create({
        box:{
            height: 80,
            width: 80,
            position:'absolute'
          },
    });
    export default MiniroomBox