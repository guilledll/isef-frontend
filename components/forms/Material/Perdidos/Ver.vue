<template>
  <form @submit.prevent="tomarAccion">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full space-y-4">
        <div>
          <h3 class="mb-0 text-xl text-gray-800 font-1 sm:text-2xl">
            Reserva nro. #{{ perdidos.reserva_id }}
          </h3>
          <h4 class="text-lg font-1 text-gray-500 sm:text-xl">
            {{ formatearFecha(perdidos.fecha) }}
          </h4>
          <hr class="w-full my-2" />
        </div>
        <div class="grid grid-cols-2 gap-3 text-left sm:gap-5">
          <GlobalInputData
            title="Guardia"
            :value="perdidos.guardia"
            color="pink"
            svg="user"
          />
          <GlobalInputData
            v-if="perdidos.admin"
            title="Administrador"
            :value="perdidos.admin"
            color="purple"
            svg="user"
          />
        </div>
        <div>
          <p class="font-1 flex my-3 text-gray-700 items-center">
            <GlobalSvg class="h-6 w-6 mr-1 text-blue-500" svg="cube" />
            Lista de materiales afectados en esta reserva.
          </p>
          <Table>
            <template #head>
              <TableHead :header="['Materiales', 'Cantidad']" :action="false" />
            </template>
            <template #body>
              <tr v-for="material in materialesConFormato()" :key="material.id">
                <td class="table-td">
                  <router-link
                    :to="`/materiales/${material.id}`"
                    class="hover:text-blue-600 hover:underline"
                  >
                    {{ material.nombre }}
                  </router-link>
                </td>
                <td class="table-td">{{ material.cantidad }}</td>
              </tr>
            </template>
          </Table>
        </div>
        <div>
          <LazyGlobalInputData
            v-if="perdidos.nota_guardia"
            class="mt-5"
            title="Nota guardia"
            :value="perdidos.nota_guardia"
            color="pink"
            svg="chat-alt"
          />
          <LazyGlobalInputData
            v-if="perdidos.nota_admin"
            class="mt-5"
            title="Nota administrador"
            :value="perdidos.nota_admin"
            color="purple"
            svg="chat-alt"
          />
        </div>
        <div
          v-if="!perdidos.accion_tomada && user.rol === 3"
          class="problema-input"
        >
          <div class="checkbox">
            <input
              id="resuelto"
              v-model="form.resuelto"
              name="resuelto"
              type="checkbox"
              class="check"
              @change="$v.form.$reset()"
            />
            <label for="resuelto" class="text">
              Se tomaron acciones sobre este reporte
            </label>
          </div>
        </div>
        <div v-if="form.resuelto && !perdidos.accion_tomada">
          <p class="font-1 mb-1 mt-3">
            Describa que acciones se tomaron sobre los materiales afectados.
          </p>
          <FormTextarea
            id="nota_admin"
            v-model.trim="form.nota_admin"
            name="nota_admin"
            placeholder="¿Qué acciones se tomaron?"
            :error="hasError($v.form.nota_admin)"
            @input="fieldReset($v.form.nota_admin)"
            @blur="touch($v.form.nota_admin)"
          >
            <LazyFormError
              v-if="hasError($v.form.nota_admin)"
              :text="errorText($v.form.nota_admin)"
            />
          </FormTextarea>
          <LazyGlobalAlert v-if="form.resuelto" color="blue" class="!mt-2">
            Las acciones realizadas permite dar seguimiento de los materiales
            involucrados. Las acciones descritas no podrán ser modificadas.
          </LazyGlobalAlert>
        </div>
        <LazyGlobalAlert v-if="perdidos.admin" color="green" svg="check">
          <b>{{ perdidos.admin }}</b> tomó acciones sobre este informe.
        </LazyGlobalAlert>
      </div>
    </div>
    <ModalFooter
      text="Marcar resuelto"
      type="add"
      :button="validarBoton"
      @close="$emit('close')"
    />
  </form>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import {
  maxLength,
  minLength,
  requiredIf,
  required,
} from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin, FechaMixin],
  data() {
    return {
      form: {
        resuelto: false,
        nota_admin: '',
        admin_ci: null,
        id: null,
      },
      data: [
        {
          key: 'fecha',
          title: 'Fecha',
          color: 'blue',
          svg: 'clock',
        },
        {
          key: 'guardia_ci',
          title: 'CI Guarida',
          color: 'pink',
          svg: 'user',
        },
      ],
    };
  },
  computed: {
    perdidos() {
      return this.$store.state.materialesPerdidos.materiales;
    },
    user() {
      return this.$auth.user;
    },
    validarBoton() {
      return (
        !this.perdidos.accion_tomada &&
        this.user.rol === 3 &&
        this.form.resuelto &&
        !this.$v.$invalid
      );
    },
  },
  mounted() {
    this.form.admin_ci = this.user.ci;
    this.form.id = this.perdidos.id;
  },
  methods: {
    tomarAccion() {
      if (this.invalid()) return;

      this.$store.dispatch('materialesPerdidos/accion', this.form).then(() => {
        this.$router.push({
          path: `/reservas/${this.perdidos.reserva_id}`,
          query: { accion: true },
        });
        this.$emit('close');
      });
    },
    materialesConFormato() {
      let arr = this.perdidos.materiales.split('/@/');
      let materiales = [];
      arr.forEach((m) => {
        let mat = m.split('^');
        if (mat[0]) {
          materiales.push({
            id: parseInt(mat[0]),
            nombre: mat[1],
            cantidad: parseInt(mat[2]),
          });
        }
      });
      return materiales;
    },
  },
  validations: {
    form: {
      nota_admin: {
        required: requiredIf(function (form) {
          return form.resuelto && !this.perdidos.accion_tomada;
        }),
        maxLength: maxLength(500),
        minLength: minLength(10),
      },
      admin_ci: {
        required,
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.problema-input {
  @apply py-3 px-4 mt-4 w-full rounded-md bg-gray-100;
}
.material {
  @apply flex justify-between items-center border bg-gray-100 rounded-lg px-3 p-2 text-gray-900;
}
</style>
