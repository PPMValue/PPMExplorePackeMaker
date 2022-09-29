import { HiPlus, HiTrash, HiXCircle } from "react-icons/hi"
import { v4 as uuid } from "uuid"

// Components
import Card from "../Card/Card"
import Forms from "../Forms/Forms"
import Buttons from "../Buttons/Buttons"

// Context
import { usePackageContext } from "../../context/context"
import useUploadImage, { useDeleteImage } from "../../hooks/useUploadImage"

const CostInclusions = () => {
	const { tourPackage, setTourPackage } = usePackageContext()
	const { upload } = useUploadImage()
	const { deleteImage } = useDeleteImage()

	const onChangeHandler = (e, id) => {
		const { name, value } = e
		setTourPackage((prev) => {
			const newItem = prev.inclusions.items.map((item) => {
				if (item.id === id) {
					return {
						...item,
						[name]: value,
					}
				}
				return item
			})
			return { ...prev, inclusions: { ...prev.inclusions, items: newItem } }
		})
	}

	const addImageHandler = (e) => {
		const { name, value } = e
		setTourPackage((prev) => {
			const newItem = { ...prev.inclusions, [name]: value }
			return { ...prev, inclusions: newItem }
		})
	}

	const addItemHandler = () => {
		setTourPackage((prev) => ({
			...prev,
			inclusions: {
				...prev.inclusions,
				items: [
					...prev.inclusions.items,
					{
						id: uuid(),
						inclusion: "",
					},
				],
			},
		}))
	}

	const removeItemHandler = (id) => {
		setTourPackage((prev) => {
			const newItems = prev.inclusions.items.filter((item) => item.id !== id)
			return {
				...prev,
				inclusions: { ...prev.inclusions, items: [...newItems] },
			}
		})
	}

	const removeImageHandler = (url) => {
		if (!url) return
		deleteImage(url)

		setTourPackage((prev) => ({
			...prev,
			inclusions: {
				...prev.inclusions,
				bg_image: "",
			},
		}))
	}

	return (
		<section>
			<Card heading="Cost inclusions">
				{tourPackage?.inclusions?.bg_image ? (
					<div className="w-20 h-20 overflow-hidden rounded-md mb-2 relative">
						<HiXCircle
							onClick={() =>
								removeImageHandler(tourPackage?.inclusions?.bg_image)
							}
							className="absolute top-1 right-1 w-6 h-6 text-red-200 hover:text-red-700 duration-200 cursor-pointer"
						/>
						<img
							className="w-ful h-full object-cover object-center"
							src={tourPackage?.inclusions?.bg_image}
							alt={tourPackage?.inclusions?.bg_image}
						/>
					</div>
				) : (
					<Forms.File
						upload={upload}
						value={tourPackage?.inclusions?.bg_image}
						onChange={(e) => addImageHandler(e)}
						name="bg_image"
						label="Background image"
					/>
				)}

				{tourPackage?.inclusions?.items?.map((item) => (
					<div key={item?.id} className="flex gap-6 max-w-md items-start">
						<Buttons.DangerIcon
							onClick={() => removeItemHandler(item?.id)}
							icon={HiTrash}
						></Buttons.DangerIcon>
						<Forms.Input
							value={item.inclusion}
							onChange={(e) => onChangeHandler(e.target, item.id)}
							name="inclusion"
							placeholder="Enter cost inclusion"
							label="Inclusion"
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

export default CostInclusions
