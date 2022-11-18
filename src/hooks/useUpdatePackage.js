import { useState } from "react"
import { db } from "../firebase-config"
import { updateDoc, doc } from "firebase/firestore"

const useUpdatePackage = () => {
	const [updateRes, setUpdateRes] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const updatePackage = async (id, packageData) => {
		if (!id) return
		const docRef = doc(db, "packages", id)
		try {
			setIsLoading(true)
			const data = await updateDoc(docRef, packageData)
			setUpdateRes(data?.data())
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
			setUpdateRes(null)
			console.log("sdsd", e)
		}
	}

	return { updateRes, isLoading, updatePackage }
}

export default useUpdatePackage
