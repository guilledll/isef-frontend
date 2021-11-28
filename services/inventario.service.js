import api from '@/services/api.service';

export default {
  /**
   * Obtiene todos los inventario
   */
  index() {
    return api().get('/api/inventario');
  },

  /**
   * Crea un movimiento.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/inventario', data);
  },

  /**
   * Actualiza el movimiento indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/inventario/${id}`, data);
  },

  /**
   * Devuelve un movimiento específico
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/inventario/${id}`);
  },

  /**
   * Eliminar el movimiento indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/inventario/${id}`);
  },
};
