import api from '@/services/api.service';

export default {
  /**
   * Obtiene todos los departamentos
   */
  index() {
    return api().get('/departamentos');
  },

  /**
   * Crea un departamento.
   * @param {request} data
   */
  create(data) {
    return api().post('/departamentos', data);
  },

  /**
   * Actualiza el departamento indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/departamentos/${id}`, data);
  },

  /**
   * Devuelve un departamento específico
   * @param {int} id
   */
  show(id) {
    return api().get(`/departamentos/${id}`);
  },

  /**
   * Eliminar el departamento indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/departamentos/${id}`);
  },

  /**
   * Obtiene los depositos del departamento.
   * @param {int} id
   */
  depositos(id) {
    return api().get(`/departamentos/${id}/depositos`);
  },

  /**
   * Obtiene los usuarios del departamento.
   * @param {int} id
   */
  usuarios(id) {
    return api().get(`/departamentos/${id}/usuarios`);
  },

  /**
   * Obtiene los depositos del departamento.
   * @param {int} id
   */
  depositos(id) {
    return api().get(`/api/v1/departamentos/${id}/depositos`);
  },

  /**
   * Obtiene los usuarios del departamento.
   * @param {int} id
   */
  usuarios(id) {
    return api().get(`/api/v1/departamentos/${id}/usuarios`);
  },
};
