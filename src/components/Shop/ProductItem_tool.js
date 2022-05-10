import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Alert
} from 'react-native'
import Card from '../UI/Card'
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const ProductItem = ({src,name,price,classification}) => { 
    const [addname,setaddName] = useState(name);
    const [addprice,setaddPrice] = useState(price);
    const [addaddress,setaddAddress] = useState(src);
    const [addclassification,setaddclassification] = useState(classification)
    
    const addTool = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('tool');
    const addItem = async () => {
        try {
            await addTool.add({
            name: addname,
            price: addprice,
            address: addaddress,
            
          });
          console.log(`이름 : ${addname} 가격: ${addprice} 주소 : ${addaddress} `);
        } catch (error) {
          console.log(error.message);
        }
      };

    let TouchableCmp = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
        // 화면 전환시 ripple 효과를 줌
    }
    return (
        <Card style={ styles.container }>
            <View>
            <TouchableOpacity onPress={addItem}>
            <View style={{alignItems: 'center',}}>
                <View style={styles.product}>
                <Image
                    style={ styles.image }
                    source={{uri:src}}
                    />
                </View>
            <View style={ styles.details }>
                <Text>이름 : {name}</Text>
                <Text>가격 : {price}</Text>
            </View>
            
            </View>
            </TouchableOpacity>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    product:{
        width:150,
        height:150,
        borderWidth:1,
        borderRadius:100,
        overflow: 'hidden',
        margin:10
    },
    container: {
        width: 165,
        height: 250,
        margin: 20,
        borderWidth:1
    },
    image: {
        resizeMode:'stretch',
        aspectRatio: 1.0,
    },
    details: {
        alignItems: 'center',
    },
})

export default ProductItem