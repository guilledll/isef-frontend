import api from '@/services/api.service';

export default {
  /**
   * Obtiene todos los materiales
   */
  async index() {
    return await api().get('/api/v1/materiales');
  },
    /**
   * Crea un material.
   * @param {request} data
   */
     async create(data) {
      return await api().post('/api/v1/materiales', data);
    },
};
