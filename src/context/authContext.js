import React, { createContext, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase-config"
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "@firebase/auth"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false)
	const [userUID, setUserUID] = useState(null)
	const [signInError, setSignInError] = useState(null)

	const navigate = useNavigate()

	const signIn = async (email, password) => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password)
			setUserUID(user.user.uid)
			setIsAuth(true)
			navigate("/")
		} catch (error) {
			setIsAuth(false)
			setSignInError(error.message)
		}
	}

	const logout = async () => {
		try {
			await signOut(auth)
			setIsAuth(false)
			setUserUID(null)
			navigate("/signin")
		} catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		onAuthStateChanged(auth, (userData) => {
			if (userData) {
				setUserUID(userData.uid)
				setIsAuth(true)
				// console.log("In OnAuthStateChanged")
			}
		})
	}, [])

	return (
		<AuthContext.Provider
			value={{ signIn, logout, userUID, signInError, isAuth, setSignInError }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	const { signIn, logout, userUID, signInError, setSignInError, isAuth } =
		useContext(AuthContext)
	return { signIn, logout, userUID, signInError, setSignInError, isAuth }
}
