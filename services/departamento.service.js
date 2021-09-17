import api from '@/services/api.service'

export default {
  // Obtiene todos los departamentos
  async index() {
    return await api().get('/api/v1/departamentos')
  },
  //Agrega departamento
  async store(data) {
    return await api().post('/api/v1/departamentos', data);
  },
}
