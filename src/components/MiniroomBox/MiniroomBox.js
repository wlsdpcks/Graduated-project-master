import {View ,StyleSheet,Animated,PanResponder,Image } from 'react-native';
import React,{useRef} from 'react'
import useStore from '../../../store/store';
import { Text } from 'react-native-paper';


const MiniroomBox =({test}) => {
  const {isaddress,setIsaddress} = useStore();
  const {placeX,setplaceX} = useStore();
  const {placeY,setplaceY} = useStore();
  console.log(isaddress);
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
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      onPanResponderEnd: (evt , gesture) => {
        setplaceX(gesture.moveX);
        setplaceY(gesture.moveY);
      }
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