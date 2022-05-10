import React,{useEffect,useRef,useState} from 'react';
import { View, Text,TouchableOpacity,StyleSheet,SafeAreaView,Dimensions,Image,FlatList,Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import songs from '../../data/songdata';

const {width,height}=Dimensions.get('window');

const MusicPlayer = () => {
    const scrollX =useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex]=useState(0);
    const songSlider = useRef(null);
    const songT=songs[songIndex].title;
    useEffect(() =>{
        scrollX.addListener(({value})=>{
            //console.log('Scroll X',scrollX);
            //console.log('Device Width',width);
            const index= Math.round(value/width);
            setSongIndex(index);
            //console.log('Index:',index);
        });
        return ()=>{
            scrollX.removeAllListeners();
        }
    }, []);

    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset:(songIndex+1)*width,
        });
    }

    const skipToPrevious =()=>{
        songSlider.current.scrollToOffset({
            offset:(songIndex-1)*width,
        });
    }

    const renderSongs =({index,item})=>{
        return(
            <Animated.View style={{width:width, justifyContent:'center',alignItems:'center'}}>
            <View style={styles.artworkWrapper}>
            <Image source={item.image} style={styles.artworkImg}/>
        </View>    
            </Animated.View>

        );
    };
    return (
        <SafeAreaView style={styles.container}>
    <View style={styles.mainContainer}>
    <View style={{width:width, height:350}}>
    <Animated.FlatList
    ref={songSlider}
    data={songs}
    renderItem={renderSongs}
    keyExtractor={(item)=> item.id}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={10}
    onScroll= {Animated.event(
        [{nativeEvent:{
            contentOffset:{x:scrollX}
        }}],
        {useNativeDriver:true}
    )}
    />
    </View>
    <View style={styles.songContainer}>
    <View style={styles.songMainContainer}>
        <Text style={styles.songTitle}>{songs[songIndex].title}</Text>
        <Text style={styles.songArtist}>{songs[songIndex].artist}</Text>
    </View>
    <TouchableOpacity
    style={{marginLeft:30}}
         onPress={()=>{}}>
        <Ionicons name="heart-outline" size={30} color="#777777"/> 
    </TouchableOpacity>
    </View>
    <View style={styles.controlContainer}>
        <Slider style={styles.progressContainer}
        value={10}
        minimumValue={100}
        thumbTintColor="#ffa500"
        minimumTrackTintColor="#ffa500"
        maximumTrackTintColor='#000'
        onSlidingComplete={()=>{}}
        />
        <View style={styles.progressLabelContainer}>
        <Text style={styles.ProgressLabelText}>0:00</Text>
        <Text style={styles.ProgressLabelText}>3:54</Text>
        </View>
        <View style={styles.musicControl}>
        <TouchableOpacity onPress={skipToPrevious}>
    <Ionicons name="play-skip-back-outline" size={40} color="#ffa500" style={{marginTop:10}}/> 
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{}}>
    <Ionicons name="ios-pause-circle" size={60} color="#ffa500"/> 
    </TouchableOpacity>
    <TouchableOpacity onPress={skipToNext}>
    <Ionicons name="play-skip-forward-outline" size={40} color="#ffa500" style={{marginTop:10}} /> 
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{}}>
    <Ionicons name="repeat" size={30} color="#ffa500" style={{marginTop:15 ,marginLeft:10}}/> 
    </TouchableOpacity>
        </View>
    </View>
    </View>
        </SafeAreaView>

  );
};

export default MusicPlayer;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',

    },
    mainContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',

    },
    artworkWrapper:{
        width:250,
        height:270,
        marginBottom:25,
        elevation:10,
    },
    artworkImg:{
        width:'100%',
        height:'100%',

    },
    songContainer:{
        width:320,
        height:30,
        flexDirection: 'row'
    },
    songMainContainer:{
        width:260,
        height:30,
        alignContent:'flex-start'
    },
    songTitle:{
        fontSize:18,
        fontWeight:'600',
        color:"#000",
    },
    songArtist:{
        fontSize:16,
        fontWeight:'400',
        color:'#000',
    },
    controlContainer:{
        flexDirection:'column',
        justifyContent:'space-between',
    },
    progressContainer:{
        width:350,
        height:40,
        marginTop:25,
        flexDirection:'row'
    },
    progressLabelContainer:{
        width:340,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    ProgressLabelText:{
        color:'#000',
    },
    musicControl:{
        flexDirection:'row',
        width:'60%',
        justifyContent:'space-between',
        marginTop:15,
        marginLeft:80,
    },



   
  });
/*
<View style={styles.bottomContainer}>
    <View style={styles.bottomControl}>
    <TouchableOpacity onPress={()=>{}}>
    <Ionicons name="heart-outline" size={30} color="#777777"/> 
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{}}>
    <Ionicons name="repeat" size={30} color="#777777"/> 
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{}}>
    <Ionicons name="share-outline" size={30} color="#777777"/> 
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{}}>
    <Ionicons name="ellipsis-horizontal" size={30} color="#777777"/> 
    </TouchableOpacity>
    </View>
    </View>
*/