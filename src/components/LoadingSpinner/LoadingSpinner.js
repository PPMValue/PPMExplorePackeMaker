import { createPortal } from "react-dom"

const LoadingSpinner = () => {
	const content = (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
			<div className="loading-spinner"></div>
			<div className="fixed top-0 left-0 w-full h-full bg-black -z-10 opacity-40 duration-500"></div>
		</div>
	)

	return createPortal(content, document.getElementById("modal-portal"))
}

export default LoadingSpinner