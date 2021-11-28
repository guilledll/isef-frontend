<template>
  <form @submit.prevent="confirmarReserva">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-5 text-xl text-gray-800 font-1 sm:text-2xl">
          Confirmar Reserva
        </h3>
        <div class="mb-5 grid grid-cols-2 gap-3 text-left sm:gap-5">
          <GlobalInputData
            v-for="res in data"
            :key="res.key"
            :title="res.title"
            :value="datoReserva(res.key)"
            :color="res.color"
            :svg="res.svg"
          />
        </div>
        <Table>
          <template #head>
            <TableHead :header="['Materiales', 'Cantidad']" :action="false" />
          </template>
          <template #body>
            <tr v-for="material in reserva.materiales" :key="material.id">
              <td class="table-td">{{ material.nombre }}</td>
              <td class="table-td">{{ material.cantidad }}</td>
            </tr>
          </template>
        </Table>
        <div class="flex flex-col mt-3">
          <FormTextarea
            id="lugar"
            v-model.trim="form.lugar"
            name="lugar"
            placeholder="Donde usará los materiales?"
            label="Lugar de uso"
            rows="2"
            :sr="false"
            :error="hasError($v.form.lugar, 'lugar')"
            @input="fieldReset($v.form.lugar, 'lugar')"
            @blur="touch($v.form.lugar)"
          >
            <LazyFormError
              v-if="hasError($v.form.lugar, 'lugar')"
              :text="errorText($v.form.lugar, 'lugar')"
            />
          </FormTextarea>
          <FormTextarea
            id="razon"
            v-model.trim="form.razon"
            name="razon"
            placeholder="Para que utilizará los materiales?"
            label="Razón de uso"
            rows="2"
            :sr="false"
            :error="hasError($v.form.razon, 'razon')"
            @input="fieldReset($v.form.razon, 'razon')"
            @blur="touch($v.form.razon)"
          >
            <LazyFormError
              v-if="hasError($v.form.razon, 'razon')"
              :text="errorText($v.form.razon, 'razon')"
            />
          </FormTextarea>
          <FormTextarea
            id="notas"
            v-model.trim="form.notas"
            name="notas"
            placeholder="Notas (opcional)"
            label="Notas adicionales"
            rows="2"
            :required="false"
            :sr="false"
            :error="hasError($v.form.notas, 'notas')"
            @input="fieldReset($v.form.notas, 'notas')"
            @blur="touch($v.form.notas)"
          >
            <LazyFormError
              v-if="hasError($v.form.notas, 'notas')"
              :text="errorText($v.form.notas, 'notas')"
            />
          </FormTextarea>
        </div>
        <LazyGlobalAlert v-if="reserva.validar" color="yellow">
          Luego de confirmar, un administrador deberá aprobar esta reserva.
        </LazyGlobalAlert>
      </div>
    </div>
    <ModalFooter text="Confirmar Reserva" type="add" @close="$emit('close')" />
  </form>
</template>

<script>
// import FechaMixin from '@/mixins/FechaMixin';
export default {
  data() {
    return {
      form: {
        razon: '',
        lugar: '',
        notas: '',
      },
      data: [
        {
          key: 'deposito',
          title: 'Depósito',
          color: 'blue',
          svg: 'location-marker',
        },
        {
          key: 'departamento',
          title: 'Departamento',
          color: 'purple',
          svg: 'map',
        },
        {
          key: 'inicio',
          title: 'Inicia',
          color: 'green',
          svg: 'clock',
        },
        {
          key: 'fin',
          title: 'Finaliza',
          color: 'red',
          svg: 'clock',
        },
      ],
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
  },
  methods: {
    confirmarReserva() {
      if (this.invalid()) return;

      // this.$store
      //   .dispatch('reservas/confirmarReserva', this.form)
      //   .then(() => {
      //     this.$emit('close');
      //     this.$store.dispatch('reservas/clear');
      //     let query = this.form.validar ? 'true' : 'false';
      //     this.$router.push({
      //       path: `/perfil/${this.reserva.user_ci}`,
      //       query: { res: query },
      //     });
      //   })
    },
    // Devuelve el valor, si es fecha la traduce
    datoReserva(key) {
      return key === 'inicio' || key === 'fin'
        ? this.formatearFecha(this.reserva[key])
        : this.reserva[key];
    },
  },
};
</script>

<style lang="postcss" scoped>
::v-deep .form-label {
  @apply text-gray-700 !important;
}
</style>
