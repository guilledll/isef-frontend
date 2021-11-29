import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los depósitos.
   */
  index() {
    return api().get('/depositos');
  },

  /**
   * Muestra el depósito indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/depositos/${id}`);
  },

  /**
   * Crea un depósito.
   * @param {request} data
   */
  create(data) {
    return api().post('/depositos', data);
  },

  /**
   * Actualiza el depósito indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/depositos/${id}`, data);
  },

  /**
   * Eliminar el depósito indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/depositos/${id}`);
  },

  /**
   * Obtiene los materiales del deposito.
   * @param {int} id
   */
  materiales(id) {
    return api().get(`/depositos/${id}/materiales`);
  },

};
