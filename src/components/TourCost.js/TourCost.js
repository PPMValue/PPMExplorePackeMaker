// Components
import Card from "../Card/Card"
import Forms from "../Forms/Forms"

// Context
import { usePackageContext } from "../../context/context"

// Firebase image upload
import useUploadImage, { useDeleteImage } from "../../hooks/useUploadImage"
import { HiXCircle } from "react-icons/hi"

const TourCost = () => {
	const { tourPackage, setTourPackage } = usePackageContext()
	const { upload } = useUploadImage()
	const { deleteImage } = useDeleteImage()
	const { tourCost } = tourPackage
	const onChangeHandler = (e) => {
		const { name, value } = e

		setTourPackage((prev) => {
			const newItem = { ...prev.tourCost, [name]: value }
			return { ...prev, tourCost: newItem }
		})
	}

	const removeImageHandler = (url) => {
		if (!url) return
		deleteImage(url)

		setTourPackage((prev) => {
			const newItem = { ...prev.tourCost, bg_image: "" }
			return { ...prev, tourCost: newItem }
		})
	}

	return (
		<Card heading="Tour cost">
			<div className="grid grid-cols-2 gap-6">
				<Forms.Input
					value={tourCost.tour_title}
					onChange={(e) => onChangeHandler(e.target)}
					name="tour_title"
					placeholder="Enter title"
					label="Title"
				/>
				<Forms.Input
					value={tourCost.tour_subtitle}
					onChange={(e) => onChangeHandler(e.target)}
					name="tour_subtitle"
					placeholder="Enter tour subtitle"
					label="Subtitle"
				/>
			</div>

			<div className="flex space-x-4">
				{tourCost.bg_image ? (
					<div className="w-20 h-20 overflow-hidden rounded-md mt-6 relative">
						<HiXCircle
							onClick={() => removeImageHandler(tourCost.bg_image)}
							className="absolute top-1 right-1 w-6 h-6 text-red-200 hover:text-red-700 duration-200 cursor-pointer"
						/>
						<img
							className="w-ful h-full object-cover object-center"
							src={tourCost.bg_image}
							alt={tourCost.bg_image}
						/>
					</div>
				) : (
					<Forms.File
						upload={upload}
						value={tourCost.bg_image}
						onChange={(e) => onChangeHandler(e)}
						name="bg_image"
						label="Background image"
					/>
				)}

				<div className="max-w-xs">
					<Forms.Input
						value={tourCost.cost}
						onChange={(e) => onChangeHandler(e.target)}
						name="cost"
						placeholder="Enter tour cost"
						label="Cost/Person"
						type="number"
					/>
				</div>
			</div>
		</Card>
	)
}

export default TourCost
