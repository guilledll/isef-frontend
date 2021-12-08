import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los departamentos.
   */
  async index() {
    return await api().get('/departamentos');
  },
  /**
   * Crea un departamento.
   * @param {request} data
   */
  async store(data) {
    return await api().post('/departamentos', data);
  },
};
