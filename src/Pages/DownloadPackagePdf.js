import { useRef } from "react"
import { HiDownload } from "react-icons/hi"
import { MdTrain } from "react-icons/md"
import { useParams } from "react-router"
import { useReactToPrint } from "react-to-print"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

// Hooks
import useGetPackageDetails from "../hooks/useGetPackageDetails"

// size: 297mm 210mm ;
const pageStyle = `
  @page {
    size: 297mm 180mm ;
  }
  @media all {
    .pagebreak {
      display: none;
    }
  }
  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`

const DownloadPackagePdf = () => {
	const packageRef = useRef(null)
	const { id } = useParams()
	const { packageDetails, isLoading } = useGetPackageDetails(id)

	const downloadPdf = useReactToPrint({
		content: () => packageRef.current,
		pageStyle: pageStyle,
	})

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<div className="mt-16">
			<button
				onClick={downloadPdf}
				className="hover:bg-slate-100 m-auto duration-300 active:bg-slate-200 mt-1 flex items-center  cursor-pointer px-3 py-1 w-fit rounded-lg bg-white shadow-sm shadow-slate-300 text-base text-gray-600 sm:mt-0 sm:col-span-2"
			>
				<HiDownload className="mr-2 block w-5 h-5" />
				Download
			</button>

			<div ref={packageRef} className="font-merriweather">
				<section className="w-[297mm] h-[180mm]  flex items-center justify-center m-auto">
					{/* <section className="w-full h-[650px]"> */}
					<img
						alt="logo"
						className="object-contain w-full h-full"
						src={packageDetails?.pageOne?.logo}
					/>
				</section>
				{packageDetails?.trips?.map((item) => (
					<section
						key={item?.id}
						className="w-[297mm] h-[180mm] relative  m-auto"
						style={{
							backgroundImage: `url('${item?.bg_image}')`,
							backgroundSize: "cover",
						}}
					>
						<div className="flex items-center border-b-8 border-dashed absolute top-5 shadow-md left-0 bg-white pt-4 pb-3 pl-4 pr-6 rounded-r-full text-3xl font-extrabold uppercase text-slate-500">
							<MdTrain className="mr-2 w-10 h-10" />
							{item?.title}
						</div>

						<div className="absolute top-5 right-6 rounded-3xl bg-purple-400 border border-purple-500/70 text-5xl font-bold text-black shadow-md px-5 pt-4 pb-5 ">
							{item?.subtitle}
						</div>

						<img
							alt={item?.image}
							className="absolute bottom-5 left-4 w-[350px] h-[400px] object-center object-cover border-[5px] rounded-md border-slate-700"
							src={item?.image}
						/>

						<div className="absolute right-0 bottom-5 shadow-lg max-w-lg bg-purple-500 border-2 border-r-0 border-purple-600/70 py-4 px-5 rounded-l-3xl text-xl text-justify font-semibold  text-black">
							{item?.description?.slice(0, 250)}
						</div>
					</section>
				))}
				<section
					key={packageDetails?.tourCost?.id}
					className="w-[297mm] h-[180mm] relative  m-auto opacity-low"
					style={{
						backgroundImage: `url('${packageDetails?.tourCost?.bg_image}')`,
						backgroundSize: "cover",
					}}
				>
					<div className="w-full h-full relative  m-auto z-40">
						<h2 className="text-5xl text-center text-yellow-400 text-stroke font-extrabold pt-16 uppercase">
							{packageDetails?.tourCost?.tour_title}
						</h2>
						<h3 className="font-extrabold pt-16 uppercase text-black text-5xl text-center -mt-4">
							{packageDetails?.tourCost?.tour_subtitle}
						</h3>
						<div className="pt-20">
							<h4 className="uppercase text-black text-4xl font-extrabold ml-10">
								Tour cost -
							</h4>
							<span className=" m-auto ml-72 flex items-end">
								<h4 className="font-extrabold text-9xl text-yellow-400 text-stroke">
									{packageDetails?.tourCost?.cost}
									{"/-"}
								</h4>
								<h4 className=" text-black text-4xl font-extrabold pl-10">
									Per Person
								</h4>
							</span>
						</div>
					</div>
				</section>

				<section
					className="w-[297mm] h-[180mm] relative  m-auto py-20 px-24 opacity-extra-low"
					style={{
						backgroundImage: `url('${packageDetails?.inclusions?.bg_image}')`,
						backgroundSize: "cover",
					}}
				>
					<div className="w-full h-full relative z-40">
						<h2 className="text-4xl font-extrabold text-orange-600 uppercase ">
							Cost inclusions:
						</h2>
						<ul className=" list-disc mt-8 pl-4 font-bold ">
							{packageDetails?.inclusions?.items?.map((item) => (
								<li key={item?.id} className="mt-2 text-lg">
									{item?.inclusion}
								</li>
							))}
						</ul>
					</div>
				</section>
				<section
					className="w-[297mm] h-[180mm] relative  m-auto py-20 px-24 opacity-extra-low"
					style={{
						backgroundImage: `url('${packageDetails?.exclusions?.bg_image}')`,
						backgroundSize: "cover",
					}}
				>
					<div className="w-full h-full relative z-40">
						<h2 className="text-4xl font-extrabold text-orange-600 uppercase">
							Cost exclusions:
						</h2>
						<ul className=" list-disc mt-8 pl-4 font-bold ">
							{packageDetails?.exclusions?.items?.map((item) => (
								<li key={item?.id} className="mt-2 text-lg">
									{item?.exclusion}
								</li>
							))}
						</ul>
					</div>
				</section>

				<section
					className="w-[297mm] h-[180mm] relative  m-auto py-20 px-24 opacity-extra-low"
					style={{
						backgroundImage: `url('${packageDetails?.note?.bg_image}')`,
						backgroundSize: "cover",
					}}
				>
					<div className="w-full h-full relative z-40">
						<h2 className="text-4xl font-extrabold text-orange-600 uppercase">
							Note:
						</h2>
						<ul className=" list-disc mt-4 pl-4 font-bold">
							{packageDetails?.note?.items?.map((item) => (
								<li key={item?.id} className="mt-2 text-lg">
									{item?.note}
								</li>
							))}
						</ul>
						<h2 className="text-4xl font-extrabold text-orange-600 uppercase mt-20">
							Payment / Cancellation Policy:
						</h2>
						<ul className=" list-disc mt-4 pl-4 font-bold">
							{packageDetails?.policies?.items?.map((item) => (
								<li key={item?.id} className="mt-2 text-lg">
									{item?.policy}
								</li>
							))}
						</ul>
					</div>
				</section>

				<section
					className="w-[297mm] h-[180mm] relative  m-auto p-14 opacity-extra-low"
					style={{
						backgroundImage: `url('${packageDetails?.contact?.bg_image}')`,
						backgroundSize: "cover",
					}}
				>
					<div className="w-full h-full relative z-40">
						<h2 className="text-5xl font-extrabold text-black uppercase text-left">
							Contact Us:
						</h2>
						<div className="flex items-start justify-center pt-24">
							<div className="w-fit pr-20 space-y-5">
								<h2 className="text-3xl text-black font-extrabold">Website-</h2>
								<h2 className="text-3xl text-black font-extrabold">Email-</h2>
								<h2 className="text-3xl text-black font-extrabold">Insta-</h2>
								<h2 className="text-3xl text-black font-extrabold">
									Facebook-
								</h2>
								<h2 className="text-3xl text-black font-extrabold">
									Contact No-
								</h2>
							</div>
							<div className="w-fit pr-20 space-y-5">
								<h2 className="text-3xl text-orange-600 font-extrabold">
									{packageDetails?.contact?.website || "--"}
								</h2>
								<h2 className="text-3xl text-orange-600 font-extrabold">
									{packageDetails?.contact?.email || "--"}
								</h2>
								<h2 className="text-3xl text-orange-600 font-extrabold">
									{packageDetails?.contact?.insta || "--"}
								</h2>
								<h2 className="text-3xl text-orange-600 font-extrabold">
									{packageDetails?.contact?.fb || "--"}
								</h2>
								<h2 className="text-3xl text-orange-600 font-extrabold">
									{packageDetails?.contact?.number || "--"}
								</h2>
							</div>
						</div>
					</div>
				</section>

				<section className="w-[297mm] h-[180mm] relative  m-auto p-14 flex items-center justify-center">
					<h2 className="text-9xl text-center text-red-400 text-stroke font-extrabold space-x-8 uppercase">
						Thank you
					</h2>
				</section>

				<section className="w-[297mm] h-[180mm]  flex items-center justify-center m-auto">
					{/* <section className="w-full h-[650px]"> */}
					<img
						className="object-contain w-full h-full"
						src={packageDetails?.pageOne?.logo}
						alt={packageDetails?.pageOne?.logo}
					/>
				</section>
			</div>
		</div>
	)
}

export default DownloadPackagePdf

// SojDu0jQ87beSa2zDv6A
