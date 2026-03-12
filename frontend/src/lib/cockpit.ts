import axios, {type AxiosInstance, type AxiosRequestConfig } from "axios";

export interface CockpitOptions {
	filter?: Record<string, any>;
	sort?: Record<string, number>;
	limit?: number;
	skip?: number;
	populate?: number;
}

// These fields are default metadata on all cockpit items
export interface CockpitItemData {
	_id: string
	// modified and created time as unix time stamp
	_modified: number
	_created: number
	_mby: string
	_state: number
	_cby: string
}

export interface CockpitResponse<T = any> {
	data?: T;
	error?: string;
}

class CockpitAPI {
	private client: AxiosInstance;

	constructor() {
		const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
		if(!baseURL) {
			console.error("No base URL")
		}

		this.client = axios.create({
			baseURL,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async request<T = any>(
		endpoint: string,
		config: AxiosRequestConfig = {}
	): Promise<T> {
		try {
			const response = await this.client.request<T>({
				url: endpoint,
				method: config.method ?? "GET",
				...config,
			});

			return response.data;
		} catch (err: any) {
			if (err.response) {
				const { status, statusText, data } = err.response;
				throw new Error(
					data?.error || `HTTP ${status}: ${statusText} : ${data}`
				);
			}

			throw err;
		}
	}

	async getItems<T = any>(
		collection: string,
		options: CockpitOptions = {}
	): Promise<T[]> {
		const params: Record<string, any> = { ...options };

		// Only JSON-stringify objects, not numbers like limit/skip
		Object.keys(params).forEach((key) => {
			if (typeof params[key] === "object") {
				params[key] = JSON.stringify(params[key]);
			}
		});

		return this.request<T[]>(`/content/items/${collection}`, { params });
	}


	async getItem<T = any>(collection: string, id: string): Promise<T> {
		return this.request<T>(`/content/item/${collection}/${id}`);
	}

	async getSingleton<T = any>(singleton: string): Promise<T> {
		return this.request<T>(`/content/item/${singleton}`);
	}

	async getAssetUrl(assetId: string, options: { 
		width?: number; 
		height?: number; 
		quality?: number; 
		mode?: 'thumbnail' | 'bestFit' | 'resize' | 'fitToWidth' | 'fitToHeight';
		mime?: 'auto' | 'gif' | 'jpeg' | 'png' | 'webp' | 'bmp';
	} = {}): Promise<string> {
		const params = new URLSearchParams();
		if (options.mode) params.append('m', options.mode);
		if (options.width) params.append('w', options.width.toString());
		if (options.height) params.append('h', options.height.toString());
		if (options.quality) params.append('q', options.quality.toString());
		if (options.mime) params.append('mime', options.mime);
		params.append('o', '1');
		
		const paramString = params.toString();
		const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
		return `${baseURL}/assets/image/${assetId}${paramString ? '?' + paramString : ''}`;
	}
}

export default new CockpitAPI();

