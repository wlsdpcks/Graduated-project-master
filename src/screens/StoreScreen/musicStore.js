import { View, Text,ScrollView,Image} from 'react-native'
import React from 'react'
import ProductItem from '../../components/Shop/ProductItem_background'
import { useState,useEffect} from 'react'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const musicStore = () => {
  const usersCollection = firestore().collection('shops').doc('shopitems').collection('background');   
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
      {
        tool?.map((row, idx) => {
          {
            return  <ProductItem src={row.address} name={row.name} price={row.price} />;} 
      })
      }
    </ScrollView>
  )
}

export default musicStore
