<template>
  <div></div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
  numeric,
  sameAs,
} from 'vuelidate/lib/validators'
import UsersSerivce from '@/services/users.service'
import SanctumSerivce from '~/services/sanctum.service'
export default {
  data() {
    return {
      form: {
        ci: '',
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        telefono: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  computed: {
    message() {
      // Verifica los mensajes dinamicamente
      if (this.v.$error) {
        for (let key in this.$options.messages) {
          if (this.v[key] === false) {
            return this.$options.messages[key](this.v)
          }
        }
      } else {
        return null
      }
    },
  },
  validations: {
    form: {
      ci: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(8),
      },
      nombre: {
        required,
        alpha,
        maxLength: maxLength(50),
      },
      apellido: {
        required,
        alpha,
        maxLength: maxLength(50),
      },
      email: {
        required,
        email,
        maxLength: maxLength(255),
      },
      direccion: {
        required,
        maxLength: maxLength(150),
      },
      telefono: {
        required,
        numeric: numeric,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(16),
      },
      password_confirmation: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(16),
        sameAs: sameAs('password'),
      },
    },
  },
  messages: {
    required: (v) => 'El campo es requerido',
    email: (v) => 'Ingrese un correo válido',
    alphaNum: (v) => 'Solo puede contener letras',
    minLength: (v) =>
      'Debe tener al menos ' + v.$params.minLength.min + ' caracteres',
    maxLength: (v) =>
      'Debe tener hasta ' + v.$params.minLength.min + ' caracteres',
    sameAs: (v) => 'Las contraseñas deben coincidir',
  },
  mounted() {
    this.register()
  },
  methods: {
    register() {
      SanctumSerivce.setCookie()
        .then((res) => {
          console.log(res)
        })
        .catch(() => {})
      UsersSerivce.index()
        .then((res) => {
          console.log(res)
        })
        .catch(() => {})
      // this.$axios
      //   .post('/register', this.form)
      //   .then(function (response) {
      //     this.$auth
      //       .loginWith('laravelSanctum', { data: this.form })
      //       .then(function () {
      //         // ... Handle success
      //       })
      //   })
      //   .catch(function (error) {
      //     // ... Handle failure and show validation messages
      //   })
    },
  },
}
</script>
