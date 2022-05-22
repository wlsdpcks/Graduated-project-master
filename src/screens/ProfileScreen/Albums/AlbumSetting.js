import { View, Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import React, {useState, useEffect, useContext,useCallback} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import {FAB} from 'react-native-paper'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';
import ActionButton from 'react-native-action-button';


const Album = ({navigation,route}) => {
        const {uid} = route.params

        const name = route.params.name
        const [FolderData, setFolderdData] = useState(null);
       
        const getFolder = async() => {
          const querySanp = await firestore()
          .collection('Albums')
          .doc(firebase.auth().currentUser.uid)
          .collection('groups').orderBy('postTime')
          .get()
      
          const allfolders = querySanp.docs.map(docSnap=>docSnap.data())
          setFolderdData(allfolders)
            
          
        }
      
        useEffect(() => {
          getFolder();
          
        }, []);

        const RenderCard = ({item})=>{
            return (
              <View style={styles.folderContainer}>
                <Icon name="folder"  size={23} color="orange"/>
              <Text style={{fontSize : 18,fontFamily: 'DungGeunMo'}}> {item.name}</Text>
              
                
                
                
                </View>
            )
        }

    renderInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>폴더 관리</Text>
            <Text style={styles.panelSubtitle}>카테고리로 폴더를 관리하세요</Text>
          </View>
          <TouchableOpacity
            style={styles.panelButton}
            >
            <Text style={styles.panelButtonTitle}>그룹 만들기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton} onPress={() => navigation.navigate('AddFolder', {uid : uid, name : name} )}>
            <Text style={styles.panelButtonTitle}>폴더 만들기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => this.bs.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>취소</Text>
          </TouchableOpacity>
        </View>
      );
      renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      );
    
      bs = React.createRef();
      fall = new Animated.Value(1);
    
    return (
      <View style={styles.container}>
          <BottomSheet
        ref={this.bs}
        snapPoints={[330, -5]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}> 
        <TouchableOpacity onPress={() => navigation.navigate('Photos',{uid : uid,name :route.params.name } )}>
            
        <View style={styles.folderContainer}>
      
        
        
        
        </View>
        </TouchableOpacity>
       <FlatList 
          data={FolderData}
          renderItem={({item})=> {return <RenderCard item={item} />
        
        }}
        />
        
        </Animated.View>
        
        <ActionButton buttonColor="#FF6347" onPress={() => this.bs.current.snapTo(0)}/>
        
        
        </View>
        
        
    
  );
};

export default Album;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
      
     
    },
    folderscontainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding : 20,
        
       
      },

    folderContainer :{
      flexDirection: 'row', // 혹은 'column'
     
      marginLeft : 20,
      marginTop : 20,
    },
    titleConainer:{
      flexDirection: 'column', // 혹은 'column'
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:"white"
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
     
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
  });