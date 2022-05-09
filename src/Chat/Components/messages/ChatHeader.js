import React, {useContext,useState,useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../../../utils/AuthProvider";
import { theme } from "../../ChatTheme";
import firestore from '@react-native-firebase/firestore'
import MessagesScreen from "../../../screens/MessagesScreen";

const ChatHeader = ({ username, bio, picture, onlineStatus, onPress }) => {
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
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Message')}>
				<Icon name="angle-left" size={30} color={theme.colors.white} />
			</TouchableOpacity>
			<View style={styles.profileOptions}>
				<TouchableOpacity style={styles.profile}>
				<Image style={styles.image} source={{ uri: picture }} />
					
					<View style={styles.usernameAndOnlineStatus}>
						<Text style={styles.username}>{username}</Text>
						<Text style={styles.onlineStatus}>{onlineStatus}</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.options}>
					<TouchableOpacity
						onPress={() => navigation.navigate("OnCallScreen", {
							username: username,
							picture: picture
						})}
						style={{ paddingHorizontal: 5 }}
					>
						<Icon
							name="phone"
							size={30}
							color={theme.colors.white}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={{ paddingHorizontal: 20 }}>
						<Icon
							name="ellipsis-v"
							size={30}
							color={theme.colors.white}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: '#FF6347',
		
		paddingBottom: 10,
	},
	backButton: {
		alignSelf: "center",
		paddingHorizontal: 10,
	},
	profileOptions: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	profile: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#fff",
		flex: 4,
	},
	image: {
		height: 65,
		width: 65,
		borderRadius: 32.5,
	},
	usernameAndOnlineStatus: {
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	username: {
		
		color: theme.colors.white,
		fontSize: 18,
		fontWeight: "bold",
	},
	onlineStatus: {
		color: theme.colors.white,
		fontSize: 16,
	},
	options: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});

export default ChatHeader;
