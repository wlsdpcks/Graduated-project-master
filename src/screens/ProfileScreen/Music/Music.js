import React from 'react';
import { View, Text,TouchableOpacity,StyleSheet,} from 'react-native';
import MusicPlayer from '../../../components/MusicPlayer/MusicPlayer';

const Music = () => {

    return (
    <View style={styles.container}>
    <MusicPlayer/>
    </View>
  );
};

export default Music;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
   
  });