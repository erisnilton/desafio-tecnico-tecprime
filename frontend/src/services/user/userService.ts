import { HttpService } from "../httpServices";
import type { UserReponse } from "./user.model";

export class _UserService extends HttpService {
  async fetchUser(): Promise<UserReponse> {
    return this.axios
      .request({
        method: "GET",
        url: "/auth/me",
      })
      .then((res) => res.data);
  }
}

export const UserService = new _UserService();
