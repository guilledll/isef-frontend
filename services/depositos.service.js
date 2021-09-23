import api from '@/services/api.service'

export default {
  // Obtiene todos los depositos
  async index() {
    return await api().get('/api/v1/depositos')
  },
}
