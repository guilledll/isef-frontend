import api from '@/services/api.service'

export default {
  // Obtiene todos los depositos
  async index() {
    return await api().get('/api/v1/depositos')
  },
  async create(data) {
    return await api().post('/api/v1/depositos', data)
  },
  /**
 * Actualiza el depósito indicado.
 * @param {int} id
 * @param {request} data
 */
  async update(id, data) {
    return await api().put(`/api/v1/depositos/${id}`, data);
  }

}
