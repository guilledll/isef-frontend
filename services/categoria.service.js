import api from '@/services/api.service'

export default {
  async index() {
    return await api().get('/api/v1/categorias')
  },
}
