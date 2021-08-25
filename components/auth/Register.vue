<template><div></div></template>

<script>
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
      validationMessages: {
        apellido: 'El apelldio es requerido',
        ci: 'La cédula es requerida',
        email: 'El correo es requerido',
        telefono: 'El telefono es requerido',
        direccion: 'La dirección es requerida',
      },
    }
  },
  validations: {
    ci: {
      valid: true,
      message: '',
    },
    nombre: {
      valid: true,
      message: '',
    },
    apellido: {
      valid: true,
      message: '',
    },
    email: {
      valid: true,
      message: '',
    },
    direccion: {
      valid: true,
      message: '',
    },
    telefono: {
      valid: true,
      message: '',
    },
    password_confirmation: {
      valid: true,
      message: '',
    },
    password: {
      valid: true,
      message: '',
    },
  },
  methods: {
    register() {},
    validateRegister() {
      // Validar nombre
      if (this.form.nombre == '') {
        this.validations.nombre.valid = false
        this.validations.nombre.message = 'El nombre es requerido'
      } else if (this.form.nombre.lenght > 50) {
        this.validations.nombre.valid = false
        this.validations.nombre.message = 'Máximo de 50 caracteres'
      } else {
        this.validations.nombre.valid = true
        this.validations.nombre.message = ''
      }
    },
  },
}
</script>
