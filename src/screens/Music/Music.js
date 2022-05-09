import { View, Text,TouchableOpacity,StyleSheet,} from 'react-native';
import React from 'react';

const Music = () => {
    const onmusicinfoPressed = () => {
        console.warn('음악 정보');
        //navigation.navigate('AppNavigator');
    };
    return (
    <View style={styles.container}>
        <Text style={{fontSize:30}}>플레이 리스트</Text>
        <TouchableOpacity style={styles.userBtn} onPress={() => onmusicinfoPressed()}>
              <Text>현재 재생되고 있는 곡 정보</Text>
        </TouchableOpacity>
        <Text>재생/정지 버튼 볼륨조절</Text>
        <View style={styles.miniroom}>
            <Text>BGM 편집 기능 추가/수정/삭제</Text>
        </View>
    </View>
  );
};

export default Music;
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
    userImg: {
      height: 300,
      width: 300,
      borderRadius: 150,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'red',
      justifyContent: 'space-around',
      alignItems:'center',
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
    userBtn: {
      borderColor: '#2e64e5',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
    },
  });
