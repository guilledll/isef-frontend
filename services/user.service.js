import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los depósitos.
   */
  async index() {
    return await api().get('/api/v1/users');
  },
  /**
   * Actualiza el depósito indicado.
   * @param {int} id
   * @param {request} data
   */
  async updateRol(ci, data) {
    return await api().put(`/api/v1/users/${ci}`, data);
  },
};
