import { useNavigate, Link } from "react-router-dom"
// Firebase
import { HiPencilAlt, HiTrash } from "react-icons/hi"
import useGetPackages from "../hooks/useGetPackages"
import useDeletePackage from "../hooks/useDeletePackage"

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import SliceTextIf from "../components/SliceTextIf/SliceTextIf"

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
		<div className="px-3">
			{deleteloading && <LoadingSpinner />}
			<section className="max-w-4xl   m-auto pt-10">
				<h2 className="text-slate-800  text-3xl font-light mb-6 border-l-4 border-l-red-500/80 pl-3">
					Packages
				</h2>
				<div className="max-w-xl border rounded-md p-3 bg-white shadow mt-2">
					{packages?.map((item) => (
						<div
							key={item?.id}
							className="w-full py-2 flex justify-between items-center"
						>
							<Link to={`/pdf/${item?.id}`} className="link-style text-sm">
								<SliceTextIf moreThan={30}>{item?.package_name}</SliceTextIf>
							</Link>
							<div className="flex items-center space-x-4">
								<HiPencilAlt
									onClick={() => navigate(`/edit/${item?.id}`)}
									// onClick={() => navigate(`/pdf/${item?.id}`)}
									className="cursor-pointer h-5 w-5 text-gray-400 hover:text-gray-600 duration-200"
								/>
								<button
									onClick={() => deletePackageHanlder(item?.id)}
									className="text-red-400 font-semibold hover:text-red-600 duration-200 ease-in-out"
								>
									<HiTrash className="w-5 h-5 ml-2  " />
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
