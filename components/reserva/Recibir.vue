<template>
  <div>
    <!-- TODAVIA NO FUNCIONA -->
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-7 text-xl text-gray-800 font-1 sm:text-2xl">
          Reserva nro. #{{ reserva.id }}
        </h3>
        <div>
          <FormTextarea
            id="nota_guardia"
            v-model.trim="form.nota_guardia"
            name="nota_guardia"
            placeholder="Notas (opcional)"
            label="Notas del movimiento"
            :sr="false"
            :error="hasError($v.form.nota_guardia)"
            @input="fieldReset($v.form.nota_guardia)"
            @blur="touch($v.form.nota_guardia)"
          >
            <LazyFormError
              v-if="hasError($v.form.nota_guardia)"
              :text="errorText($v.form.nota_guardia)"
            />
          </FormTextarea>
        </div>
      </div>
    </div>
    <ModalFooter
      type="add"
      text="Entregar materiales"
      @action="entregar"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
  data() {
    return {
      form: {
        guardia_ci: '',
        nota_guardia: '',
      },
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
  },
  methods: {
    entregar() {
      if (this.invalid()) return;
      this.$store
        .dispatch('reserva/entregar', { id: this.reserva.id, data: this.form })
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
  },
  validations: {
    form: {
      guardia_ci: {
        required,
      },
      nota_guardia: {
        required,
        maxLength: maxLength(500),
      },
    },
  },
};
</script>

<style lang="postcss" scoped></style>
