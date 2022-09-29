import React from "react"

const Card = ({ children, heading }) => {
	return (
		<div className="border rounded-sm bg-white shadow-sm mb-6">
			{heading && (
				<div className="py-3 px-4 text-xl font-base text-slate-600 border-b shadow-sm">
					{heading}
				</div>
			)}
			<div className="p-4">{children}</div>
		</div>
	)
}

export default Card
