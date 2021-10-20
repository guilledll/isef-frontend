import api from '@/services/api.service';

export default {
  /**
   * Obtiene todos los materiales
   */
  index() {
    return api().get('/api/v1/materiales');
  },

  /**
   * Crea un material.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/v1/materiales', data);
  },
};
