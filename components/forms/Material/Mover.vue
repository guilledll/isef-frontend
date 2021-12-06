<template>
  <form @submit.prevent="moverMateriales">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full space-y-4">
        <!-- Cabecera -->
        <div>
          <h3 class="mb-0 text-xl text-gray-800 font-1 sm:text-2xl">
            Mover material de depósito
          </h3>
          <h4 class="text-base font-1 text-gray-500 sm:text-xl">
            Trasladar {{ material.nombre }} {{ material.categoria }} a otro
            depósito.
          </h4>
          <hr class="w-full my-2" />
        </div>
        <GlobalAlert color="blue">
          Complete los campos para trasladar materiales de un depósito a otro.
        </GlobalAlert>
        <!-- Departamentos -->
        <FormSelect
          id="departamento_id"
          v-model.number="form.departamento_id"
          name="departamento_id"
          label="Departamento de destino"
          :error="hasError($v.form.departamento_id)"
          @input="fieldReset($v.form.departamento_id)"
          @blur="touch($v.form.departamento_id)"
          @change="selectCampo($event, 'departamento')"
        >
          <template #options>
            <option
              v-for="departamento in departamentos"
              :key="departamento.id"
              :value="departamento.id"
              :selected="form.departamento_id == departamento.id"
            >
              {{ departamento.nombre }}
            </option>
          </template>
          <template #error>
            <LazyFormError
              v-if="hasError($v.form.departamento_id)"
              :text="errorText($v.form.departamento_id)"
            />
          </template>
        </FormSelect>
        <!-- Depositos -->
        <div class="container">
          <FormSelect
            id="deposito_origen_id"
            v-model.number="form.deposito_origen_id"
            name="deposito_origen_id"
            label="Depósito actual"
            :disabled="true"
          >
            <template #options>
              <option :selected="true">
                {{ material.deposito }}
              </option>
            </template>
          </FormSelect>
          <div>
            <GlobalSvg svg="arrow-right" class="h-6 w-6 mb-2 text-gray-800" />
          </div>
          <FormSelect
            id="deposito_destino_id"
            v-model.number="form.deposito_destino_id"
            name="deposito_destino_id"
            label="Depósito de destino"
            :error="hasError($v.form.deposito_destino_id)"
            @input="fieldReset($v.form.deposito_destino_id)"
            @blur="touch($v.form.deposito_destino_id)"
            @change="selectCampo($event, 'deposito')"
          >
            <template #options>
              <option
                v-for="deposito in depositos"
                :key="deposito.id"
                :value="deposito.id"
                :selected="form.deposito_destino_id == deposito.id"
              >
                {{ deposito.nombre }}
              </option>
            </template>
            <template #error>
              <LazyFormError
                v-if="hasError($v.form.deposito_destino_id)"
                :text="errorText($v.form.deposito_destino_id)"
              />
            </template>
          </FormSelect>
        </div>
        <!-- Cantidad -->
        <div v-if="!mismosDepositos" class="container">
          <FormInput
            id="cantidad"
            v-model.number="cantidadInicial"
            name="cantidad"
            label="Cantidad en depósito"
            :disabled="true"
          />
          <FormCounter
            label="Total a mover"
            :zero="true"
            :max-cant="cantidadInicial"
            :cant="form.cantidad"
            @cambio="updateCantidad"
          />
        </div>
        <!-- Mostrar Cantidades -->
        <div v-if="!mismosDepositos" class="container">
          <div class="extend">
            <p class="form-label font-1">En {{ material.deposito }}</p>
            <GlobalAlert class="!mt-0" color="yellow" :has-svg="false">
              Cantidad restante:
              <b>
                {{ Math.abs(cantidadInicial - form.cantidad) }}
              </b>
            </GlobalAlert>
          </div>
          <div>
            <GlobalSvg svg="arrow-right" class="h-6 w-6 mb-2 text-gray-800" />
          </div>
          <div class="extend">
            <p class="form-label font-1">A {{ form.deposito }}</p>
            <GlobalAlert class="!mt-0" color="green" :has-svg="false">
              Recibe en total: <b>{{ form.cantidad }}</b>
            </GlobalAlert>
          </div>
        </div>
        <!-- Nota -->
        <LazyFormTextarea
          v-if="!mismosDepositos"
          id="nota"
          v-model.trim="form.nota"
          name="nota"
          placeholder="Notas (opcional)"
          label="Notas del movimiento"
          :required="false"
          :error="hasError($v.form.nota, 'nota')"
          @input="fieldReset($v.form.nota, 'nota')"
          @blur="touch($v.form.nota)"
        >
          <LazyFormError
            v-if="hasError($v.form.nota, 'nota')"
            :text="errorText($v.form.nota, 'nota')"
          />
        </LazyFormTextarea>
      </div>
    </div>
    <ModalFooter text="Confirmar" :disabled="disabled" @close="closeModal" />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
  props: {
    isView: { type: Boolean, default: false },
  },
  data() {
    return {
      form: {
        id: '',
        departamento: null,
        departamento_id: null,
        deposito_origen_id: '',
        deposito_destino_id: '',
        deposito: '',
        cantidad: 0,
        usuario_ci: this.$auth.user.ci,
        nota: '',
      },
      cantidadInicial: 0,
    };
  },
  computed: {
    material() {
      return this.$store.state.materiales.material;
    },
    departamentos() {
      return this.$store.getters['departamentos/conDepositos'];
    },
    depositos() {
      return this.$store.getters['depositos/deDepartamento'](
        this.form.departamento_id
      );
    },
    mismosDepositos() {
      return this.form.deposito_origen_id == this.form.deposito_destino_id;
    },
    disabled() {
      return (
        !this.form.departamento_id ||
        this.mismosDepositos ||
        this.form.cantidad == 0
      );
    },
  },
  async mounted() {
    await this.$store.dispatch('departamentos/all');
    await this.$store.dispatch('depositos/all');
    this.cargaInicial();
  },
  methods: {
    selectCampo(value, campo) {
      this.form[campo] = value;
      if (campo == 'departamento') {
        this.form.deposito_destino_id = this.depositos[0].id;
        this.form.deposito = this.depositos[0].nombre;
      }
    },
    updateCantidad(cantidad) {
      this.form.cantidad = cantidad;
    },
    moverMateriales() {
      if (this.invalid()) return;
      this.$store
        .dispatch('materiales/mover', this.form)
        .then(() => this.movidos())
        .catch((e) => (this.errors = e.response.data.errors));
    },
    cargaInicial() {
      this.form.id = this.material.id;
      this.form.departamento_id = this.departamentos[0].id;
      this.form.departamento = this.departamentos[0].nombre;
      this.form.deposito_origen_id = this.material.deposito_id;
      this.form.deposito_destino_id = this.depositos[0].id;
      this.form.deposito = this.depositos[0].nombre;
      this.cantidadInicial = this.material.cantidad;
    },
    movidos() {
      this.$router.push({ path: '/materiales', query: { add: true } });
      this.closeModal();
    },
    closeModal() {
      if (!this.isView) this.$store.dispatch('materiales/clear');
      this.$emit('close');
    },
  },
  validations: {
    form: {
      id: {
        required,
        integer,
      },
      departamento_id: {
        required,
        integer,
      },
      deposito_origen_id: {
        required,
        integer,
      },
      deposito_destino_id: {
        required,
        integer,
      },
      cantidad: {
        required,
        integer,
      },
      nota: {
        maxLength: maxLength(255),
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.container {
  @apply flex items-end justify-between gap-3;
}
.extend {
  @apply flex-grow text-left;
  ::v-deep .alert {
    @apply !text-center;
  }
}
</style>
