import api from '@/services/api.service';

export default {
  /**
   * Registro de nuevos usuarios
   * @param {*} data
   */
  async register(data) {
    await api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        return api().post('/register', data);
      });
  },
};
