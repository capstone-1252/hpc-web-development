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

export function getImageUrl(image: AssetImage | undefined, width: number, height:number): string {
	if (!image?.path) return "";

	let assetId = image._id;

	if (!assetId) {
		const pathParts = image.path.split('/');
		const filename = pathParts[pathParts.length - 1];
		assetId = filename.split('-')[0]; 
		if (!assetId.match(/^[a-f0-9]{24}$/i)) {
			assetId = filename.split('.')[0];
		}
	}

	return `${import.meta.env.PUBLIC_COCKPIT_API}/assets/image/${assetId}?m=thumbnail&w=${width}&h=${height}&q=80&o=1`;
}
