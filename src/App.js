import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "./Pages/Home"
import CreatePackage from "./Pages/CreatePackage"
import DownloadPackagePdf from "./Pages/DownloadPackagePdf"
import SignIn from "./Pages/SignIn"
import Navbar from "./components/Navbar/Navbar"
import EditPackage from "./Pages/EditPackage"

// Context
import { PackageProvider } from "./context/context"
import { useAuthContext } from "./context/authContext"

function App() {
	const { isAuth } = useAuthContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuth) {
			// console.log(isAuth)
		} else {
			navigate("/signin")
		}
	}, [isAuth, navigate])
	return (
		<PackageProvider>
			<div className="font-openSans bg-gray-100 min-h-screen w-full">
				<Navbar />
				<Routes>
					<Route path="/signin" element={<SignIn />} />
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<CreatePackage />} />
					<Route path="/edit/:id" element={<EditPackage />} />
					<Route path="/pdf/:id" element={<DownloadPackagePdf />} />
				</Routes>
			</div>
		</PackageProvider>
	)
}

export default App
