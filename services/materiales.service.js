import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los materiales.
   */
  index() {
    return api().get('/api/material');
  },

  /**
   * Muestra el material indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/material/${id}`);
  },

  /**
   * Crea un material.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/material', data);
  },

  /**
   * Actualiza el material indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/material/${id}`, data);
  },

  /**
   * Eliminar el material indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/material/${id}`);
  },

  /**
   * Obtiene los movimientos del material.
   * @param {int} id
   */
  movimientos(id) {
    return api().get(`/api/material/${id}/movimientos`);
  },
};
