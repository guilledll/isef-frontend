<template>
  <form @submit.prevent="iniciarReserva">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-8 sm:pb-4">
      <div class="modal-form-body !w-full !ml-0">
        <div class="text-center"></div>
        <h3 class="modal-form-heading font-1 !text-2xl !mt-0 !mb-2">
          Realizar reserva
        </h3>
        <p class="mb-3">
          Se creará una nueva reserva de materiales, por favor complete los
          campos a continuación.
        </p>
        <div class="space-y-3 mt-2">
          <div>
            <FormSelect
              id="departamento_id"
              v-model.trim="form.departamento_id"
              name="departamento_id"
              required
              label="Departamento"
              :sr="false"
              :error="hasError($v.form.departamento_id)"
              @input="fieldReset($v.form.departamento_id)"
              @blur="touch($v.form.departamento_id)"
              @change="selectCampo($event, 'departamento')"
            >
              <template #options>
                <option
                  v-for="dep in departamentos"
                  :key="dep.id"
                  :value="dep.id"
                >
                  {{ dep.nombre }}
                </option>
              </template>
              <template #error>
                <LazyFormError
                  v-if="hasError($v.form.departamento_id)"
                  :text="errorText($v.form.departamento_id)"
                />
              </template>
            </FormSelect>
          </div>
          <div>
            <FormSelect
              id="deposito_id"
              v-model.trim="form.deposito_id"
              name="deposito_id"
              required
              label="Lugar"
              :sr="false"
              :error="hasError($v.form.deposito_id)"
              @input="fieldReset($v.form.deposito_id)"
              @blur="touch($v.form.deposito_id)"
              @change="selectCampo($event, 'deposito')"
            >
              <template #options>
                <option value="0">Seleccionar lugar</option>
                <option v-for="dep in depositos" :key="dep.id" :value="dep.id">
                  {{ dep.nombre }}
                </option>
              </template>
              <template #error>
                <LazyFormError
                  v-if="hasError($v.form.deposito_id)"
                  :text="errorText($v.form.deposito_id)"
                />
              </template>
            </FormSelect>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <FormDatePicker
                v-model.trim="form.inicio"
                name="inicio"
                label="Fecha inicio"
                :sr="false"
                :disabled-date="desactivarAntesDeHoy_Y_MasDeUnaSemana"
                :error="hasError($v.form.inicio)"
                @input="setFechaIncio"
                @blur="touch($v.form.inicio)"
              >
                <LazyFormError
                  v-if="hasError($v.form.inicio)"
                  :text="errorText($v.form.inicio)"
                />
              </FormDatePicker>
            </div>
            <div>
              <FormDatePicker
                v-model.trim="form.fin"
                name="fin"
                label="Fecha finalización"
                :sr="false"
                :disabled-date="desactivarAntesDeHoy_Y_MasDeUnaSemana"
                :error="hasError($v.form.fin)"
                @input="setFechaFin"
                @blur="touch($v.form.fin)"
              >
                <LazyFormError
                  v-if="hasError($v.form.fin)"
                  :text="errorText($v.form.fin)"
                />
              </FormDatePicker>
            </div>
          </div>
        </div>
        <LazyGlobalAlert v-if="mas24Horas" color="yellow">
          Las reservas con duración mayor a 24hs deberán ser aprobadas por un
          administrador.
        </LazyGlobalAlert>
      </div>
    </div>
    <ModalFooter text="Continuar" type="add" @close="$emit('close')" />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { departamento, deposito } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { required, integer } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
  data() {
    return {
      form: {
        user_ci: null,
        departamento: '',
        departamento_id: 0,
        deposito: '',
        deposito_id: 0,
        validar: false,
        inicio: new Date(),
        fin: this.loadFechaFin(),
        materiales: [],
      },
    };
  },
  computed: {
    user() {
      return this.$auth.user;
    },
    departamentos() {
      return this.$store.getters['departamentos/conDepositos'];
    },
    depositos() {
      return this.$store.getters['depositos/deDepartamentoConMateriales'](
        this.form.departamento_id
      );
    },
    mas24Horas() {
      return (this.form.fin - this.form.inicio) / 36e5 >= 24;
    },
  },
  async mounted() {
    await this.$store.dispatch('departamentos/all');
    await this.$store.dispatch('depositos/all');
    this.cargaInicial();
  },
  methods: {
    async iniciarReserva() {
      if (this.invalid()) return;
      if (this.mas24Horas) this.form.validar = true;
      this.ajustarHoras();
      await this.$store.dispatch('reservas/iniciar', this.form);
      this.$emit('close');
    },
    selectCampo(value, campo) {
      this.form[campo] = value;
      if (campo == 'departamento') {
        this.form.deposito_id = 0;
        this.form.deposito = '';
      }
    },
    // Asigna el departamento al cargar por primera vez
    cargaInicial() {
      this.form.departamento_id = this.user.departamento_id;
      this.form.departamento = this.departamentos[0].nombre;
      this.form.user_ci = this.user.ci;
    },
    loadFechaFin() {
      return new Date(new Date().setHours(new Date().getHours() + 2));
    },
    desactivarAntesDeHoy_Y_MasDeUnaSemana(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        date < today || date > new Date(today.getTime() + 7 * 24 * 3600 * 1000)
      );
    },
    setFechaIncio(value) {
      this.form.inicio = value;
      this.fieldReset(this.$v.form.inicio);
    },
    setFechaFin(value) {
      this.form.fin = value;
      this.fieldReset(this.$v.form.fin);
    },
    ajustarHoras() {
      this.form.inicio.setHours(this.form.inicio.getHours() - 3);
      this.form.fin.setHours(this.form.fin.getHours() - 3);
    },
  },
  validations: {
    form: {
      departamento_id: {
        required,
        integer,
        departamento,
      },
      deposito_id: {
        required,
        integer,
        deposito,
      },
      inicio: {
        required,
      },
      fin: {
        required,
      },
    },
  },
};
</script>

<style lang="postcss" scoped></style>
