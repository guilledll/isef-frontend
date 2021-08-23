export default ($axios) => ({
  // Devuelve todos los usuarios
  async index(params) {
    return await $axios.get('/users', {
      params: params,
    })
  },
})
