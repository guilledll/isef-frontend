import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos las categorías.
   */
  async index() {
    return await api().get('/api/v1/categorias');
  },
  /**
   * Muestra la categoría indicada.
   * @param {int} id
   */
  async show(id) {
    return await api().get(`/api/v1/categorias/${id}`);
  },
  /**
   * Crea un categoría.
   * @param {request} data
   */
  async create(data) {
    return await api().post('/api/v1/categorias', data);
  },
  /**
   * Actualiza la categoría indicada.
   * @param {int} id
   * @param {request} data
   */
  async update(id, data) {
    return await api().put(`/api/v1/categorias/${id}`, data);
  },
  /**
   * Eliminar la categoría indicada.
   * @param {int} id
   */
  async delete(id) {
    return await api().delete(`/api/v1/categorias/${id}`);
  },
};
