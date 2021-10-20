import api from '@/services/api.service';

export default {
  /**
   * Devuelve todos los usuarios.
   */
  index() {
    return api().get('/api/v1/users');
  },

  /**
   * Muestra el usuario indicado.
   * @param {int} id
   */
  show(id) {
    return api().get(`/api/v1/users/${id}`);
  },

  /**
   * Actualiza el usuario indicado.
   * @param {int} id
   * @param {request} data
   */
  update(id, data) {
    return api().put(`/api/v1/users/${id}`, data);
  },

  /**
   * Eliminar el usuario indicado.
   * @param {int} ci
   */
  delete(ci) {
    return api().delete(`/api/v1/users/${ci}`);
  },
  /**
   * Actualiza el rol del usuario indicado.
   * @param {int} id
   * @param {request} data
   */
  updateRol(ci, data) {
    return api().put(`/api/v1/users/${ci}/rol`, data);
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
};
