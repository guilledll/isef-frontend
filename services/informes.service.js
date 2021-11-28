import api from '@/services/api.service';

export default {
  /**
   * Devuelve todas los informes.
   */
  index() {
    return api().get('/materialesPerdidos');
  },
  /**
   * Crea una informe.
   * @param {request} data
   */
  create(data) {
    return api().post('/materialesPerdidos', data);
  },
  /**
   * Muestra el informe indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/materialesPerdidos/${id}`);
  },
};
