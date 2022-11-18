const SliceTextIf = ({ children, moreThan }) => {
	if (children?.length > moreThan) {
		const text = children.slice(0, moreThan) + "..."
		return text
	}
	return children
}

export default SliceTextIf
