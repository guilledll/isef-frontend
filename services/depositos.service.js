import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los depósitos.
   */
  index() {
    return api().get('/api/v1/depositos');
  },

  /**
   * Muestra el depósito indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/v1/depositos/${id}`);
  },

  /**
   * Crea un depósito.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/v1/depositos', data);
  },

  /**
   * Actualiza el depósito indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/v1/depositos/${id}`, data);
  },

  /**
   * Eliminar el depósito indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/v1/depositos/${id}`);
  },
};
