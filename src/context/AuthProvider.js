import { createContext, useEffect, useState } from "react";
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase-config";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(true);
	const signIn = (email, pwd) => {
		return signInWithEmailAndPassword(auth, email, pwd);
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setUser(currentUser);
			console.log(user);
			if (user) {
				const userToken = await currentUser.getIdToken();
				setToken(userToken);
			}
			console.log(user);
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, [user]);
	return (
		<AuthContext.Provider value={{ user, token, signIn, logOut }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
