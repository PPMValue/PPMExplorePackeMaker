import { HiPlusCircle, HiTrash, HiXCircle } from "react-icons/hi"
import { v4 as uuid } from "uuid"

// Components
import Card from "../Card/Card"
import Forms from "../Forms/Forms"
import Buttons from "../Buttons/Buttons"

// Context
import { usePackageContext } from "../../context/context"

// Firebase image upload
import useUploadImage, { useDeleteImage } from "../../hooks/useUploadImage"

const TripDays = () => {
	const { tourPackage, setTourPackage } = usePackageContext()
	const { upload } = useUploadImage()
	const { deleteImage } = useDeleteImage()

	const onChangeHandler = (e, id) => {
		const { name, value } = e
		setTourPackage((prev) => {
			const newItem = prev.trips.map((item) => {
				if (item.id === id) {
					return {
						...item,
						[name]: value,
					}
				}
				return item
			})
			return { ...prev, trips: newItem }
		})
	}

	const addItemHandler = () => {
		setTourPackage((prev) => ({
			...prev,
			trips: [
				...prev.trips,
				{
					id: uuid(),
					title: "",
					subTitle: "",
					description: "",
					bg_image: "",
					image: "",
				},
			],
		}))
	}

	const removeItemHandler = (id) => {
		setTourPackage((prev) => {
			const newItems = prev.trips.filter((item) => item.id !== id)
			return { ...prev, trips: [...newItems] }
		})
	}

	const removeImageHandler = (url, id, name) => {
		if (!url) return
		deleteImage(url)

		setTourPackage((prev) => {
			const newItem = prev.trips.map((item) => {
				if (item.id === id) {
					return {
						...item,
						[name]: "",
					}
				}
				return item
			})
			return { ...prev, trips: newItem }
		})
	}

	return (
		<section>
			<Card heading="Trip days">
				{tourPackage?.trips?.map((item) => (
					<div key={item.id} className="flex items-start space-x-3 mb-3">
						<Buttons.DangerIcon
							onClick={() => removeItemHandler(item?.id)}
							icon={HiTrash}
						></Buttons.DangerIcon>
						<div className="w-full">
							<div className="grid grid-cols-2 gap-6">
								<Forms.Input
									value={item.title}
									onChange={(e) => onChangeHandler(e.target, item.id)}
									name="title"
									placeholder="Enter trip title"
									label="Title"
								/>
								<Forms.Input
									value={item.subtitle}
									onChange={(e) => onChangeHandler(e.target, item.id)}
									name="subtitle"
									placeholder="Enter trip subtitle"
									label="Subtitle"
								/>
							</div>
							<div className="max-w-xl">
								<Forms.Textarea
									value={item.description}
									onChange={(e) => onChangeHandler(e.target, item.id)}
									name="description"
									placeholder="Enter trip description"
									label="Trip description"
								/>
							</div>
							<div className="flex space-x-8">
								{item?.bg_image ? (
									<div className="w-20 h-20 overflow-hidden rounded-md mt-6 relative">
										<HiXCircle
											onClick={() =>
												removeImageHandler(item?.bg_image, item?.id, "bg_image")
											}
											className="absolute top-1 right-1 w-6 h-6 text-red-200 hover:text-red-700 duration-200 cursor-pointer"
										/>
										<img
											className="w-ful h-full object-cover object-center"
											src={item?.bg_image}
											alt={item?.bg_image}
										/>
									</div>
								) : (
									<Forms.File
										upload={upload}
										value={item.bg_image}
										onChange={(e) => onChangeHandler(e, item.id)}
										name="bg_image"
										label="Background image"
									/>
								)}

								{item?.image ? (
									<div className="w-20 h-20 overflow-hidden rounded-md mt-6 relative">
										<HiXCircle
											onClick={() =>
												removeImageHandler(item?.image, item?.id, "image")
											}
											className="absolute top-1 right-1 w-6 h-6 text-red-200 hover:text-red-700 duration-200 cursor-pointer"
										/>
										<img
											className="w-ful h-full object-cover object-center"
											src={item?.image}
											alt={item?.image}
										/>
									</div>
								) : (
									<Forms.File
										upload={upload}
										value={item?.image}
										onChange={(e) => onChangeHandler(e, item.id)}
										name="image"
										label="Trip image"
									/>
								)}
							</div>
						</div>
					</div>
				))}

				<Buttons.Secondary
					type="button"
					icon={HiPlusCircle}
					onClick={addItemHandler}
				>
					Add
				</Buttons.Secondary>
			</Card>
		</section>
	)
}

export default TripDays
