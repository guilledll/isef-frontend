import api from '@/services/api.service'

export default {
  // Genera la cookie de autenticación
  setCookie() {
    return api().get('/sanctum/csrf-cookie')
  },
  register(data) {
    return api().post('/register', data)
  },
}
