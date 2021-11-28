import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los depósitos.
   */
  index() {
    return api().get('/api/depositos');
  },

  /**
   * Muestra el depósito indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/depositos/${id}`);
  },

  /**
   * Crea un depósito.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/depositos', data);
  },

  /**
   * Actualiza el depósito indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/depositos/${id}`, data);
  },

  /**
   * Eliminar el depósito indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/depositos/${id}`);
  },

  /**
   * Obtiene los materiales del deposito.
   * @param {int} id
   */
  materiales(id) {
    return api().get(`/api/depositos/${id}/materiales`);
  },
};
