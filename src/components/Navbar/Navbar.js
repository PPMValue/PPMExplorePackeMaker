import { NavLink, Link } from "react-router-dom"
import { HiOutlineLogout, HiPlus } from "react-icons/hi"
import logo from "./logo.png"

// Context
import { useAuthContext } from "../../context/authContext"

const Navbar = () => {
	const { isAuth, logout } = useAuthContext()
	return (
		<nav className="bg-white py-1 px-4 shadow-sm border-b">
			<div className="max-w-7xl flex justify-between items-center m-auto">
				<Link to="/">
					<img className="w-16" src={logo} alt="logo" />
				</Link>
				{isAuth && (
					<div className="flex items-center space-x-8 w-fit">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive
									? "font-semibold text-blue-500 text-base"
									: "font-normal text-black text-base hover:text-blue-500 duration-200"
							}
							end
						>
							Home
						</NavLink>
						<NavLink
							to="/create"
							className={({ isActive }) =>
								isActive
									? "font-semibold text-blue-500 text-base"
									: "font-normal text-black text-base hover:text-blue-500 duration-200"
							}
						>
							<span className="flex items-center ">
								Create Package <HiPlus className="ml-1 w-4 h-4" />
							</span>
						</NavLink>
						{isAuth && (
							<button
								onClick={logout}
								className="flex items-center py-1 px-4 rounded-md font-light bg-red-700/80 hover:bg-red-700 duration-200 text-white"
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
