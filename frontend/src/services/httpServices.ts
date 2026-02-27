import axios, { type AxiosInstance } from "axios";

export class HttpService {
  protected axios: AxiosInstance;

  constructor(baseURL: string = import.meta.env.VITE_API_URL as string) {
    this.axios = axios.create({
      baseURL: baseURL,
    });

    this.axios.interceptors.request.use((req) => {
      req.headers.Authorization ??= `Bearer ${localStorage.getItem("token")}`;
      return req;
    });
  }
}
