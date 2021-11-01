<template>
  <div>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-8 text-xl text-gray-800 font-1 sm:text-2xl">
          Movimiento nro. #{{ movimiento.id }}
        </h3>
        <div class="grid grid-cols-2 gap-3 text-left sm:gap-5">
          <div class="input-data">
            <GlobalSvg class="text-blue-500" svg="clock" />
            <div>
              <span>Fecha</span>
              <p>{{ movimiento.fecha }}</p>
            </div>
          </div>
          <div class="input-data">
            <GlobalSvg class="text-indigo-500" svg="cube" />
            <div>
              <span>Material</span>
              <p>{{ movimiento.material }}</p>
            </div>
          </div>
          <div class="input-data">
            <GlobalSvg class="text-purple-500" svg="archive" />
            <div>
              <span>Depósito</span>
              <p>{{ movimiento.deposito }}</p>
            </div>
          </div>
          <div class="input-data">
            <GlobalSvg class="text-green-500" svg="view-list" />
            <div>
              <span>Cantidad</span>
              <p>{{ movimiento.cantidad }}</p>
            </div>
          </div>
          <div class="input-data">
            <GlobalSvg class="text-yellow-500" svg="clipboard-list" />
            <div>
              <span>Acción</span>
              <p>{{ mostrarAccion(movimiento.accion) }}</p>
            </div>
          </div>
          <div class="input-data">
            <GlobalSvg class="text-red-500" svg="clipboard-list" />
            <div>
              <span>CI Encargado</span>
              <p>{{ movimiento.user_ci }}</p>
            </div>
          </div>
        </div>
        <div v-if="movimiento.nota" class="input-data mt-5">
          <GlobalSvg class="text-pink-500" svg="chat-alt" />
          <div>
            <span>Nota</span>
            <p>{{ movimiento.nota }}</p>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter :button="false" @close="$emit('close')" />
  </div>
</template>

<script>
export default {
  computed: {
    movimiento() {
      return this.$store.state.inventario.movimiento;
    },
  },
  methods: {
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

<style lang="postcss" scoped>
.input-data {
  @apply flex items-start gap-2;
  & > svg {
    @apply h-6 w-6 flex-shrink-0;
  }
  & > div {
    @apply space-y-1.5;
    & > span {
      @apply font-semibold text-gray-700 pb-[2px] border-b;
    }
  }
}
</style>
