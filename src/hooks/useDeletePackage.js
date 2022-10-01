import { useState } from "react"
import { db } from "../firebase-config"
import { deleteDoc, doc } from "firebase/firestore"

const useDeletePackage = () => {
	const [delRes, setDelRes] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const deletePackage = async (id) => {
		if (!id) return
		const docRef = doc(db, "packages", id)
		try {
			setIsLoading(true)
			const data = await deleteDoc(docRef)
			setDelRes(data?.data())
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
			setDelRes(null)
			console.log(e)
		}
	}

	return { delRes, isLoading, deletePackage }
}

export default useDeletePackage
