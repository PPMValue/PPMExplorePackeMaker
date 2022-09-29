import { useState, useEffect } from "react"
import { db } from "../firebase-config"
import { getDoc, doc } from "firebase/firestore"

const useGetPackageDetails = (id) => {
	const [packageDetails, setPackage] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const docRef = doc(db, "packages", id)

	useEffect(() => {
		const getPackages = async () => {
			try {
				setIsLoading(true)
				const data = await getDoc(docRef)
				// setPackages(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })))
				setPackage(data?.data())
				setIsLoading(false)
			} catch (e) {
				setIsLoading(false)
				setPackage(null)
				console.log(e)
			}
		}
		getPackages()
	}, [])
	return { packageDetails, isLoading }
}

export default useGetPackageDetails
