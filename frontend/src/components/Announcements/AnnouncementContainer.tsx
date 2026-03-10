interface AnnouncementContainerProps {
	className: string
	children: React.ReactNode
}
export const AnnouncementContainer = ({ className, children }: AnnouncementContainerProps) => {
	return (
		<div className={className}>
			{children}
		</div>
	)
}
