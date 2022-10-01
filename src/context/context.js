import React, { createContext, useState, useContext } from "react"
import { v4 as uuid } from "uuid"
const PackageContext = createContext()

export const PackageProvider = ({ children }) => {
	const [tourPackage, setTourPackage] = useState({
		package_name: "",
		pageOne: [
			{
				id: uuid(),
				logo: "",
			},
		],
		trips: [
			{
				id: uuid(),
				title: "",
				subTitle: "",
				description: "",
				bg_image: "",
				image: "",
			},
		],
		tourCost: {
			id: uuid(),
			tour_title: "",
			tour_subtitle: "",
			bg_image: "",
			cost: "",
		},

		inclusions: { bg_image: "", items: [{ id: uuid(), inclusion: "" }] },
		exclusions: { bg_image: "", items: [{ id: uuid(), exclusion: "" }] },
		note: {
			bg_image: "",
			items: [
				{
					id: uuid(),
					note: "",
				},
			],
		},
		policies: {
			bg_image: "",
			items: [
				{
					id: uuid(),
					policy: "",
				},
			],
		},
		contact: {
			bg_image: "",
			website: "",
			email: "",
			insta: "",
			fb: "",
			number: "",
		},
	})

	return (
		<PackageContext.Provider value={{ tourPackage, setTourPackage }}>
			{children}
		</PackageContext.Provider>
	)
}

export const usePackageContext = () => {
	const { tourPackage, setTourPackage } = useContext(PackageContext)
	return { tourPackage, setTourPackage }
}
