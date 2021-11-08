<template>
  <div>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-7 text-xl text-gray-800 font-1 sm:text-2xl">
          Movimiento nro. #{{ movimiento.id }}
        </h3>
        <div class="grid grid-cols-2 gap-3 text-left sm:gap-5">
          <GlobalInputData
            v-for="mov in data"
            :key="mov.key"
            :title="mov.title"
            :value="datoMovimiento(mov.key)"
            :color="mov.color"
            :svg="mov.svg"
          />
        </div>
        <LazyGlobalInputData
          v-if="movimiento.nota"
          class="mt-5"
          title="Nota"
          :value="movimiento.nota"
          color="gray"
          svg="chat-alt"
        />
      </div>
    </div>
    <ModalFooter :button="false" @close="$emit('close')" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          key: 'fecha',
          title: 'Fecha',
          color: 'blue',
          svg: 'clock',
        },
        {
          key: 'material',
          title: 'Material',
          color: 'indigo',
          svg: 'cube',
        },
        {
          key: 'deposito',
          title: 'Depósito',
          color: 'purple',
          svg: 'archive',
        },
        {
          key: 'cantidad',
          title: 'Cantidad',
          color: 'green',
          svg: 'view-list',
        },
        {
          key: 'accion',
          title: 'Acción',
          color: 'yellow',
          svg: 'clipboard-list',
        },
        {
          key: 'user_ci',
          title: 'CI Encargado',
          color: 'pink',
          svg: 'user',
        },
      ],
    };
  },
  computed: {
    movimiento() {
      return this.$store.state.inventario.movimiento;
    },
  },
  methods: {
    // Devuelve el valor, si es accion la traduce
    datoMovimiento(key) {
      return key === 'accion'
        ? this.mostrarAccion(this.movimiento[key])
        : this.movimiento[key];
    },
    mostrarAccion(accion) {
      switch (parseInt(accion)) {
        case 0:
          accion = 'Baja';
          break;
        case 1:
          accion = 'Alta';
      }
      return accion;
    },
  },
};
</script>
