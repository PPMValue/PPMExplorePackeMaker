import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../components/Navbar/logo.png"
import Forms from "../components/Forms/Forms"
import { HiOutlineLogin } from "react-icons/hi"

// Context
import { useAuthContext } from "../context/authContext"

const SignIn = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	})

	const navigate = useNavigate()

	const { signIn, signInError, setSignInError, isAuth } = useAuthContext()

	const onSignIn = (e) => {
		e.preventDefault()
		if (user.email.length > 0 && user.password.length >= 0) {
			signIn(user.email, user.password)
		}
	}

	const showError = () => {
		setTimeout(() => {
			console.log("Remove error message...")
			setSignInError(null)
		}, 7000)
		return <p>{signInError}</p>
	}

	useEffect(() => {
		if (isAuth) {
			navigate("/")
		}
	}, [isAuth])

	return (
		<main className="h-screen bg-gray-100 px-2 flex justify-center items-center absolute top-0 left-0 right-0">
			<div className="max-w-sm w-full rounded-md bg-white border shadow">
				<div className="border-b py-1 pr-5 pl-3  flex items-center justify-between">
					<img src={logo} className="w-[50px]" alt="logo" />
					<h2 className="text-base font-openSans font-bold text-black">
						Sign In
					</h2>
				</div>
				{signInError && showError()}
				<form className="p-5" onSubmit={onSignIn}>
					<Forms.Input
						label="Email"
						placeholder="Enter email address"
						type="email"
						value={user.email}
						onChange={(e) =>
							setUser((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
					/>
					<Forms.Input
						label="Password"
						placeholder="Enter password"
						type="password"
						value={user.password}
						onChange={(e) =>
							setUser((prev) => ({
								...prev,
								password: e.target.value,
							}))
						}
					/>

					<button
						type="submit"
						className="py-1 px-4 w-full border-none rounded-md  justify-center text-white text-base  bg-blue-900/90 hover:bg-blue-900 duration-200 flex items-center mt-4"
					>
						Sign In <HiOutlineLogin className="ml-2" />
					</button>
				</form>
			</div>
		</main>
	)
}

export default SignIn
