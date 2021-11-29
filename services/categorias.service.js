import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos las categorías.
   */
  index() {
    return api().get('/categorias');
  },

  /**
   * Muestra la categoría indicada.
   * @param {int} id
   */
  show(id) {
    return api().get(`/categorias/${id}`);
  },

  /**
   * Crea un categoría.
   * @param {request} data
   */
  create(data) {
    return api().post('/categorias', data);
  },

  /**
   * Actualiza la categoría indicada.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/categorias/${id}`, data);
  },

  /**
   * Eliminar la categoría indicada.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/categorias/${id}`);
  },

  /**
   * Obtiene los materiales de la categoria.
   * @param {int} id
   */
  materiales(id) {
    return api().get(`/categorias/${id}/materiales`);
  },

  /**
   * Obtiene los materiales de la categoria.
   * @param {int} id
   */
  materiales(id) {
    return api().get(`/api/v1/categorias/${id}/materiales`);
  },
};
