import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage"
import { storage } from "../firebase-config"
import { v4 as uuid } from "uuid"

const useUploadImage = () => {
	const upload = async (data) => {
		if (!data) return
		try {
			const imageRef = ref(storage, `images/${data?.name + uuid()}`)
			const res = await uploadBytes(imageRef, data)

			const url = await getDownloadURL(res?.ref)
			return url
		} catch (e) {
			console.log(e)
		}
	}

	return { upload }
}

export const useDeleteImage = () => {
	const deleteImage = async (data) => {
		if (!data) return
		try {
			const imageRef = ref(storage, data)
			const res = await deleteObject(imageRef)
			console.log("delete image response", res)
		} catch (e) {
			console.log(e)
		}
	}

	return { deleteImage }
}

export default useUploadImage
