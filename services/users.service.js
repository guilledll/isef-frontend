import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los usuarios.
   */
  index() {
    return api().get('/api/users');
  },

  /**
   * Muestra el usuario indicado.
   * @param {int} ci
   */
  show(ci) {
    return api().get(`/api/users/${ci}`);
  },

  /**
   * Actualiza el usuario indicado.
   * @param {int} ci
   * @param {request} data
   */
  update(ci, data) {
    return api().put(`/api/users/${ci}`, data);
  },

  /**
   * Eliminar el usuario indicado.
   * @param {int} ci
   */
  delete(ci) {
    return api().delete(`/api/users/${ci}`);
  },
  /**
   * Actualiza el rol del usuario indicado.
   * @param {int} ci
   * @param {request} data
   */
  updateRol(ci, data) {
    return api().put(`/api/users/${ci}/rol`, data);
  },

  /**
   * Registro de nuevos usuarios
   * @param {form} data
   */
  register(data) {
    return api()
      .get('/sanctum/csrf-cookie')
      .then(() => {
        return api().post('/register', data);
      });
  },

  emailVerification(data) {
    return api().post('/email/verification-notification', data);
  },
};
