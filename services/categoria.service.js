import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos las categorías.
   */
  async index() {
    return await api().get('/api/v1/categorias');
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
};
