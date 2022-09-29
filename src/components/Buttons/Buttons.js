const Primary = ({ children, icon, type, onClick }) => {
	const Icon = icon
	return (
		<button
			onClick={onClick}
			type={type}
			className="w-fit px-3 py-1 border rounded-[3px] font-openSans bg-blue-500 font-medium  text-[13px] text-white hover:bg-blue-500/90 duration-200 flex items-center"
		>
			{icon && <Icon className="w-4 h-4 mr-2" />}
			{children}
		</button>
	)
}
const Secondary = ({ children, icon, type, onClick }) => {
	const Icon = icon
	return (
		<button
			onClick={onClick}
			type={type}
			className="w-fit px-3 py-1 border rounded-[3px] font-openSans font-medium bg-white text-[13px] text-slate-800 hover:bg-gray-200 duration-200 flex items-center"
		>
			{icon && <Icon className="w-4 h-4 mr-2" />}
			{children}
		</button>
	)
}
const DangerIcon = ({ children, icon, type, onClick }) => {
	const Icon = icon
	return (
		<button
			onClick={onClick}
			type={type}
			className="w-fit p-[6px] border rounded-[3px] font-openSans font-medium bg-red-600 text-[13px] text-white hover:bg-red-600/80 duration-200 flex items-center"
		>
			{icon && <Icon className="w-4 h-4" />}
			{children}
		</button>
	)
}

const Buttons = {
	Primary,
	Secondary,
	DangerIcon,
}

export default Buttons
