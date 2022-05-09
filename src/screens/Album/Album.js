import { View, Text,TouchableOpacity,StyleSheet,} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Album = () => {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.titleConainer}>
      <Text style={{fontSize:30}}>사진첩</Text>
      </View>
        
        
        <View style={styles.miniroom}>
            <Text>BGM 편집 기능 추가/수정/삭제</Text>
        </View>

      </SafeAreaView>
    
  );
};

export default Album;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', // 혹은 'column'
      backgroundColor: '#fff',
      padding: 20,
      borderWidth: 1,
      borderColor: 'blue',
      alignItems: 'center',
    },
    titleConainer:{
      backgroundcolor:'orange',
    },
    title:{
      flexDirection: 'row', // 혹은 'column'
      flex: 1,
    },
    miniroom: {
      width:'100%', 
      height:150,
      justifyContent: 'space-around',
      alignItems:'center',
      marginTop: 30,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: 'green',
    },
  });