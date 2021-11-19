<template>
  <div>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-7 text-xl text-gray-800 font-1 sm:text-2xl">
          Informe nro. #{{ informe.id }}
        </h3>
        <div class="grid grid-cols-2 gap-3 text-left sm:gap-5">
          <GlobalInputData
            v-for="inf in data"
            :key="inf.key"
            :title="inf.title"
            :value="datoInforme(inf.key)"
            :color="inf.color"
            :svg="inf.svg"
          />
        </div>
        <LazyGlobalInputData
          v-if="informe.nota"
          class="mt-5"
          title="Nota"
          :value="informe.nota"
          color="gray"
          svg="chat-alt"
        />
      </div>
    </div>
    <ModalFooter :button="false" @close="$emit('close')" />
  </div>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
export default {
  mixins: [FechaMixin],
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
          key: 'reportador_ci',
          title: 'Ci Reportador',
          color: 'purple',
          svg: 'archive',
        },
      ],
    };
  },
  computed: {
    informe() {
      return this.$store.state.informes.informe;
    },
  },
  methods: {
    // Devuelve el valor, si es fecha la traduce
    datoInforme(key) {
      return key === 'fecha'
        ? this.formatearFecha(this.informe[key])
        : this.informe[key];
    },
  },
};
</script>
