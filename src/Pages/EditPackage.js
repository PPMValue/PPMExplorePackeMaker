import { useEffect } from "react"
import { useParams } from "react-router"
import { HiXCircle } from "react-icons/hi"
import { v4 as uuid } from "uuid"
// Components
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
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
import useGetPackageDetails from "../hooks/useGetPackageDetails"
import useUploadImage from "../hooks/useUploadImage"
import { useDeleteImage } from "../hooks/useUploadImage"
import useUpdatePackage from "../hooks/useUpdatePackage"

const EditPackage = () => {
	const { id } = useParams()
	const { packageDetails, isLoading } = useGetPackageDetails(id)
	const { tourPackage, setTourPackage, resetPackage } = usePackageContext()
	const { upload } = useUploadImage()
	const { deleteImage } = useDeleteImage()
	const { updatePackage, isLoading: updateIsLoading } = useUpdatePackage()
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
		updatePackage(id, tourPackage)
	}

	useEffect(() => {
		if (packageDetails) {
			setTourPackage({
				package_name: packageDetails?.package_name ?? "",
				pageOne: [
					{
						id: uuid(),
						logo: packageDetails?.pageOne?.logo ?? "",
					},
				],
				trips: packageDetails?.trips?.map((item) => ({
					id: item?.id ?? "",
					title: item?.title ?? "",
					subTitle: item?.subTitle ?? "",
					description: item?.description ?? "",
					bg_image: item?.bg_image ?? "",
					image: item?.image ?? "",
				})),
				tourCost: {
					id: packageDetails?.tourCost?.id ?? uuid(),
					tour_title: packageDetails?.tourCost?.tour_title ?? "",
					tour_subtitle: packageDetails?.tourCost?.tour_subtitle ?? "",
					bg_image: packageDetails?.tourCost?.bg_image ?? "",
					cost: packageDetails?.tourCost?.cost,
				},

				inclusions: {
					bg_image: packageDetails?.inclusions?.bg_image ?? "",
					items: packageDetails?.inclusions?.items?.map((item) => ({
						id: item?.id ?? uuid(),
						inclusion: item?.inclusion,
					})),
				},
				exclusions: {
					bg_image: packageDetails?.exclusions?.bg_image ?? "",
					items: packageDetails?.exclusions?.items?.map((item) => ({
						id: item?.id ?? uuid(),
						exclusion: item?.exclusion,
					})),
				},
				note: {
					bg_image: packageDetails?.note?.bg_image ?? "",
					items: packageDetails?.note?.items?.map((item) => ({
						id: item?.id ?? uuid(),
						note: item?.note ?? "",
					})),
				},
				policies: {
					bg_image: packageDetails?.policies?.bg_image ?? "",
					items: packageDetails?.policies?.items?.map((item) => ({
						id: item?.id ?? uuid(),
						policy: item?.policy ?? "",
					})),
				},
				contact: {
					bg_image: packageDetails?.contact?.bg_image ?? "",
					website: packageDetails?.contact?.website ?? "",
					email: packageDetails?.contact?.email ?? "",
					insta: packageDetails?.contact?.insta ?? "",
					fb: packageDetails?.contact?.fb ?? "",
					number: packageDetails?.contact?.number ?? "",
				},
			})
		}

		return () => resetPackage()
	}, [packageDetails, setTourPackage, resetPackage])

	if (isLoading) {
		return <LoadingSpinner />
	}

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
					{updateIsLoading ? "Loading..." : "Update"}
				</button>
			</form>
		</div>
	)
}

export default EditPackage
