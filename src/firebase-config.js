import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
	// apiKey: "AIzaSyCB9OMTNMgmK6pV-BJqW_izn6UULnbhCPo",
	// authDomain: "ppmexplorepackage-maker.firebaseapp.com",
	// projectId: "ppmexplorepackage-maker",
	// storageBucket: "ppmexplorepackage-maker.appspot.com",
	// messagingSenderId: "374619828396",
	// appId: "1:374619828396:web:732bc57974d76bf3a8ef09",
	// measurementId: "G-LFHBY4LCV1",

	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
