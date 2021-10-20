import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos las categorías.
   */
  index() {
    return api().get('/api/v1/categorias');
  },

  /**
   * Muestra la categoría indicada.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/v1/categorias/${id}`);
  },

  /**
   * Crea un categoría.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/v1/categorias', data);
  },

  /**
   * Actualiza la categoría indicada.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/v1/categorias/${id}`, data);
  },

  /**
   * Eliminar la categoría indicada.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/v1/categorias/${id}`);
  },
};
