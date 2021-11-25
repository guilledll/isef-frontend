import api from '@/services/api.service';

export default {
  /**
   * Devuelve todas los informes.
   */
  index() {
    return api().get('/api/v1/materialesPerdidos');
  },
  /**
   * Crea una informe.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/v1/materialesPerdidos', data);
  },
  /**
   * Muestra el informe indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/v1/materialesPerdidos/${id}`);
  },
  /**
   * Actualiza el informe indicado.
   * @param {int} id
   * @param {data} data
   */
  update(id, data) {
    return api().put(`/api/v1/materialesPerdidos/${id}`, data);
  },
};
