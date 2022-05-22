import { View, Text,ScrollView,Image,FlatList} from 'react-native'
import React from 'react'
import ProductItem from '../../components/Shop/ProductItem_tool'
import { useState,useEffect} from 'react'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const toolStore = () => {
  const usersCollection = firestore().collection('shops').doc('shopitems').collection('tool');  
  const [tool, setTool] = useState();
  
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
    <ScrollView>
      <FlatList data={tool} renderItem={({item}) =><ProductItem src={item.address} name ={item.name} price={item.price}></ProductItem>}numColumns={2}/>
    </ScrollView>
  )
}

export default toolStore
