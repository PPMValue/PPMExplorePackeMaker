import { useNavigate } from "react-router"
// Firebase
import { HiDownload, HiTrash } from "react-icons/hi"
import useGetPackages from "../hooks/useGetPackages"
import useDeletePackage from "../hooks/useDeletePackage"

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

const Home = () => {
	const navigate = useNavigate()
	const { packages, isLoading, getPackages } = useGetPackages()
	const { deletePackage, isLoading: deleteloading } = useDeletePackage()

	const deletePackageHanlder = (id) => {
		if (!id) return
		deletePackage(id)
		getPackages()
	}

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<div className="font-openSans bg-gray-100 min-h-screen w-full">
			{deleteloading && <LoadingSpinner />}
			<section className="max-w-4xl  m-auto pt-10">
				<h2 className="text-slate-800  text-xl font-semibold underline">
					Packages
				</h2>
				<div className="max-w-lg border rounded-md p-3 bg-white shadow mt-2">
					{packages?.map((item) => (
						<div
							key={item?.id}
							className="w-full py-2 flex justify-between items-center"
						>
							<h3>{item?.package_name}</h3>
							<div className="flex items-center space-x-4">
								<HiDownload
									onClick={() => navigate(`/pdf/${item?.id}`)}
									className="cursor-pointer h-5 w-5 text-gray-400 hover:text-gray-600 duration-200"
								/>
								<button
									onClick={() => deletePackageHanlder(item?.id)}
									className="px-3 py-1 border-2 text-xs text-red-600 font-semibold border-red-600 rounded-lg flex items-center hover:bg-red-600 hover:text-white duration-200 ease-in-out"
								>
									Remove
									<HiTrash className="w-4 h-4 ml-2  " />
								</button>
							</div>
						</div>
					))}
					{(!packages || packages?.length < 1) && (
						<h2 className="font-bold text-gray-500 mt-3">
							No tour packages found!
						</h2>
					)}
				</div>
			</section>
		</div>
	)
}

export default Home
