import React from "react"
import { HiPlus } from "react-icons/hi"

const Input = ({ name, label, placeholder, type, value, onChange }) => {
	return (
		<div className="mb-3 flex flex-col items-start w-full">
			<label className="text-[13px] text-slate-800 mb-1 font-medium">
				{label}
			</label>
			<input
				className="px-3 py-1 flex-grow rounded-sm border text-sm outline-none focus:border-gray-500 duration-200 w-full"
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}
const File = ({ name, label, placeholder, value, onChange, upload }) => {
	return (
		<div className="flex flex-col items-start mb-3">
			<h2 className="text-[13px] text-slate-800 mb-1 font-medium">{label}</h2>
			<label className="w-[100px] h-[100px] border border-dashed border-gray-300 cursor-pointer bg-white duration-200 hover:bg-gray-200 flex flex-col justify-center items-center">
				<HiPlus className="text-gray-600" />
				<span className="block text-gray-600 text-sm pt-3">
					{value ? value?.name : "Upload"}
				</span>
				<input
					className="hidden"
					type="file"
					name={name}
					placeholder={placeholder}
					onChange={(e) => {
						upload(e.target.files[0]).then((url) => {
							onChange({
								name: name,
								value: url,
							})
						})
					}}
				/>
			</label>
		</div>
	)
}

const Textarea = ({ name, label, placeholder, type, value, onChange }) => {
	return (
		<div className="mb-3 flex flex-col items-start w-full">
			<label className="text-[13px] text-slate-800 mb-1 font-medium">
				{label}
			</label>
			<textarea
				className="px-3 py-1 flex-grow rounded-sm border text-sm outline-none focus:border-gray-500 duration-200 w-full"
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

const Forms = {
	Input,
	File,
	Textarea,
}

export default Forms
