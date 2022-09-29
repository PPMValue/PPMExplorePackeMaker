import { HiPlus, HiTrash, HiXCircle } from "react-icons/hi"
import { v4 as uuid } from "uuid"

// Components
import Card from "../Card/Card"
import Forms from "../Forms/Forms"
import Buttons from "../Buttons/Buttons"

// Context
import { usePackageContext } from "../../context/context"
import useUploadImage, { useDeleteImage } from "../../hooks/useUploadImage"

const Notes = () => {
	const { tourPackage, setTourPackage } = usePackageContext()

	const { upload } = useUploadImage()
	const { deleteImage } = useDeleteImage()

	const onChangeHandler = (e, id) => {
		const { name, value } = e
		setTourPackage((prev) => {
			const newItem = prev.note.items.map((item) => {
				if (item.id === id) {
					return {
						...item,
						[name]: value,
					}
				}
				return item
			})
			return { ...prev, note: { ...prev.note, items: newItem } }
		})
	}

	const addImageHandler = (e) => {
		const { name, value } = e
		setTourPackage((prev) => {
			const newItem = { ...prev.note, [name]: value }
			return { ...prev, note: newItem }
		})
	}

	const addItemHandler = () => {
		setTourPackage((prev) => ({
			...prev,
			note: {
				...prev.note,
				items: [
					...prev.note.items,
					{
						id: uuid(),
						note: "",
					},
				],
			},
		}))
	}

	const removeItemHandler = (id) => {
		setTourPackage((prev) => {
			const newItems = prev.note.items.filter((item) => item.id !== id)
			return {
				...prev,
				note: { ...prev.note, items: [...newItems] },
			}
		})
	}

	const removeImageHandler = (url) => {
		if (!url) return
		deleteImage(url)

		setTourPackage((prev) => ({
			...prev,
			note: {
				...prev.note,
				bg_image: "",
			},
		}))
	}
	return (
		<section>
			<Card heading="Note">
				{tourPackage?.note?.bg_image ? (
					<div className="w-20 h-20 overflow-hidden rounded-md mb-2 relative">
						<HiXCircle
							onClick={() => removeImageHandler(tourPackage?.note?.bg_image)}
							className="absolute top-1 right-1 w-6 h-6 text-red-200 hover:text-red-700 duration-200 cursor-pointer"
						/>
						<img
							className="w-ful h-full object-cover object-center"
							src={tourPackage?.note?.bg_image}
							alt={tourPackage?.note?.bg_image}
						/>
					</div>
				) : (
					<Forms.File
						upload={upload}
						value={tourPackage?.note?.bg_image}
						onChange={(e) => addImageHandler(e)}
						name="bg_image"
						label="Background image"
					/>
				)}

				{tourPackage?.note?.items?.map((item) => (
					<div key={item?.id} className="flex gap-6 max-w-md items-start">
						<Buttons.DangerIcon
							onClick={() => removeItemHandler(item?.id)}
							icon={HiTrash}
						></Buttons.DangerIcon>
						<Forms.Input
							value={item.note}
							onChange={(e) => onChangeHandler(e.target, item.id)}
							name="note"
							placeholder="Enter note"
							label="Note"
						/>
					</div>
				))}

				<Buttons.Secondary type="button" onClick={addItemHandler} icon={HiPlus}>
					Add more
				</Buttons.Secondary>
			</Card>
		</section>
	)
}

export default Notes
