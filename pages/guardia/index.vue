<template>
  <div>
    <LazyGlobalAlert v-if="entregado.show" color="green" class="!mt-0 mb-4">
      La reserva nro #{{ entregado.id }} se marcó como {{ entregado.text }}.
    </LazyGlobalAlert>
    <LazyGlobalAlert
      v-if="aprobada"
      color="green"
      svg="check"
      class="!mt-0 mb-4"
    >
      La reserva fue aprobada con éxito.
    </LazyGlobalAlert>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <LazyGlobalSearch
      v-if="reservasAll.length"
      store="reservas"
      :title="searchTitle"
      :data="reservasFiltradas"
      :inputs="inputs"
      @filtrar="filtrar"
      @limpiar="limpiar"
      @cambiar="cambiarFiltro"
    />
    <Table v-if="reservasAll.length">
      <template #head>
        <TableHead :header="table" />
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
            <LazyTableButton v-if="reserva.perdidos" type="list" />
            <TableButton type="view" />
          </td>
        </tr>
      </template>
    </Table>
    <LazyGlobalSinDatos v-else model="reservas" />
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
        text: 'Reservas realizadas por los usuarios del sistema.',
      },
      table: ['Usuario', 'Deposito', 'inicio', 'fin', 'estado'],
      modal: {
        show: false,
        action: '',
      },
      entregado: {
        show: false,
        id: null,
        text: 'entregada',
      },
      aprobada: false,
      reservas: [],
      reservasFiltradas: [],
      inputs: [
        { value: 'deposito_id', text: 'Deposito' },
        { value: 'estado', text: 'Estado' },
      ],
      searchTitle: 'depósito',
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
    // Devuelve objectos con formato { id: x, nombre: xxxx}
    // Son los estados traducidos Ej: { id: 2, nombre: Aprobado}
    estados() {
      let estadosTraducidos = [];
      this.$store.getters['reservas/estadosConReserva'].forEach((estado) => {
        estadosTraducidos.push({
          id: estado,
          nombre: this.mostrarEstado(estado),
        });
      });
      return estadosTraducidos;
    },
  },
  beforeCreate() {
    this.$store.dispatch('reservas/clear');
  },
  async mounted() {
    await this.$store.dispatch('reservas/all');
    await this.$store.dispatch('depositos/all');
    this.cambiarFiltro('deposito_id');
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
        this.entregado.text = 'entregada';
        return;
      }
      let res = this.$route.query.res;
      if (res) {
        this.entregado.show = true;
        this.entregado.id = res;
        this.entregado.text = 'recibida';
        return;
      }
      if (this.$route.query.aprobada) {
        this.aprobada = true;
        return;
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
      this.reservas = this.filtrados;
    },
    limpiar() {
      this.reservas = this.reservasAll;
    },
    cambiarFiltro(dato) {
      this.reservasFiltradas =
        dato === 'deposito_id' ? this.depositos : this.estados;
      this.searchTitle = dato === 'deposito_id' ? 'depósito' : 'estado';
      this.limpiar();
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
