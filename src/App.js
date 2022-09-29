import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "./Pages/Home"
import CreatePackage from "./Pages/CreatePackage"
import DownloadPackagePdf from "./Pages/DownloadPackagePdf"
import SignIn from "./Pages/SignIn"
import Navbar from "./components/Navbar/Navbar"

// Context
import { PackageProvider } from "./context/context"
import { useAuthContext } from "./context/authContext"

function App() {
	const { isAuth } = useAuthContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuth) {
			console.log(isAuth)
		} else {
			navigate("/signin")
		}
	}, [isAuth, navigate])
	return (
		<PackageProvider>
			<Navbar />
			<Routes>
				<Route path="/signin" element={<SignIn />} />
			</Routes>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/create" element={<CreatePackage />} />
				<Route path="/pdf/:id" element={<DownloadPackagePdf />} />
			</Routes>
		</PackageProvider>
	)
}

export default App
