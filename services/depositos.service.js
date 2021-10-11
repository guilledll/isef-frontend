import api from '@/services/api.service';

export default { 
  /**
   * Devuelve todos los depósitos.
   */
  async index() {
    return await api().get('/api/v1/depositos');
  },
  /**
   * Muestra el depósito indicado.
   * @param {int} id
   */
  async show(id) {
    return await api().get(`/api/v1/depositos/${id}`);
  },
  /**
   * Crea un depósito.
   * @param {request} data
   */
  async create(data) {
    return await api().post('/api/v1/depositos', data);
  },
  /**
   * Actualiza el depósito indicado.
   * @param {int} id
   * @param {request} data
   */
  async update(id, data) {
    return await api().put(`/api/v1/depositos/${id}`, data);
  },
  /**
   * Eliminar el depósito indicado.
   * @param {int} id
   */
  async delete(id) {
    return await api().delete(`/api/v1/depositos/${id}`);
  },
};
