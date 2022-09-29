import { useNavigate } from "react-router"
// Firebase
import { HiDownload } from "react-icons/hi"
import useGetPackages from "../hooks/useGetPackages"

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

const Home = () => {
	const navigate = useNavigate()
	const { packages, isLoading } = useGetPackages()

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<div className="font-openSans bg-gray-100 min-h-screen w-full">
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
							<h3>{item?.id}</h3>
							<HiDownload
								onClick={() => navigate(`/pdf/${item?.id}`)}
								className="cursor-pointer h-5 w-5 text-gray-400 hover:text-gray-600 duration-200"
							/>
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
