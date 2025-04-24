import AxiosClass from "../utils/axios";


interface User {
  id?: string;
  name?: string;
  email?: string;
}

class UserService {
  axios = AxiosClass; 
  async register(data: {}): Promise<User> {
    const user = await this.axios.post("/auth/register", data);
    return user; 
  }

  async login(data: {}): Promise<User> {
    const user = await this.axios.post("/auth/login", data);
    return user;
  }

  async getUser(): Promise<User> {
    const user = await this.axios.get("/auth/me");
    return user;
  }
  
}

export default UserService;
