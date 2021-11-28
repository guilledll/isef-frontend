import api from '@/services/api.service';

export default {
  // Obtiene todos los departamentos
  async index() {
    return await api().get('/api/departamentos');
  },
  //Agrega departamento
  async store(data) {
    return await api().post('/api/departamentos', data);
  },
};
