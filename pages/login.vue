<template>
  <div
    class="
      min-h-screen
      flex flex-col
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center space-y-2">
        <h2 class="text-4xl font-extrabold text-gray-900">ISEF</h2>
        <p class="text-gray-500 text-xl">Gestión de materiales y reservas</p>
      </div>
      <form class="mt-8 space-y-4" @submit.prevent>
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-2">
          <div>
            <label for="ci" class="sr-only">Correo o CI</label>
            <input
              id="ci"
              v-model="user.ci"
              name="ci"
              type="text"
              autocomplete="on"
              required
              class="input-text"
              placeholder="Correo o CI"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <input
              id="password"
              v-model="user.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="input-text"
              placeholder="Contraseña"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="checkbox">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="check"
            />
            <label for="remember-me" class="text"> Recuerdame </label>
          </div>
          <div class="text-sm">
            <a
              href="#"
              class="
                text-base
                font-medium
                text-indigo-600
                hover:text-indigo-500
              "
            >
              Recuperar contraseña
            </a>
          </div>
        </div>
        <div>
          <button type="submit" class="btn-indigo" @click="login">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
    <router-link
      to="/registro"
      class="
        text-center
        font-medium
        text-indigo-600
        hover:text-indigo-500
        mt-6
        hover:underline
      "
    >
      ¿No tiene cuenta? Regístrate!
    </router-link>
  </div>
</template>

<script>
import AuthService from '~/services/auth.service'
export default {
  data() {
    return {
      user: {
        ci: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      AuthService.setCookie().then(() => {
        this.$auth
          .loginWith('laravelSanctum', { data: this.user })
          .then((res) => {
            console.log(res, this.$auth.user)
          })
          .catch((e) => {
            console.log(e, this.$auth)
          })
      })
    },
  },
}
</script>
