import { View, Text ,Image,FlatList,StyleSheet,TouchableOpacity,TextInput,Dimensions} from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import SearchBar from "react-native-dynamic-search-bar";
import firestore from '@react-native-firebase/firestore'
var { height, width } = Dimensions.get('window');

const SearchScreen = (props) => {
  const [posts,setPosts] = useState(null)
  const [serachposts, searchsetPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const getPosts = async ()=>{
    const querySanp = await firestore().collection('posts').orderBy('postTime', 'desc').get()
    const allposts = querySanp.docs.map(docSnap=>docSnap.data())
   //  console.log(allusers)
   setPosts(allposts)
}

const handleSearchTextChange =  async (text) => {
  setSearchText(text);
  try {
    const list = [];

    await firestore()
      .collection('posts')
      .where('tag', '==' , text)
      .orderBy('postTime', 'desc')
      .get()
      .then((querySnapshot) => {
        // console.log('Total Posts: ', querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const {
            uid,
            post,
            postImg,
            postTime,
            tag,
            likes,
            comments,
          } = doc.data();
          list.push({
            id: doc.id,
            uid,
            userName: 'Test Name',
            userImg:
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            postTime: postTime,
            tag,
            post,
            postImg,
            liked: false,
            likes,
            comments,
          });
        });
      });

    searchsetPosts(list);

    if (loading) {
      setLoading(false);
    }

    console.log('Posts: ', posts);
  } catch (e) {
    console.log(e);
  }
};

  
useEffect(()=>{
    getPosts()
},[])

  const RenderCard = ({item})=>{
    return (
      <TouchableOpacity 
        onPress={() => props.navigation.navigate('SNS', { postId: item.postId, fromUserProfile: true })}
      >
      <View  style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }]}>
      <Image 
      style={{
          flex: 1,
          alignSelf: 'stretch',
          width: undefined,
          height: undefined,
          backgroundColor: '#c2c2c2'
      }}
      source={{uri: item.postImg}}
      />
    
      </View>
      </TouchableOpacity>
    )
}

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
    <View style={styles.serach}>
      <SearchBar
      value = {searchText}
      placeholder="Search here"
      onPress={() => alert("onPress")}
      onChangeText={(text) => handleSearchTextChange(text)}
    />

       
    </View>
    <FlatList 
          data={posts}
          horizontal={false}
          numColumns={3}
          renderItem={({item})=> {return <RenderCard item={item} />
        }}
         
        />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  serach: {
    marginTop: 10,
    marginBottom: 10,
  },
});
