import axios from 'axios';
//Al momento de usar este se tiene que instanciar y colocar la url del API donde este la utenticacion de usuario 
// this.authService = new AuthService('https://example.com/api/auth');
class AuthService { 
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async login(username, password) {
    const url = `${this.baseUrl}/login`;
    const response = await axios.post(url, { username, password });
    return response.data;
  }

  async logout() {
    const url = `${this.baseUrl}/logout`;
    const response = await axios.post(url);
    return response.data;
  }

  async getUserInfo() {
    const url = `${this.baseUrl}/user`;
    const response = await axios.get(url);
    return response.data;
  }

  async signup(username, password, email) {
    const url = `${this.baseUrl}/signup`;
    const data = {
      username,
      password,
      email
    };
    const response = await axios.post(url, data);
    return response.data;
  }
}

export default AuthService;
