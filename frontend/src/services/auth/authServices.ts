import type { AxiosInstance } from "axios";
import axios from "axios";

export class _AuthService {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_API_URL + "/auth",
    });
  }

  async login(username: string, password: string): Promise<void> {
    return this.axios
      .request({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          login: username,
          password,
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      });
  }

  async logout(): Promise<void>{
    localStorage.removeItem("token");
  }
}

export const AuthService = new _AuthService();
