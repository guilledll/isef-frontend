import api from '@/services/api.service';

/**
 * API Sanctum para obtener cookies
 * @returns Cookie
 */
function setCookie() {
  return api().get('/sanctum/csrf-cookie');
}

export default {
  async register(data) {
    await setCookie();
    return api().post('/register', data);
  },
};
