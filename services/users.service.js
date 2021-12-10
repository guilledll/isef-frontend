import api from '@/services/api.service';

let rutaApi = `${process.env.NODE_ENV == 'production' ? '/api' : ''}`;

export default {
  /**
   * Devuelve todos los usuarios.
   */
  index() {
    return api().get('/users');
  },

  /**
   * Muestra el usuario indicado.
   * @param {int} ci
   */
  show(ci) {
    return api().get(`/users/${ci}`);
  },

  /**
   * Actualiza el usuario indicado.
   * @param {int} ci
   * @param {request} data
   */
  update(ci, data) {
    return api().put(`/users/${ci}`, data);
  },

  /**
   * Eliminar el usuario indicado.
   * @param {int} ci
   */
  delete(ci) {
    return api().delete(`/users/${ci}`);
  },
  /**
   * Actualiza el rol del usuario indicado.
   * @param {int} ci
   * @param {request} data
   */
  updateRol(ci, data) {
    return api().put(`/users/${ci}/rol`, data);
  },
  /**
   * Registro de nuevos usuarios
   * @param {form} data
   */
  register(data) {
    return api()
      .get(`${rutaApi}/sanctum/csrf-cookie`)
      .then(() => {
        return api().post(`${rutaApi}/register`, data);
      });
  },
  /**
   * Envia el correo de verificacion
   * @param {form} data
   */
  emailVerification(data) {
    return api().post('/email/verification-notification', data);
  },
};
