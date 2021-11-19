import api from '@/services/api.service';

export default {
  /**
   * Obtiene todos los inventario
   */
  index() {
    return api().get('/api/v1/inventario');
  },

  /**
   * Crea un movimiento.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/v1/inventario', data);
  },

  /**
   * Actualiza el movimiento indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/v1/inventario/${id}`, data);
  },

  /**
   * Devuelve un movimiento específico
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/v1/inventario/${id}`);
  },

  /**
   * Eliminar el movimiento indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/v1/inventario/${id}`);
  },
};
