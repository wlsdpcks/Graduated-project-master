import React, {useContext,useState,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native'

import { theme } from '../../ChatTheme'
import { AuthContext } from '../../../utils/AuthProvider'
import firestore from '@react-native-firebase/firestore'
       
const Header = ({ title }) => {
	const {user, logout} = useContext(AuthContext);
	const [userData, setUserData] = useState(null);
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
		getUser();
	  }, []);
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>{title}</Text>
				<TouchableOpacity onPress={() => {}} style={styles.imageContainer}>
					<Image style={styles.image} source={{
						uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'orange',
		paddingBottom: 10
	},
	headerContainer: {
		flexDirection: 'row',
		backgroundColor: 'transparent',
		position: 'relative',
		justifyContent: 'space-between',
		marginHorizontal: 15,
		marginVertical: 10
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: '700',
		color: theme.colors.white,
		alignSelf: 'center'
	},
	imageContainer: {
		borderRadius: 20,
		height: 40,
		width: 40,
		overflow: 'hidden',
	},
	image: {
		height: 40,
		width: 40
	}
})

export default Header