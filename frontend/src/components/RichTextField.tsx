import DOMPurify from "dompurify"

interface Props {
	content: string
}
export const RichText = ({ content }: Props) => {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(content)
			}}
		/>
	)
}
