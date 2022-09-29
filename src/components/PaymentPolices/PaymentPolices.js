import { HiPlus, HiTrash, HiXCircle } from "react-icons/hi"
import { v4 as uuid } from "uuid"

// Components
import Card from "../Card/Card"
import Forms from "../Forms/Forms"
import Buttons from "../Buttons/Buttons"

// Context
import { usePackageContext } from "../../context/context"
import useUploadImage, { useDeleteImage } from "../../hooks/useUploadImage"

const PaymentPolices = () => {
	const { tourPackage, setTourPackage } = usePackageContext()

	const { upload } = useUploadImage()
	const { deleteImage } = useDeleteImage()

	const onChangeHandler = (e, id) => {
		const { name, value } = e
		setTourPackage((prev) => {
			const newItem = prev.policies.items.map((item) => {
				if (item.id === id) {
					return {
						...item,
						[name]: value,
					}
				}
				return item
			})
			return { ...prev, policies: { ...prev.policies, items: newItem } }
		})
	}

	const addImageHandler = (e) => {
		const { name, value } = e
		setTourPackage((prev) => {
			const newItem = { ...prev.policies, [name]: value }
			return { ...prev, policies: newItem }
		})
	}

	const addItemHandler = () => {
		setTourPackage((prev) => ({
			...prev,
			policies: {
				...prev.policies,
				items: [
					...prev.policies.items,
					{
						id: uuid(),
						policy: "",
					},
				],
			},
		}))
	}

	const removeItemHandler = (id) => {
		setTourPackage((prev) => {
			const newItems = prev.policies.items.filter((item) => item.id !== id)
			return {
				...prev,
				policies: { ...prev.policies, items: [...newItems] },
			}
		})
	}

	const removeImageHandler = (url) => {
		if (!url) return
		deleteImage(url)

		setTourPackage((prev) => ({
			...prev,
			policies: {
				...prev.policies,
				bg_image: "",
			},
		}))
	}

	return (
		<section>
			<Card heading="Payment/Cancellation Polices">
				{tourPackage?.policies?.bg_image ? (
					<div className="w-20 h-20 overflow-hidden rounded-md mb-2 relative">
						<HiXCircle
							onClick={() =>
								removeImageHandler(tourPackage?.policies?.bg_image)
							}
							className="absolute top-1 right-1 w-6 h-6 text-red-200 hover:text-red-700 duration-200 cursor-pointer"
						/>
						<img
							className="w-ful h-full object-cover object-center"
							src={tourPackage?.policies?.bg_image}
							alt={tourPackage?.policies?.bg_image}
						/>
					</div>
				) : (
					<Forms.File
						upload={upload}
						value={tourPackage?.policies?.bg_image}
						onChange={(e) => addImageHandler(e)}
						name="bg_image"
						label="Background image"
					/>
				)}

				{tourPackage?.policies?.items?.map((item) => (
					<div key={item?.id} className="flex gap-6 max-w-md items-start">
						<Buttons.DangerIcon
							onClick={() => removeItemHandler(item?.id)}
							icon={HiTrash}
						></Buttons.DangerIcon>
						<Forms.Input
							value={item.policy}
							onChange={(e) => onChangeHandler(e.target, item.id)}
							name="policy"
							placeholder="Enter policy"
							label="Policy"
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

export default PaymentPolices
