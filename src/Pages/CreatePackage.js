import { useEffect } from "react"
import { useNavigate } from "react-router"
import { HiXCircle } from "react-icons/hi"
// Components
import Forms from "../components/Forms/Forms"
import Card from "../components/Card/Card"
import TripDays from "../components/TripDays/TripDays"
import TourCost from "../components/TourCost.js/TourCost"
import CostInclusions from "../components/CostInclusions/CostInclusions"
import CostExclusions from "../components/CostExclusions/CostExclusions"
import Notes from "../components/Notes/Notes"
import PaymentPolices from "../components/PaymentPolices/PaymentPolices"
import ContactUs from "../components/ContactUs/ContactUs"

// Context
import { usePackageContext } from "../context/context"

// Hooks
import useUploadImage from "../hooks/useUploadImage"
import useCreatePackage from "../hooks/useCreatePackage"
import { useDeleteImage } from "../hooks/useUploadImage"

const CreatePackage = () => {
	const navigate = useNavigate()
	const { tourPackage, setTourPackage } = usePackageContext()
	const { createPackage, isLoading, data } = useCreatePackage()
	const { upload } = useUploadImage()
	const { deleteImage } = useDeleteImage()
	const { pageOne } = tourPackage

	const onPackageNameHandler = (e) => {
		const { name, value } = e.target
		setTourPackage((prev) => {
			return { ...prev, [name]: value }
		})
	}

	const onChangeHandler = (e) => {
		const { name, value } = e

		setTourPackage((prev) => {
			const newItem = { ...prev.pageOne, [name]: value }
			return { ...prev, pageOne: newItem }
		})
	}

	const removeImageHandler = (url) => {
		if (!url) return
		deleteImage(url)

		setTourPackage((prev) => {
			const newItem = { ...prev.pageOne, logo: "" }
			return { ...prev, pageOne: newItem }
		})
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		createPackage(tourPackage)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (data) {
				navigate(`pdf/${data}`)
			}
		}, 2000)

		return () => clearTimeout(timeout)
	}, [data])

	return (
		<div className="font-openSans bg-gray-100 min-h-screen py-10 w-full">
			<form onSubmit={onSubmitHandler} className="max-w-4xl  m-auto">
				{/* Package name */}
				<Card heading="Package info">
					<div>
						<Forms.Input
							value={tourPackage.package_name}
							onChange={onPackageNameHandler}
							label="Package name"
							placeholder="Name..."
							name="package_name"
						/>
					</div>
				</Card>
				{/*  Logo and slogan */}
				<Card heading="First page">
					<div className="flex items-start space-x-4">
						{pageOne?.logo ? (
							<div className="w-20 h-20 overflow-hidden rounded-md mt-6 relative">
								<HiXCircle
									onClick={() => removeImageHandler(pageOne.logo)}
									className="absolute top-1 right-1 w-6 h-6 text-red-200 hover:text-red-700 duration-200 cursor-pointer"
								/>
								<img
									className="w-ful h-full object-cover object-center"
									src={pageOne.logo}
									alt={pageOne.logo}
								/>
							</div>
						) : (
							<Forms.File
								upload={upload}
								value={pageOne.logo}
								onChange={(e) => onChangeHandler(e)}
								name="logo"
								label="Logo"
							/>
						)}
					</div>
				</Card>

				<TripDays />
				<TourCost />
				<CostInclusions />
				<CostExclusions />
				<Notes />
				<PaymentPolices />
				<ContactUs />

				<button className="text-lg bg-blue-700/80 duration-200 hover:bg-blue-700/100 m-auto block text-white border-none rounded-sm px-3 py-2">
					{isLoading ? "Loading..." : "Submit & create PDF"}
				</button>
			</form>
		</div>
	)
}

export default CreatePackage
