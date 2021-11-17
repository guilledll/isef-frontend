<template>
  <div class="page-container">
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

    <GlobalInfoTable
      title="Reservas"
      svg="cube"
      :table="table"
      :open="open.table"
      :count="reservas.length"
      @click="showDetails()"
    >
      <tr v-for="reserva in reservas" :key="reserva.id">
        <td class="table-td text-green-500">
          {{ formatearFecha(reserva.inicio) }}
        </td>
        <td class="table-td text-red-500">
          {{ formatearFecha(reserva.fin) }}
        </td>
        <td class="table-td text-gray-500">
          {{ reserva.lugar }}
        </td>
        <td class="table-td text-gray-500">
          {{ reserva.deposito }}
        </td>
        <td class="table-td text-gray-500">
          {{ mostrarEstado(reserva.estado) }}
        </td>
      </tr>
    </GlobalInfoTable>

    <LazyModal v-if="open.modal">
      <FormUsuarioUpdate is-view @close="open.modal = !open.modal" />
    </LazyModal>

    <!--<LazyModal v-if="open.modal">
      <FormUsuarioRol is-view @close="open.modal = !open.modal" />
    </LazyModal> -->
  </div>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
export default {
  mixins: [FechaMixin],
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
        reservas: false,
        modal: false,
        table: false,
      },
      table: ['inicio', 'fin', 'lugar', 'depósito', 'estado'],
    };
  },
  computed: {
    usuario() {
      return this.$auth.user;
    },
    reservas() {
      return this.$store.state.reservas.reservas;
    },
  },
  methods: {
    seleccionarUsuario(action, user = null) {
      if (user) this.$store.dispatch('users/select', user);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    reservasUsuario(usuario) {
      return this.$store.dispatch('reservas/getAllReservasUsuario', usuario);
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
      if (!this.reservas.length) {
        await this.$store.dispatch(
          'reservas/getAllReservasUsuario',
          this.$route.params.ci
        );
      }
      this.open.table = !this.open.table;
    },
    edit() {
      this.open.modal = !this.open.modal;
    },
    mostrarEstado(estado) {
      switch (parseInt(estado)) {
        case 1:
          estado = 'Activa';
          break;
        case 2:
          estado = 'Aprobada';
          break;
        case 3:
          estado = 'Pendiente';
          break;
        case 4:
          estado = 'Finalizada';
          break;
        default:
          estado = 'Cancelada';
      }
      return estado;
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
