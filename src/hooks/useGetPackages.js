import { useState, useEffect } from "react"
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"

const useGetPackages = () => {
	const [packages, setPackages] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const packagesCollectionRef = collection(db, "packages")

	const getPackages = async () => {
		try {
			setIsLoading(true)
			const data = await getDocs(packagesCollectionRef)
			setPackages(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })))
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
			setPackages(null)
			console.log(e)
		}
	}

	useEffect(() => {
		getPackages()
	}, [])
	return { packages, isLoading, getPackages }
}

export default useGetPackages
