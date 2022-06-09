import React,{useState,useEffect,useContext} from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet,ScrollView,TouchableOpacity,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../StoreScreen/colors';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../utils/AuthProvider';
import useStore from '../../../store/store';


const DetailsScreen = ({navigation, route}) => {  
const {user, logout} = useContext(AuthContext);
const {isPoint,setPoint,BuyItem,setBuyItem} = useStore();
const [userData, setUserData] = useState(null);

const plant = route.params;

const [Item, setItem] = useState('');
const Checktype = () => {
  if(plant.type=='tool') return setItem('tool');
  if(plant.type=='minime') return setItem('minime');
  if(plant.type=='background') return setItem('background');
  if(plant.type=='minipat') return setItem('minipat');

  }
  const getUser = async() => {
    const currentUser = await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }
useEffect(() => {
  Checktype();
  getUser();
}, []);
//const addTool = firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection('tool');

const CheckBuy = () => {
    Alert.alert(
        '알림',
        '구매하시겠습니까?',[{
            text:'아니요',
            onPress: () => console.log('안사욧')
            ,},
        {text:'네',onPress: () => addItem()}
    ],
    {cancelable:false}
      );
}
const CheckPresent = () => {
  Alert.alert(
      '알림',
      '원하는 목록에 추가 하시겠습니까?',[{
          text:'아니요',
          onPress: () => console.log('안사욧')
          ,},
      {text:'네',onPress: () => addPresentItem()}
  ],
  {cancelable:false}
    );
}
const updatePoint = () => {
  firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      point:userData.point-plant.price,
    })
    setPoint(userData.point-plant.price);
  }
const addItem = async () => {
    try {
      console.log(Item);
        await firestore().collection('Inventory').doc(firebase.auth().currentUser.uid).collection(`${Item}`).add({
        name: plant.name,
        price: plant.price,
        address: plant.address,
      })
      updatePoint();
      console.log(`update 완료`);
      console.log(`이름 : ${plant.name} 가격: ${plant.price} 주소 : ${plant.address} `);
      setBuyItem(plant.name);
      navigation.navigate('StoreHome');
     
    } catch (error) {
      console.log(error.message);
    }
  };
  const addPresentItem = async () => {
    try {
      console.log(Item);
        await firestore().collection('present')
        .doc(firebase.auth().currentUser.uid)
        .collection("presentDetail").add({
       img : plant.address,
       name: plant.name,
       price: plant.price,
      })
      
      navigation.navigate('StoreHome');
     
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
      <SafeAreaView
      style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        
    
    <View style={{flex:1}}>
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Text style={{ fontFamily : "Jalnan"}}>Point {userData ? userData.point : ''}</Text>
      </View>
      <View style={style.imageContainer}>
        
        <Image source={{uri:plant.address}} style={{resizeMode: 'contain', flex: 1,aspectRatio:1}} />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View style={style.line} />
          <Text style={{fontSize: 18,  fontFamily : "Jalnan"}}>Best choice</Text>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22,  fontFamily : "Jalnan"}}>{plant.name}</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              ₩{plant.price}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <View style={{height:80}}>
          <ScrollView>
          <Text style={{fontSize: 20,  fontFamily : "Jalnan"}}>About</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
              fontFamily : "Jalnan"
            }}>
            {plant.about}
          </Text>
          </ScrollView>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>-</Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                1
              </Text>
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>+</Text>
              </View>
            </View>
            <TouchableOpacity onPress={CheckBuy}>
            <View style={style.buyBtn}>
              <Text
                style={{color: COLORS.white, fontSize: 18,  fontFamily : "Jalnan"}}>
                구매
              </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={CheckPresent}>
            <View style={style.buyBtn}>
              <Text
                style={{color: COLORS.white, fontSize: 18,  fontFamily : "Jalnan"}}>
                조르기
              </Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
      
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 90,
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: 'orange',
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default DetailsScreen;