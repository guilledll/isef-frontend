import api from '@/services/api.service';

export default {
  /**
   * Obtiene todos los departamentos
   */
  async index() {
    return await api().get('/api/v1/departamentos');
  },
  /**
   * Crea un departamento.
   * @param {request} data
   */
  async create(data) {
    return await api().post('/api/v1/departamentos', data);
  },
  /**
   * Actualiza el departamento indicado.
   * @param {int} id
   * @param {request} data
   */
  async update(id, data) {
    return await api().put(`/api/v1/departamentos/${id}`, data);
  },

  /**
   * Devuelve un departamento específico
   * @param {int} id
   */
  async show(id) {
    return await api().get(`/api/v1/departamentos/${id}`);
  },
  /**
 * Eliminar el departamento indicado.
 * @param {int} id
 */
  async delete(id) {
    return await api().delete(`/api/v1/departamentos/${id}`);
  },
};

