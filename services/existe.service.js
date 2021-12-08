import api from '@/services/api.service';

export default {
  /**
   * Retorna si existe cada tipo de entidad
   */
  existen() {
    return api().get('/existen');
  },
};
