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
        <p class="text-gray-500 text-xl">
          Regístarte para reservar el uso de materiales en las sedes de ISEF.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent>
        <div class="space-y-2">
          <!-- CEDULA -->
          <div>
            <input
              id="ci"
              v-model="form.ci"
              name="ci"
              type="text"
              required
              pattern="[0-9]{8}"
              class="input-text"
              placeholder="Cédula (sin guión)"
            />
          </div>
          <!-- NOMBRE -->
          <div>
            <input
              id="nombre"
              v-model="form.nombre"
              name="nombre"
              type="text"
              required
              class="input-text"
              placeholder="Nombre"
            />
          </div>
          <!-- APELLIDO -->
          <div>
            <input
              id="apellido"
              v-model="form.apellido"
              name="apellido"
              type="text"
              required
              class="input-text"
              placeholder="Apellido"
            />
          </div>
          <!-- CORREO -->
          <div>
            <input
              id="correo"
              v-model="form.correo"
              name="correo"
              type="email"
              autocomplete="email"
              required
              class="input-text"
              placeholder="Correo"
            />
          </div>
          <!-- TELEFONO -->
          <div>
            <input
              id="telefono"
              v-model="form.telefono"
              name="telefono"
              type="tel"
              pattern="[0-9]{9}"
              required
              class="input-text"
              placeholder="Teléfono de contacto"
            />
          </div>
          <!-- CONTRASEÑA -->
          <div>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="input-text"
              placeholder="Contraseña"
            />
          </div>
          <!-- REPETIR CONTRASEÑA -->
          <div>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              name="password_confirmation"
              type="password"
              required
              class="input-text"
              placeholder="Repetir contraseña"
            />
          </div>
          <!-- SEDE -->
          <div>
            <select
              id="sede"
              v-model="form.departamento"
              name="sede"
              required
              class="input-text bg-white h-11 text-gray-900"
              placeholder=""
            >
              <option value="0">Sede a que perteneces</option>
              <option v-for="(sede, i) in sedes" :key="i" :value="sede.id">
                {{ sede.nombre }}
              </option>
            </select>
          </div>
          <div v-if="form.sede" class="alert blue">Sede es donde estudias</div>
        </div>
        <div>
          <button type="submit" class="btn-indigo" @click="registro">
            Registrarme
          </button>
        </div>
      </form>
    </div>
    <router-link
      to="/login"
      class="
        text-center
        font-medium
        text-indigo-600
        hover:text-indigo-500
        mt-6
        hover:underline
      "
    >
      ¿Ya tiene una cuenta? Inicia sesión!
    </router-link>
  </div>
</template>

<script>
import DepartamentoService from '@/services/departamento.service'
import AuthService from '~/services/auth.service'
export default {
  layout: 'App',
  data() {
    return {
      form: {
        ci: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        password: '',
        password_confirmation: '',
        departamento: 0,
      },
      sedes: {},
    }
  },
  mounted() {
    DepartamentoService.index().then((res) => {
      this.sedes = res.data.data
    })
  },
  methods: {
    registro() {
      AuthService.setCookie().then(() => {
        AuthService.register(this.form).then((res) => {
          console.log(res)
          let login = { correo: this.form.correo, password: this.form.password }
          this.$auth.loginWith('laravelSanctum', { data: login })
        })
      })
    },
  },
}
</script>
