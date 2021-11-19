<template>
  <div>
    <!-- ESTA PAGINA NO DEBE SER ASI, LOS ADMINS NO PUEDEN ENTREGAR -->
    <!-- SOLO PUEDEN VER LAS RESERVAS, LO MEJOR SERIA QUE COMPARTAN LA VISTA CON LOS GUARDIAS -->
    <!-- <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div>
      <FormSelect
        id="deposito_id"
        v-model.trim="filtro.id"
        name="deposito_id"
        @change="filtrar"
      >
        <template #options>
          <option value="0">Seleccionar</option>
          <option
            v-for="(contenido, index) in contenidoFiltrado"
            :key="index"
            :value="contenido.id || contenido"
          >
            <span v-if="contenido.id"> {{ contenido.nombre }} </span>
            <span v-else> {{ mostrarEstado(contenido) }}</span>
          </option>
        </template>
      </FormSelect>
      <label for="deposito">Deposito</label>
      <input
        id="deposito"
        v-model="filtro.contenido"
        name="filtro"
        type="radio"
        value="deposito_id"
        @change="cambiarFiltro"
      />
      <label for="estado">Estado</label>
      <input
        id="estado"
        v-model="filtro.contenido"
        name="filtro"
        type="radio"
        value="estado"
        @change="cambiarFiltro"
      />
    </div>
    <div class="flex flex-col gap-3 lg:flex-row">
      <Table>
        <template #head>
          <TableHead :header="table.header" />
        </template>
        <template #body>
          <tr v-for="reserva in reservas" :key="reserva.id">
            <td class="table-td text-gray-500">
              <router-link
                :to="`/reservas/${reserva.id}`"
                class="text-black hover:text-blue-600 hover:underline"
                @click.native="seleccionarReserva('view', reserva)"
              >
                {{ reserva.user_ci }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              <router-link
                :to="`/categorias/${reserva.categoria_id}`"
                class="hover:text-blue-600 hover:underline"
                @click.native="verCategoria(reserva.categoria_id)"
              >
                {{ reserva.guardia_ci }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              <router-link
                :to="`/depositos/${reserva.deposito_id}`"
                class="hover:text-blue-600 hover:underline"
                @click.native="verDeposito(reserva.deposito_id)"
              >
                {{ reserva.deposito }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              {{ reserva.inicio }}
            </td>
            <td class="table-td text-gray-500">
              {{ reserva.fin }}
            </td>
            <td class="table-td" :class="`estado-${reserva.estado}`">
              {{ mostrarEstado(reserva.estado) }}
            </td>
            <td class="table-td text-right">
              <TableButton
                type="view"
                @click="$router.push(`/reservas/${reserva.id}`)"
              />
              <TableButton
                type="delete"
                @click="seleccionarReserva('del', reserva)"
              />
              <TableButton
                type="edit"
                @click="seleccionarReserva('mod', reserva)"
              />
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <LazyModal v-if="modal.show">
      <LazyFormMaterialEntregar
        v-if="modal.action == 'mod'"
        :id="reservaSeleccionada"
        @actualizado="updateFiltrados"
        @close="modal.show = !modal.show"
      />
      <LazyFormMaterialCreate
        v-else-if="modal.action == 'add'"
        @close="modal.show = !modal.show"
      />
      <LazyFormMaterialDelete
        v-else-if="modal.action == 'del'"
        @close="modal.show = !modal.show"
      />
    </LazyModal> -->
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      pageHeader: {
        reservas: [],
        title: 'Reservas',
        text: 'Reservas registradas en el sistema.',
      },
      table: {
        header: ['Ci', 'Guardia', 'Deposito', 'inicio', 'fin', 'estado'],
      },
      modal: {
        show: false,
        action: '',
      },
      reservas: [],
      contenidoFiltrado: [],
      filtro: { contenido: '', id: 1 },
      reservaSeleccionada: null,
    };
  },
  computed: {
    reservasAll() {
      return this.$store.state.reservas.reservas;
    },
    filtrados() {
      return this.$store.state.reservas.filtrados;
    },
    depositos() {
      return this.$store.getters['depositos/conReservas'];
    },
    estados() {
      return this.$store.getters['reservas/estadosConReserva'];
    },
  },
  async mounted() {
    await this.$store.dispatch('reservas/all');
    this.reservas = this.reservasAll;
    await this.$store.dispatch('depositos/all');
    await this.$store.dispatch('categorias/all');
  },
  methods: {
    seleccionarReserva(action, reserva = null) {
      if (reserva) this.reservaSeleccionada = reserva.id;
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    verDeposito(dep) {
      this.$store.dispatch('depositos/get', {
        id: dep,
      });
    },
    verCategoria(cat) {
      this.$store.dispatch('categorias/get', {
        id: cat,
      });
    },
    filtrar() {
      this.$store.dispatch('reservas/filtrar', {
        contenido: this.filtro.contenido,
        id: this.filtro.id,
      });
      this.reservas = this.filtrados;
    },
    cambiarFiltro() {
      if (this.filtro.contenido === 'deposito_id') {
        this.contenidoFiltrado = this.depositos;
      } else {
        this.contenidoFiltrado = this.estados;
      }
      this.filtro.id = 0; //Limpia select
      this.reservas = this.reservasAll;
    },
    updateFiltrados() {
      this.modal.show = false;
      this.reservas = this.reservasAll;
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
