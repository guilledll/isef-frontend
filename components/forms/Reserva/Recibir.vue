<template>
  <div>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full !text-left">
        <h3 class="mb-4 text-xl text-gray-800 font-1 sm:text-2xl">
          Reserva nro. #{{ reserva.id }}
        </h3>
        <div class="space-y-2">
          <p>
            Confirmar que <b>{{ reserva.user }}</b> devolvió los materiales
            prestados por ISEF.
          </p>
          <GlobalAlert color="blue" svg="chat-alt">
            Puede dejar <b>notas adicionales</b> de ser necesario.
          </GlobalAlert>
          <div>
            <FormTextarea
              id="nota_guardia"
              v-model.trim="form.nota_guardia"
              name="nota_guardia"
              placeholder="Escriba aqui... (opcional)"
              label="Notas adicionales"
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
          <div class="problema-input">
            <div class="checkbox">
              <input
                id="problema"
                v-model="form.problema"
                name="problema"
                type="checkbox"
                class="check"
                @change="$v.form.$reset()"
              />
              <label for="problema" class="text">
                Hay problemas con los materiales
              </label>
            </div>
          </div>
        </div>
        <div v-if="form.problema" class="problema">
          <p class="font-1 mb-2 text-lg">¿Qué ocurrió con los materiales?</p>
          <div class="checkbox mt-1">
            <input
              id="perdidos"
              v-model="form.perdidos"
              name="perdidos"
              type="checkbox"
              class="check"
              @change="hayPerdidos"
            />
            <label for="perdidos" class="text">
              Algunos materiales se perdieron / dañaron
            </label>
          </div>
          <div v-if="form.perdidos" class="space-y-2 mt-2">
            <p class="font-1 mb-1 mt-3">
              Indique la cantidad de materiales afectados.
              <GlobalSvg
                class="animate animate-bounce inline ml-1 text-blue-500 h-5 w-5"
                svg="chevron-down"
              />
            </p>
            <div
              v-for="mat in materiales"
              :key="mat.id"
              class="material"
              :class="{ 'border-blue-300': materialesPerdidos[mat.id] }"
            >
              <span>{{ mat.nombre }}</span>
              <div class="material-counter">
                <button class="material-btn minus" @click="restar(mat)">
                  <GlobalSvg class="h-5 w-5 text-red-500" svg="minus" />
                </button>
                <div class="cant">
                  {{ materialesPerdidos[mat.id] }}
                </div>
                <button class="material-btn plus" @click="sumar(mat)">
                  <GlobalSvg class="h-5 w-5 text-green-500" svg="plus" />
                </button>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <FormTextarea
              id="nota_perdidos"
              v-model.trim="form.nota_perdidos"
              name="nota_perdidos"
              placeholder="¿Qué sucedió? (opcional)"
              label="Anotaciones"
              :sr="false"
              :error="hasError($v.form.nota_perdidos)"
              @input="fieldReset($v.form.nota_perdidos)"
              @blur="touch($v.form.nota_perdidos)"
            >
              <LazyFormError
                v-if="hasError($v.form.nota_perdidos)"
                :text="errorText($v.form.nota_perdidos)"
              />
            </FormTextarea>
          </div>
          <GlobalAlert color="blue" class="!mt-2">
            Se generará una incidencia relacionada en esta reserva y se enviará
            a la administración de ISEF.
          </GlobalAlert>
        </div>
      </div>
    </div>
    <ModalFooter
      type="mod"
      text="Confirmar recepción"
      @action="recibir"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { maxLength, requiredIf } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
  data() {
    return {
      form: {
        guardia_ci: '',
        nota_guardia: '',
        problema: false,
        perdidos: false,
        materiales_perdidos: '',
        nota_perdidos: '',
      },
      materialesPerdidos: {},
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    materiales() {
      return this.$store.state.reservas.materialesDisponibles;
    },
    guardia() {
      return this.$auth.user;
    },
  },
  methods: {
    recibir() {
      if (this.invalid()) return;
      this.formatearNotas();
      this.form.guardia_ci = this.guardia.ci;
      this.$store
        .dispatch('reservas/recibir', { id: this.reserva.id, data: this.form })
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
    hayPerdidos() {
      this.materiales.forEach((mat) => {
        this.$set(this.materialesPerdidos, mat.id, 0);
      });
    },
    sumar(mat) {
      if (this.materialesPerdidos[mat.id] < mat.cantidad) {
        this.materialesPerdidos[mat.id] += 1;
      }
    },
    restar(mat) {
      if (this.materialesPerdidos[mat.id] > 0) {
        this.materialesPerdidos[mat.id] -= 1;
      }
    },
    // Concateana la lista de perdidos en un solo string
    formatearNotas() {
      let keys = Object.keys(this.materialesPerdidos);
      keys.forEach((key, index) => {
        // Encuentra el material
        let mat = this.materiales.find((mat) => {
          return mat.id == key;
        });

        // Agrega de a uno los materiales al tring
        this.form.materiales_perdidos +=
          mat.id +
          '#Material: ' +
          mat.nombre +
          '#Cantidad: ' +
          this.materialesPerdidos[key];

        // Si no es el ultimo, le agrega division
        if (index != keys.length - 1) {
          this.form.materiales_perdidos += '//';
        }
      });
    },
  },
  validations: {
    form: {
      nota_guardia: {
        maxLength: maxLength(500),
      },
      nota_perdidos: {
        required: requiredIf((form) => {
          return !form.perdidos;
        }),
        maxLength: maxLength(500),
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.problema-input {
  @apply py-3 px-4 mt-4 w-full rounded-md bg-gray-100;
}
.problema {
  @apply border-l border-blue-300 px-3 mt-4;
  .material {
    @apply flex justify-between items-center border bg-gray-100 rounded-lg px-3 p-2 text-gray-900;
    .material-counter {
      @apply flex items-center border rounded-lg bg-white;
      .cant {
        @apply py-2 px-3 h-10;
      }
      .material-btn {
        @apply p-2 h-10;
        &.minus {
          @apply rounded-l-lg hover:bg-red-100;
        }
        &.plus {
          @apply rounded-r-lg hover:bg-green-100;
        }
      }
    }
  }
}
</style>
