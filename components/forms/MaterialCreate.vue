<template>
  <form @submit.prevent="createMaterial">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-xl leading-6 font-medium text-gray-900 mb-3">
            Agregar material
          </h3>
          <p class="mb-3">Se creará un nuevo material.</p>
          <p v-if="error" class="text-red-500 font-medium mb-1">
            {{ error.nombre[0] }}
          </p>
          <div class="space-y-2">
            <div>
              <FormInput
                id="nombre"
                v-model.trim="material.nombre"
                name="nombre"
                autocomplete="on"
                placeholder="Nombre de material"
                :error="$v.material.nombre.$anyError"
                @input="$v.material.nombre.$reset()"
                @blur="$v.material.nombre.$touch()"
              />
              <span v-if="$v.material.nombre.$anyError" class="error">
                {{ validar($v.material.nombre) }}
              </span>
            </div>
            <div>
              <select
                id="deposito_id"
                v-model.trim="material.deposito_id"
                name="deposito_id"
                required
                class="input-text bg-white h-11 text-gray-900"
                :error="$v.material.deposito_id.$anyError"
                @input="$v.material.deposito_id.$reset()"
                @blur="$v.material.deposito_id.$touch()"
              >
                <option value="0">Seleccionar deposito</option>
                <option v-for="(sede, i) in sedes" :key="i" :value="sede.id">
                  {{ sede.nombre }}
                </option>
              </select>
              <span v-if="$v.material.deposito_id.$anyError" class="error">
                {{ validar($v.material.deposito_id) }}
              </span>
            </div>
            <div>
              <select
                id="categoria_id"
                v-model.trim="material.categoria_id"
                name="categoria_id"
                required
                class="input-text bg-white h-11 text-gray-900"
                :error="$v.material.categoria_id.$anyError"
                @input="$v.material.categoria_id.$reset()"
                @blur="$v.material.categoria_id.$touch()"
              >
                <option value="0">Seleccionar categoria</option>
                <option
                  v-for="(categoria, i) in categorias"
                  :key="i"
                  :value="categoria.id"
                >
                  {{ categoria.nombre }}
                </option>
              </select>
              <span v-if="$v.material.categoria_id.$anyError" class="error">
                {{ validar($v.material.categoria_id) }}
              </span>
            </div>
            <div>
              <FormInput
                id="cantidad"
                v-model.trim="material.cantidad"
                name="cantidad"
                autocomplete="on"
                placeholder="Cantidad de materiales"
                :error="$v.material.cantidad.$anyError"
                @input="$v.material.cantidad.$reset()"
                @blur="$v.material.cantidad.$touch()"
              />
              <span v-if="$v.material.cantidad.$anyError" class="error">
                {{ validar($v.material.caantidad) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter text="Nuevo material" type="add" />
  </form>
</template>

<script>
import categoriasService from '@/services/categoria.service';
import depositosService from '@/services/depositos.service';
import { mensajes } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
const categoria = (value) => value != 0;
const deposito = (value) => value != 0;
export default {
  mixins: [validationMixin],
  data() {
    return {
      material: {
        nombre: '',
        deposito_id: 0,
        categoria_id: 0,
        cantidad: 0,
      },
      sedes: [],
      categorias: [],
      error: null,
    };
  },
  mounted() {
    depositosService.index().then((res) => {
      this.sedes = res.data;
    });
    categoriasService.index().then((res) => {
      this.categorias = res.data;
    });
  },
  validations: {
    material: {
      nombre: {
        required,
        maxLength: maxLength(50),
      },
      deposito_id: {
        required,
        integer,
        deposito,
      },
      categoria_id: {
        required,
        integer,
        categoria,
      },
      cantidad: {
        required,
        integer,
      },
    },
  },
  methods: {
    validar: validationMessage(mensajes),

    createMaterial() {
      this.$v.material.$touch();
      if (this.$v.$invalid) return;

      this.$emit('agregar', this.material);
    },
  },
};
</script>
