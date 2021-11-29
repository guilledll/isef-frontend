import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los materiales.
   */
  index() {
    return api().get('/material');
  },

  /**
   * Muestra el material indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/material/${id}`);
  },

  /**
   * Crea un material.
   * @param {request} data
   */
  create(data) {
    return api().post('/material', data);
  },

  /**
   * Actualiza el material indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/material/${id}`, data);
  },

  /**
   * Eliminar el material indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/material/${id}`);
  },

  /**
   * Obtiene los movimientos del material.
   * @param {int} id
   */
  movimientos(id) {
    return api().get(`/material/${id}/movimientos`);
  },
};
