<template>
  <form @submit.prevent="createInforme">
    <div>
      <div class="flex flex-col justify-between gap-3 lg:flex-row">
        <div class="flex-grow space-y-2 form-data">
          <div>
            <h3 class="text-2xl font-1 mt-1">Información sobre el material</h3>
            <hr class="w-full mb-4 mt-2" />
          </div>

          <div>
            <FormTextarea
              id="nota"
              v-model.trim="form.nota"
              name="nota"
              placeholder="Ingrese una nota describiendo cada uno de los materiales dañados."
              label="Notas:"
              :sr="false"
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
      <button class="btn green">Informar</button>
    </div>
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
  props: {},
  data() {
    return {
      form: {
        reportador_ci: this.$auth.user.ci,
        nota: '',
      },
      reservas: [],
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
  },
  validations: {
    form: {
      nota: {
        required,
        maxLength: maxLength(255),
      },
    },
  },
  methods: {
    createInforme() {
      if (this.invalid()) return;
      this.$store
        .dispatch('materialesPerdidos/create', this.form)
        .catch((e) => (this.errors = e.response.data.errors));
    },
  },
};
</script>

<style lang="postcss" scoped>
.form-data {
  @apply p-0 border-0 rounded-lg bg-white lg:bg-gray-50 lg:border lg:p-3;
}
.side-table {
  @apply w-full mt-5 sm:mt-0 lg:max-w-2xl;
}
</style>
