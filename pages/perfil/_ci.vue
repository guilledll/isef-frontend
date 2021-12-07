<template>
  <div class="page-container">
    <LazyGlobalAlert v-if="alerta.show" color="green" class="mb-6 !mt-0">
      La reserva se realizó con exito! {{ alerta.text }}
    </LazyGlobalAlert>
    <div v-if="usuario" class="space-y-5 mb-5 md:mb-6 md:space-y-8">
      <div>
        <div class="flex justify-between">
          <h3 class="text-2xl text-gray-900 font-1 md:text-4xl">
            {{ usuario.nombre }} {{ usuario.apellido }}
          </h3>
          <div class="space-x-2">
            <button class="optional-btn" @click="accion">
              <GlobalSvg class="h-5 w-5 md:h-6 md:w-6" svg="pencil" />
            </button>
            <button v-if="soyYo" class="optional-btn red" @click="logout">
              <GlobalSvg class="h-5 w-5 md:h-6 md:w-6" svg="logout" />
            </button>
          </div>
        </div>
        <hr class="mt-1 sm:mt-3" />
      </div>
      <div
        class="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <GlobalTextData
          v-for="d in data"
          :key="d.key"
          :title="d.title"
          :text="mostrarDato(d.key)"
          :color="d.color"
          :svg="d.svg"
          :link="d.link"
        />
      </div>
    </div>
    <LazyGlobalInfoTable
      v-if="usuario && usuario.rol != 2"
      title="Reservas"
      svg="clipboard-list"
      :table="table"
      :action="true"
      :open="open.table"
      :count="reservas.length"
      @click="showDetails()"
    >
      <tr v-for="reserva in reservas" :key="reserva.id">
        <td class="table-td text-gray-500">
          {{ formatearFecha(reserva.inicio) }}
        </td>
        <td class="table-td text-gray-500">
          {{ formatearFecha(reserva.fin) }}
        </td>
        <td class="table-td text-gray-500">
          {{ reserva.lugar }}
        </td>
        <td class="table-td text-gray-500">
          {{ reserva.deposito }}
        </td>
        <td class="table-td" :class="`estado-${reserva.estado}`">
          {{ mostrarEstado(reserva.estado) }}
        </td>
        <td class="table-td text-right">
          <LazyTableButton
            v-if="!reservaTerminada(reserva)"
            type="delete"
            @click="cancelarReserva(reserva)"
          />
        </td>
      </tr>
    </LazyGlobalInfoTable>
    <LazyModal v-if="modal.show">
      <!--<FormUsuarioUpdate
        v-if="modal.action == 'edit'"
        is-view
        @close="modal.show = !modal.show"
      /> -->
      <FormUsuarioUpdate
        v-if="modal.action == 'edit'"
        is-view
        @close="modal.show = !modal.show"
      />
      <LazyFormReservaCancelar
        v-if="modal.action == 'cancel'"
        @close="modal.show = !modal.show"
      />
      <LazyFormUsuarioRol
        v-if="modal.action == 'rol'"
        is-view
        @close="modal.show = !modal.show"
      />
    </LazyModal>
  </div>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
export default {
  mixins: [FechaMixin],
  layout: 'AppLayout',
  middleware({ route, store, redirect }) {
    // Impide ver perfiles de otros usuarios si no es admin
    let user = store.$auth.user;
    if (user.ci != route.params.ci) {
      if (user.rol !== 3) {
        return redirect('/inicio');
      }
    }
  },
  data() {
    return {
      modal: {
        show: false,
        action: '',
      },
      open: {
        //Despliega resevas
        modal: false,
        table: false,
        reservas: false,
      },
      alerta: {
        show: false,
        text: '',
      },
      table: ['inicio', 'fin', 'lugar', 'depósito', 'estado'],
    };
  },
  computed: {
    usuario() {
      return this.$store.state.users.user;
    },
    reservas() {
      return this.$store.state.reservas.reservas;
    },
    soyYo() {
      return this.$auth.user.ci == this.$route.params.ci;
    },
    data() {
      return [
        {
          title: 'CI:',
          key: 'ci',
          svg: 'identification',
          color: 'indigo',
        },
        {
          title: 'Eres:',
          key: 'rol',
          svg: 'clipboard-check',
          color: 'purple',
        },
        {
          title: 'Teléfono:',
          key: 'telefono',
          svg: 'phone',
          color: 'blue',
        },
        {
          title: 'Departamento:',
          key: 'departamento',
          svg: 'location-marker',
          color: 'green',
          link: `/departamentos/${this.usuario.departamento_id}`,
        },
        {
          title: 'Correo:',
          key: 'correo',
          svg: 'mail',
          color: 'yellow',
        },
      ];
    },
  },
  async mounted() {
    this.soyYo
      ? await this.$store.dispatch('users/select', this.$auth.user)
      : await this.$store.dispatch('users/get', this.$route.params.ci);

    this.$store.dispatch('reservas/clearAll');

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
    async showDetails() {
      if (!this.reservas.length) {
        await this.$store.dispatch(
          'reservas/getAllReservasUsuario',
          this.$route.params.ci
        );
      }
      this.open.table = !this.open.table;
    },
    accion() {
      this.soyYo ? this.edit() : this.rol();
    },
    edit() {
      this.modal.action = 'edit';
      this.modal.show = !this.modal.show;
    },
    rol() {
      this.modal.action = 'rol';
      this.modal.show = !this.modal.show;
    },
    cancelarReserva(res) {
      this.$store.dispatch('reservas/select', res);
      this.modal.action = 'cancel';
      this.modal.show = !this.modal.show;
    },
    logout() {
      this.$auth.logout();
    },
    mostrarDato(key) {
      return key == 'rol'
        ? this.mostrarRol(this.usuario[key])
        : this.usuario[key];
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
    reservaTerminada(reserva) {
      return reserva.estado == 4 || reserva.estado == 5 || reserva.estado == 1;
    },
  },
};
</script>
