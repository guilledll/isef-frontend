<template>
  <form @submit.prevent="updateMaterial">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Modificar material</h3>
          <p class="mb-3">Cambiar datos del material.</p>
          <div class="space-y-4">
            <!--Nombre -->
            <FormInput
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              autocomplete="on"
              :error="hasError($v.form.nombre, 'nombre')"
              @input="fieldReset($v.form.nombre, 'nombre')"
              @blur="touch($v.form.nombre)"
            >
              <LazyFormError
                v-if="hasError($v.form.nombre, 'nombre')"
                :text="errorText($v.form.nombre, 'nombre')"
                :val="errorValidation($v.form.nombre)"
              />
            </FormInput>
            <!-- Cantidad -->
            <div>
              <p class="mb-1 font-1 text-gray-800">Cantidad</p>
              <div class="flex gap-3">
                <FormCounter
                  :cant="form.cantidad"
                  :zero="true"
                  @cambio="updateCantidad"
                />
                <div class="mover" @click="mover()">
                  ¿Mover a otro depósito?
                </div>
              </div>
              <div v-if="form.cantidad != cantidadInicial">
                <GlobalAlert
                  :color="sumaMateriales ? 'green' : 'yellow'"
                  class="!my-3"
                >
                  Se {{ sumaMateriales ? 'agregarán' : 'eliminarán' }}
                  {{
                    sumaMateriales
                      ? form.cantidad - cantidadInicial
                      : cantidadInicial - form.cantidad
                  }}
                  materiales {{ sumaMateriales ? 'al' : 'del' }} sistema.
                </GlobalAlert>
                <!--Nota -->
                <FormTextarea
                  id="nota"
                  v-model.trim="form.nota"
                  name="nota"
                  class="max-w-full"
                  placeholder="Notas del movimiento (opcional)"
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
                <GlobalAlert color="blue !mt-2">
                  Al cambiar la cantidad, se registrará el movimiento realizado
                  en el historial.
                </GlobalAlert>
              </div>
              <LazyGlobalAlert v-else color="gray">
                Puede modificar la cantidad existente en el inventario sumando
                (+) o restando (-).
              </LazyGlobalAlert>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter text="Guardar" :disabled="disabled" @close="closeModal" />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin, FormValidationMixin],
  props: {
    isView: { type: Boolean, default: false },
  },
  data() {
    return {
      form: {
        id: '',
        nombre: '',
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
    disabled() {
      return (
        Object.keys(updatedDiff(this.material, this.form)).length == 0 ||
        this.form.nombre.length == 0
      );
    },
    // Me dice si al modificar la cantidad se esta agregando o restando
    sumaMateriales() {
      return this.form.cantidad > this.cantidadInicial ? true : false;
    },
  },
  mounted() {
    this.form.id = this.material.id;
    this.form.nombre = this.material.nombre;
    this.form.cantidad = this.material.cantidad;
    this.form.nota = this.material.nota;
    this.cantidadInicial = this.material.cantidad;
  },
  methods: {
    updateCantidad(cantidad) {
      this.form.cantidad = cantidad;
    },
    updateMaterial() {
      if (this.invalid()) return;
      this.$store
        .dispatch('materiales/update', this.form)
        .then(() => {
          if (this.isView) {
            this.$emit('close');
          } else {
            this.$emit('actualizado');
          }
        })
        .catch((e) => (this.errors = e.response.data.errors));
    },
    mover() {
      this.$emit('close');
      this.$emit('mover', this.material);
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
      usuario_ci: {
        required,
        integer,
      },
      nombre: {
        required,
        maxLength: maxLength(50),
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
.mover {
  @apply flex items-center justify-center flex-grow rounded-md bg-gray-200 cursor-pointer font-medium text-gray-800 hover:bg-gray-100;
}
</style>
