import api from '@/services/api.service';

export default {
  // Obtiene todos los departamentos
  async index() {
    return await api().get('/api/v1/departamentos');
  },
  async show(id) {
    return await api().get(`/api/v1/departamentos/${id}`);
  },
};
