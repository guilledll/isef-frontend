import api from '@/services/api.service';

export default {
  /**
   * Devuelve todas las reservas.
   */
  index() {
    return api().get('/api/v1/reservas');
  },
  /**
   * Devuelve los materiales disponibles.
   * @param {request} data
   */
  iniciar(data) {
    return api().post('/api/v1/reservas/iniciar', data);
  },
  /**
   * Crea una reserva.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/v1/reservas', data);
  },
  /**
   * Muestra la reserva indicada.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/v1/reservas/${id}`);
  },
  /**
   * Entregar materiales a un usuarios siendo guardia.
   * @param {int} data
   */
  entregar(id, data) {
    return api().post(`/api/v1/reservas/${id}/entregar`, data);
  },
};
