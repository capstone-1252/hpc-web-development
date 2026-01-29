import axios, {type AxiosInstance, type AxiosRequestConfig } from "axios";

interface CockpitOptions {
  filter?: Record<string, any>;
  sort?: Record<string, number>;
  limit?: number;
  skip?: number;
  populate?: number;
}

interface CockpitResponse<T = any> {
  data?: T;
  error?: string;
}

class CockpitAPI {
  private client: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.PUBLIC_COCKPIT_API;

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
          data?.error || `HTTP ${status}: ${statusText}`
        );
      }

      throw err;
    }
  }

  async getItems<T = any>(
    collection: string,
    options: CockpitOptions = {}
  ): Promise<T[]> {
    return this.request<T[]>(`/content/items/${collection}`, {
      params: options,
      // Cockpit expects objects as JSON strings in query params
      paramsSerializer: {
        serialize: (params) =>
          Object.entries(params)
            .map(([key, value]) =>
              `${key}=${encodeURIComponent(
                typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)
              )}`
            )
            .join("&"),
      },
    });
  }

  async getItem<T = any>(collection: string, id: string): Promise<T> {
    return this.request<T>(`/content/item/${collection}/${id}`);
  }

  async getSingleton<T = any>(singleton: string): Promise<T> {
    return this.request<T>(`/content/item/${singleton}`);
  }
}

export default new CockpitAPI();

