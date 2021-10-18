import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los depósitos.
   */
  index() {
    return api().get('/api/v1/users');
  },

  /**
   * Actualiza el depósito indicado.
   * @param {int} id
   * @param {request} data
   */
  updateRol(ci, data) {
    return api().put(`/api/v1/users/${ci}`, data);
  },

  /**
   * Registro de nuevos usuarios
   * @param {form} data
   */
  register(data) {
    return api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        return api().post('/register', data);
      });
  },
};
