import { NavLink, Link } from "react-router-dom"
import { HiOutlineLogout, HiPlus } from "react-icons/hi"
import logo from "./logo.png"

// Context
import { useAuthContext } from "../../context/authContext"

const Navbar = () => {
	const { isAuth, logout } = useAuthContext()
	return (
		<nav className="bg-white py-1 px-4 shadow-lg border-b">
			<div className="max-w-7xl flex justify-between items-center m-auto">
				<Link to="/">
					<img className="w-20" src={logo} alt="logo" />
				</Link>
				{isAuth && (
					<div className="flex items-center space-x-6 w-fit">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive
									? "font-semibold text-blue-500 text-base"
									: "font-semibold text-black text-base"
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/create"
							className={({ isActive }) =>
								isActive
									? "font-semibold text-blue-500 text-base"
									: "font-semibold text-black text-base"
							}
						>
							<span className="flex items-center py-1 px-4 rounded-full bg-gray-100">
								Create Package <HiPlus className="ml-1 w-4 h-4" />
							</span>
						</NavLink>
						{isAuth && (
							<button
								onClick={logout}
								className="flex items-center py-1 px-4 rounded-full bg-red-700/80 hover:bg-red-700 duration-200 text-white"
							>
								Sign out <HiOutlineLogout className="ml-2 w-5 h-5" />
							</button>
						)}
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
