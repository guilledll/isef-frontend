import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los materiales.
   */
  index() {
    return api().get('/api/v1/materiales');
  },

  /**
   * Muestra el material indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/v1/materiales/${id}`);
  },

  /**
   * Crea un material.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/v1/materiales', data);
  },

  /**
   * Actualiza el material indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/v1/materiales/${id}`, data);
  },

  /**
   * Eliminar el material indicado.
   * @param {int} id
   */
  delete(id) {
    return api().delete(`/api/v1/materiales/${id}`);
  },
};
