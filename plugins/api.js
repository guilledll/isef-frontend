import UsersAPI from '@/api/user.js'

/**
 * Inyecta en todos los componentes la ruta de la API para
 * hacer llamdas de forma dinámica
 * @var {this.$api}
 */
export default function ({ $axios }, inject) {
  const api = {
    users: UsersAPI($axios),
  }

  inject('api', api)
}
