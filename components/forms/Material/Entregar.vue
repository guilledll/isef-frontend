<template>
  <form @submit.prevent="entregarMaterial">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Entregar material</h3>
          <p class="mb-3">Entregar material a un alumno.</p>
          <div class="space-y-2">
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
            <div>
              <FormTextarea
                id="nota"
                v-model.trim="form.nota"
                name="nota"
                placeholder="Notas (opcional)"
                :required="false"
                :error="hasError($v.form.nota, 'nota')"
                @input="fieldReset($v.form.nota, 'nota')"
                @blur="touch($v.form.nota)"
              >
                <LazyFormError
                  v-if="hasError($v.form.nota, 'nota')"
                  :text="errorText($v.form.nota, 'nota')"
                />
              </FormTextarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter
      text="Entregar material"
      :disabled="disabled"
      @close="closeModal"
    />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin, FormValidationMixin],
  data() {
    return {
      form: {
        guardia_ci: this.$auth.user.ci,
        nota: '',
      },
      data: [
        {
          key: 'user',
          title: 'Usuario',
          color: 'blue',
          svg: 'user',
        },
        {
          key: 'deposito',
          title: 'Depósito',
          color: 'blue',
          svg: 'location-marker',
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
        {
          key: 'lugar',
          title: 'Lugar de uso',
          color: 'purple',
          svg: 'location-marker',
        },
        {
          key: 'razon',
          title: 'Razón de uso',
          color: 'purple',
          svg: 'info-circle',
        },
      ],
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    materiales() {
      return this.$store.state.reservas.materialesDisponibles;
    },
    disabled() {
      return Object.keys(updatedDiff(this.reserva, this.form)).length == 0;
    },
  },
  async mounted() {
    await this.$store.dispatch('reservas/getMateriales', this.reserva.id);
  },
  validations: {
    form: {
      nota: {
        maxLength: maxLength(255),
      },
    },
  },
  methods: {
    selectReserva(value) {
      this.form.reserva = value;
    },
    entregarReserva() {
      console.log(this.reserva);
      if (this.invalid()) return;
      this.$store
        .dispatch('reservas/updateEstado', this.form)
        .then(() => {
          this.$emit('actualizado');
          this.closeModal();
        })
        .catch((e) => (this.errors = e.response.data.errors));
    },
    // Devuelve el valor, si es accion la traduce
    datoReserva(key) {
      return key === 'accion'
        ? this.mostrarEstado(this.reserva[key])
        : this.reserva[key];
    },
    mostrarEstado(estado) {
      switch (parseInt(estado)) {
        case 1:
          estado = 'Pendiente';
          break;
        case 2:
          estado = 'Validada';
          break;
        case 3:
          estado = 'Activa';
          break;
        case 4:
          estado = 'Finalizada';
          break;
        default:
          estado = 'Cancelada';
      }
      return estado;
    },
    closeModal() {
      this.$store.dispatch('reservas/clear');
      this.$emit('close');
    },
  },
};
</script>
