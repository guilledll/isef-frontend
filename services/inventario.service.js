import api from '@/services/api.service';

export default {
  /**
   * Obtiene todos los inventario
   */
  index() {
    return api().get('/inventario');
  },
  /**
   * Crea un movimiento.
   * @param {request} data
   */
  create(data) {
    return api().post('/inventario', data);
  },
  /**
   * Actualiza el movimiento indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/inventario/${id}`, data);
  },
  /**
   * Devuelve un movimiento específico
   * @param {int} id
   */
  show(id) {
    return api().get(`/inventario/${id}`);
  },
  /**
   * Eliminar el movimiento indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/inventario/${id}`);
  },
};
