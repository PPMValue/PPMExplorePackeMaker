// Components
import Card from "../Card/Card"
import Forms from "../Forms/Forms"

// Context
import { usePackageContext } from "../../context/context"
import useUploadImage, { useDeleteImage } from "../../hooks/useUploadImage"
import { HiXCircle } from "react-icons/hi"

const ContactUs = () => {
	const { tourPackage, setTourPackage } = usePackageContext()
	const { deleteImage } = useDeleteImage()
	const { upload } = useUploadImage()
	const { contact } = tourPackage
	const onChangeHandler = (e) => {
		const { name, value } = e

		setTourPackage((prev) => {
			const newItem = { ...prev.contact, [name]: value }
			return { ...prev, contact: newItem }
		})
	}

	const removeImageHandler = (url) => {
		if (!url) return
		deleteImage(url)

		setTourPackage((prev) => {
			const newItem = { ...prev.contact, bg_image: "" }
			return { ...prev, contact: newItem }
		})
	}

	return (
		<section>
			<Card heading="Contact us">
				<Forms.Input
					value={contact.website}
					onChange={(e) => onChangeHandler(e.target)}
					name="website"
					placeholder="Website address"
					label="Website"
					type="text"
				/>
				<Forms.Input
					value={contact.email}
					onChange={(e) => onChangeHandler(e.target)}
					name="email"
					placeholder="Email address"
					label="Email"
					type="email"
				/>
				<Forms.Input
					value={contact.insta}
					onChange={(e) => onChangeHandler(e.target)}
					name="insta"
					placeholder="Instagram"
					label="Instagram"
					type="text"
				/>
				<Forms.Input
					value={contact.fb}
					onChange={(e) => onChangeHandler(e.target)}
					name="fb"
					placeholder="Facebook"
					label="Facebook"
					type="text"
				/>
				<Forms.Input
					value={contact.number}
					onChange={(e) => onChangeHandler(e.target)}
					name="number"
					placeholder="Contact number"
					label="Number"
					type="number"
				/>

				{contact?.bg_image ? (
					<div className="w-20 h-20 overflow-hidden rounded-md mb-2 relative">
						<HiXCircle
							onClick={() => removeImageHandler(contact?.bg_image)}
							className="absolute top-1 right-1 w-6 h-6 text-red-200 hover:text-red-700 duration-200 cursor-pointer"
						/>
						<img
							className="w-ful h-full object-cover object-center"
							src={contact?.bg_image}
							alt={contact?.bg_image}
						/>
					</div>
				) : (
					<Forms.File
						upload={upload}
						value={contact?.bg_image}
						onChange={(e) => onChangeHandler(e)}
						name="bg_image"
						label="Background image"
					/>
				)}
			</Card>
		</section>
	)
}

export default ContactUs
