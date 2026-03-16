export interface AssetImage {
	path: string;
	title: string
	mime: string
	type: string
	description: string
	tags: any[]
	size: number
	colors: string[]
	width: number
	height: number
	_hash: string
	_created: number
	_modified: number
	_cby: string
	altText: string
	thumbhash: string
	folder: string
	_id: string
}

export function getImageUrl(image: AssetImage, width: number, height:number): string {
	const url = `${import.meta.env.PUBLIC_COCKPIT_API}/assets/image/${image._id}?m=thumbnail&w=${width}&h=${height}&q=80&o=1`;

	return url
}
