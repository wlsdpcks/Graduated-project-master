import React from'react';
import {View,Text,StyleSheet,Image}from'react-native';
 export default function Loading(){
 return(
<View style={styles.container}>
<Image
        source={require('../../assets/logo2.png')}
        style={styles.logo}
      />  
<Text style={{fontSize : 50, color : 'white', fontFamily : 'DungGeunMo'}}>Now</Text>
      <Text style={{fontSize : 50, color : 'white', fontFamily : 'DungGeunMo'}}>Loading ...</Text>
</View>)
}

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor : 'orange',
alignItems: 'center',
justifyContent: 'center',

},
logo: {
    height: 250,
    width: 350,
    resizeMode: 'cover',
    marginBottom: 20,
    
  },
});