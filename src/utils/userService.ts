import { AxiosClass } from "../tests/mockfile";

class UserService {
  axios = new AxiosClass();

  async register(data: {}) {
    const response = await this.axios.post("/auth/register", data);
    return response;
  }
  async login(data: {}) {
    const response = await this.axios.post("/auth/login", data);
    return response;
  }
  async getUser() {
    const response = await this.axios.get("/auth/me");
    return response;
  }
}

export default UserService;
