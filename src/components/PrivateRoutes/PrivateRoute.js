import { Navigate } from "react-router-dom"

// Context
import { useAuthContext } from "../../context/authContext"

const PrivateRoute = ({ children }) => {
	const { isAuth } = useAuthContext()
	console.log("in pri", isAuth)
	if (!isAuth) {
		// not logged in so redirect to login page with the return url
		return <Navigate to="/signin" />
	}

	// authorized so return child components
	return children
}

export default PrivateRoute
