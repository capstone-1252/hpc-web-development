import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { AssetImage } from "@/loaders/utils"
import { getImageUrl } from "@/loaders/utils"

interface PhotoGalleryProps {
	images: AssetImage[]
	altPrefix?: string
	width?: number
	height?: number
	displayOrder?: boolean
}

export const PhotoGallery = ({
	images,
	altPrefix = "Image",
	width = 1200,
	height = 800,
	displayOrder = false,
}: PhotoGalleryProps) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	if (!images?.length) {
		return null
	}

	const currentImage = images[currentIndex]
	const imageUrl = getImageUrl(currentImage, width, height)

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
	}

	return (
		<div className="relative rounded-2xl shadow-xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px]">
			<img
				src={imageUrl}
				alt={currentImage.altText || `${altPrefix} ${currentIndex + 1}`}
				className="w-full h-full object-cover"
			/>
			{displayOrder && (
				<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-3">
					<span className="text-sm font-medium">
						{currentIndex + 1} of {images.length}: {currentImage.description || "No description"}
					</span>
				</div>
			)}
			{images.length > 1 && (
				<>
					<button
						onClick={goToPrevious}
						className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
						aria-label="Previous photo"
					>
						<ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-dark-blue" />
					</button>
					<button
						onClick={goToNext}
						className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
						aria-label="Next photo"
					>
						<ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-dark-blue" />
					</button>
					<div className="flex justify-center gap-2 mt-4">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
									index === currentIndex ? "bg-dark-blue" : "bg-dark-blue/30"
								}`}
								aria-label={`Go to photo ${index + 1}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	)
}
