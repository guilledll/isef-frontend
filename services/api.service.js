import axios from 'axios';

const ruta = `${process.env.API_BASE_URL}${
  process.env.NODE_ENV == 'production' ? '/api' : ''
}`;

export default () => {
  /**
   * Crea la instancia @api de Axios
   */
  const api = axios.create({
    baseURL: ruta,
    withCredentials: true,
  });

  return api;
};
