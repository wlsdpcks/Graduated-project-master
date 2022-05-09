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
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { now } from 'moment';

const ProductItem = ({src,name,price,classification}) => { 
    const [addname,setaddName] = useState(name);
    const [addprice,setaddPrice] = useState(price);
    const [addaddress,setaddAddress] = useState(src);
    const [addclassification,setaddclassification] = useState(classification)
    
    const addTool = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('background');
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
        <Card style={ styles.product }>
            <View style={ styles.touchable }>
            <TouchableCmp onPress={addItem}>
            <View>
            <View style={ styles.imageContainer }>
                <Image
                    style={ styles.image }
                    source={{uri:src}}
                    resizeMode="contain"
                    />
            </View>
            <View style={ styles.details }>
                <Text style={ styles.title }
                
                >{addname}
                
                </Text>
                <Text style={ styles.price }>{price}</Text>
            </View>
            <View style={ styles.actions }>
                
                </View>
            </View>
            </TouchableCmp>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 1.0,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 12,
        overflow: 'hidden',
        maxWidth: '80%',
        // marginVertical: 4,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 10,
        paddingTop: 5,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '20%',
        padding: 22,
        // margin: 7
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default ProductItem