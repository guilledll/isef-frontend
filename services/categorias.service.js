import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos las categorías.
   */
  index() {
    return api().get('/api/categorias');
  },

  /**
   * Muestra la categoría indicada.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/categorias/${id}`);
  },

  /**
   * Crea un categoría.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/categorias', data);
  },

  /**
   * Actualiza la categoría indicada.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/categorias/${id}`, data);
  },

  /**
   * Eliminar la categoría indicada.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/categorias/${id}`);
  },

  /**
   * Obtiene los materiales de la categoria.
   * @param {int} id
   */
  materiales(id) {
    return api().get(`/api/categorias/${id}/materiales`);
  },
};
