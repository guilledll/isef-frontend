import api from '@/services/api.service';

export default {
  /**
   * Obtiene todos los departamentos
   */
  index() {
    return api().get('/api/v1/departamentos');
  },

  /**
   * Crea un departamento.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/v1/departamentos', data);
  },

  /**
   * Actualiza el departamento indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/v1/departamentos/${id}`, data);
  },

  /**
   * Devuelve un departamento específico
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/v1/departamentos/${id}`);
  },

  /**
   * Eliminar el departamento indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/v1/departamentos/${id}`);
  },
};
