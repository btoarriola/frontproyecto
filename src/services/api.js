import axios from 'axios';

class Api {
  constructor(baseUrl) {    //aqui va la url de la api base
    this.baseUrl = baseUrl;
  }

  async get(path, params) { //path la parte restante del url |  params los parametros que se pasaran 
    const url = `${this.baseUrl}${path}`;
    const response = await axios.get(url, { params });
    return response.data;
  }

  async post(path, data) {
    const url = `${this.baseUrl}${path}`;
    const response = await axios.post(url, data);
    return response.data;
  }

  async put(path, data) {
    const url = `${this.baseUrl}${path}`;
    const response = await axios.put(url, data);
    return response.data;
  }

  async delete(path) {
    const url = `${this.baseUrl}${path}`;
    const response = await axios.delete(url);
    return response.data;
  }
}

export default new Api('https://api.example.com');
