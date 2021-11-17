<template>
  <div class="page-container">
    <LazyGlobalAlert v-if="alerta.show" color="green" class="mb-5 !mt-0">
      La reserva se realizó con exito! {{ alerta.text }}
    </LazyGlobalAlert>
    <div class="mb-10">
      <div class="flex justify-between">
        <h3 class="text-2xl text-gray-900 font-1 md:text-4xl">
          {{ usuario.nombre }} {{ usuario.apellido }}
        </h3>
        <div>
          <button class="action-btn" @click="edit">
            <GlobalSvg class="h-6 w-6 md:h-6 md:w-6" svg="pencil" />
          </button>
        </div>
      </div>
      <hr class="mt-3" />
    </div>
    <div
      class="grid grid-cols-1 mb-5 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div class="flex items-center text-lg md:text-xl">
        <span class="flex items-center mr-1.5 font-semibold text-gray-800">
          <GlobalSvg
            class="h-6 w-6 mr-1 text-indigo-600"
            svg="identification"
          />
          Ci:
        </span>
        {{ usuario.ci }}
      </div>
      <div v-if="usuario.rol != 1" class="flex items-center text-lg md:text-xl">
        <span class="flex items-center mr-1.5 font-semibold text-gray-800">
          <GlobalSvg
            class="h-6 w-6 mr-1 text-purple-600"
            svg="clipboard-check"
          />
          Rol:
        </span>
        {{ mostrarRol(usuario.rol) }}
      </div>
      <div class="flex items-center text-lg md:text-xl">
        <span class="flex items-center mr-1.5 font-semibold text-gray-800">
          <GlobalSvg class="h-6 w-6 mr-1 text-blue-600" svg="phone" />
          Teléfono:
        </span>
        {{ usuario.telefono }}
      </div>
      <div class="flex items-center text-lg md:text-xl">
        <span class="flex items-center mr-1.5 font-semibold text-gray-800">
          <GlobalSvg
            class="h-6 w-6 mr-1 text-green-600"
            svg="location-marker"
          />
          Departamento:
        </span>
        <router-link
          class="hover:underline hover:text-green-600"
          :to="`/departamentos/${usuario.departamento_id}`"
        >
          {{ usuario.departamento }}
        </router-link>
      </div>
      <div class="flex items-center text-lg md:text-xl">
        <span class="flex items-center mr-1.5 font-semibold text-gray-800">
          <GlobalSvg class="h-6 w-6 mr-1 text-yellow-600" svg="mail" />
          Correo:
        </span>
        {{ usuario.correo }}
      </div>
    </div>
    <LazyModal v-if="open.modal">
      <FormUsuarioRol is-view @close="open.modal = !open.modal" />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  // Impide ver perfiles de otros usuarios
  middleware({ route, store, redirect }) {
    if (store.$auth.user.ci != route.params.ci) {
      return redirect('/inicio');
    }
  },
  data() {
    return {
      open: {
        modal: false,
        table: false,
      },
      alerta: {
        show: false,
        text: '',
      },
    };
  },
  computed: {
    usuario() {
      return this.$auth.user;
    },
  },
  mounted() {
    // Si se realizo una reserva, muestra la alerta
    let res = this.$route.query.res;
    if (res) {
      if (res == 'true') {
        this.alerta.text = 'Te avisaremos cuando la reserva sea aprobada.';
      }
      this.alerta.show = true;
    }
  },
  methods: {
    seleccionarUsuario(action, user = null) {
      if (user) this.$store.dispatch('users/select', user);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    mostrarRol(rol) {
      switch (parseInt(rol)) {
        case 1:
          rol = 'Usuario';
          break;
        case 2:
          rol = 'Guardia';
          break;
        case 3:
          rol = 'Administrador';
          break;
        default:
          rol = 'Sin asignar';
      }
      return rol;
    },
    async showDetails() {
      if (!this.materiales.length) {
        await this.$store.dispatch('depositos/materiales', this.deposito.id);
      }
      this.open.table = !this.open.table;
    },
    edit() {
      this.open.modal = !this.open.modal;
    },
  },
};
</script>

<style lang="postcss" scoped>
.rol-0 {
  @apply text-red-500;
}
.rol-1 {
  @apply text-gray-500;
}
.rol-2 {
  @apply text-indigo-500;
}
.rol-3 {
  @apply text-green-500;
}
</style>
