import api from '@/services/api.service'

export default {
  // Genera la cookie de autenticación
  setCookie() {
    return api().get('/sanctum/csrf-cookie')
  },
}
