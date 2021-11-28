import api from '@/services/api.service';

export default {
  /**
   * Devuelve todas las reservas.
   */
  index() {
    return api().get('/api/reservas');
  },
  /**
   * Devuelve los materiales disponibles.
   * @param {request} data
   */
  iniciar(data) {
    return api().post('/api/reservas/iniciar', data);
  },
  /**
   * Crea una reserva.
   * @param {request} data
   */
  create(data) {
    return api().post('/api/reservas', data);
  },
  /**
   * Muestra la reserva indicada.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/reservas/${id}`);
  },
  /**
   * Entregar materiales a un usuarios siendo guardia.
   * @param {int} data
   */
  entregar(id, data) {
    return api().post(`/api/reservas/${id}/entregar`, data);
  },
  /**
   * Recibir materiales de un usuarios siendo guardia.
   * @param {int} data
   */
  recibir(id, data) {
    return api().post(`/api/reservas/${id}/recibir`, data);
  },
  /**
   * Muestra todas las reservas del usuario que se indique su ci en el parametro.
   * @param {int} data
   */
  getAllReservasUsuario(ci) {
    return api().get(`/api/reservas/usuario/${ci}`);
  },
};
