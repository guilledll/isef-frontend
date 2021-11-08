import api from '@/services/api.service';

export default {
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
};
