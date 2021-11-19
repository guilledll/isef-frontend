<template>
  <div>
    <LazyGlobalAlert v-if="entregado.show" color="green" class="my-4">
      La reserva nro #{{ entregado.id }} se marcó como entregada.
    </LazyGlobalAlert>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div class="mb-4">
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
    <Table>
      <template #head>
        <TableHead :header="table.header" />
      </template>
      <template #body>
        <tr
          v-for="reserva in reservas"
          :key="reserva.id"
          class="cursor-pointer"
          @click="$router.push(`/reservas/${reserva.id}`)"
        >
          <td class="table-td text-gray-800">
            {{ reserva.user }}
          </td>
          <td class="table-td text-gray-500">
            {{ reserva.deposito }}
          </td>
          <td class="table-td text-gray-500">
            {{ formatearFecha(reserva.inicio) }}
          </td>
          <td class="table-td text-gray-500">
            {{ formatearFecha(reserva.fin) }}
          </td>
          <td class="table-td" :class="`estado-${reserva.estado}`">
            {{ mostrarEstado(reserva.estado) }}
          </td>
          <td class="table-td text-right">
            <TableButton type="view" />
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
export default {
  mixins: [FechaMixin],
  layout: 'AppLayout',
  middleware: 'adminOguardia',
  data() {
    return {
      pageHeader: {
        title: 'Reservas',
        text: 'Reservas registradas en el sistema.',
      },
      table: {
        header: ['Usuario', 'Deposito', 'inicio', 'fin', 'estado'],
      },
      modal: {
        show: false,
        action: '',
      },
      entregado: {
        show: false,
        id: null,
      },
      reservas: [],
      contenidoFiltrado: [],
      filtro: { contenido: '', id: 1 },
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
    this.verificaEntregado();
  },
  methods: {
    seleccionarReserva(action, reserva = null) {
      if (reserva) this.$store.dispatch('reservas/select', reserva);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    verificaEntregado() {
      let ent = this.$route.query.ent;
      if (ent) {
        this.entregado.show = true;
        this.entregado.id = ent;
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
      this.filtro.id = 0;
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
