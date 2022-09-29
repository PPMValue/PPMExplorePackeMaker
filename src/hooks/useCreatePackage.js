import { useState } from "react"
import { db } from "../firebase-config"
import { collection, addDoc } from "firebase/firestore"

const useCreatePackage = () => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const packagesCollectionRef = collection(db, "packages")

	const createPackage = async (packageInfo) => {
		try {
			setIsLoading(true)
			const res = await addDoc(packagesCollectionRef, packageInfo)
			setData(res?.id)
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
			setData(null)
			console.log(e)
		}
	}

	return { data, isLoading, createPackage }
}

export default useCreatePackage
