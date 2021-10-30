<template>
  <div>
    <div
      class="
        flex flex-col
        justify-between
        gap-2
        bg-gray-50
        border
        rounded-lg
        px-4
        py-3
        lg:flex-row
      "
    >
      <!-- Departamento -->
      <div class="w-full">
        <FormSelect
          id="departamento_id"
          v-model.trim="form.departamento_id"
          name="departamento_id"
          label="Departamento"
          :sr="false"
          :error="hasError($v.form.departamento_id)"
          @input="fieldReset($v.form.departamento_id)"
          @blur="touch($v.form.departamento_id)"
          @change="seleccionarDepartamento"
        >
          <template #options>
            <option value="0">Seleccionar un departamento</option>
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
      </div>
      <!-- Deposito -->
      <div v-if="form.departamento_id != 0" class="w-full">
        <FormSelect
          id="deposito_id"
          v-model.trim="form.deposito_id"
          name="deposito_id"
          label="Depósito"
          :sr="false"
          :error="hasError($v.form.deposito_id)"
          @input="fieldReset($v.form.deposito_id)"
          @blur="touch($v.form.deposito_id)"
          @change="seleccionarDeposito"
        >
          <template #options>
            <option value="0">Seleccionar un depósito</option>
            <option
              v-for="deposito in depositos"
              :key="deposito.id"
              :value="deposito.id"
              :selected="form.deposito_id == deposito.id"
            >
              {{ deposito.nombre }}
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
    </div>
    <hr class="w-full my-5" />
    <div class="flex flex-col justify-between gap-3 lg:flex-row">
      <div class="flex-grow space-y-2 form-data">
        <div>
          <h3 class="text-2xl font-1 mt-1">Registrar material</h3>
          <hr class="w-full mb-4 mt-2" />
        </div>
        <!-- Nombre -->
        <div>
          <FormInput
            id="nombre"
            v-model.trim="form.nombre"
            name="nombre"
            label="Material"
            autocomplete="on"
            placeholder="Nombre del material"
            :sr="false"
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
        </div>
        <!-- Categoria -->
        <div>
          <FormSelect
            id="categoria_id"
            v-model.trim="form.categoria_id"
            name="categoria_id"
            label="Categoría"
            required
            :sr="false"
            :error="hasError($v.form.categoria_id)"
            @input="fieldReset($v.form.categoria_id)"
            @blur="touch($v.form.categoria_id)"
            @change="seleccionarCategoria"
          >
            <template #options>
              <option value="0" :selected="!form.categoria_id">
                Seleccionar categoria
              </option>
              <option
                v-for="(categoria, i) in categorias"
                :key="i"
                :value="categoria.id"
                :selected="categoria.id == form.categoria_id"
              >
                {{ categoria.nombre }}
              </option>
            </template>
            <template #error>
              <LazyFormError
                v-if="hasError($v.form.categoria_id)"
                :text="errorText($v.form.categoria_id)"
              />
            </template>
          </FormSelect>
        </div>
        <!-- Cantidad -->
        <div>
          <FormInput
            id="cantidad"
            v-model.trim="form.cantidad"
            name="cantidad"
            autocomplete="off"
            placeholder="Cantidad de materiales"
            label="Cantidad a agregar"
            :sr="false"
            :error="hasError($v.form.cantidad, 'cantidad')"
            @input="fieldReset($v.form.cantidad, 'cantidad')"
            @blur="touch($v.form.cantidad)"
          >
            <LazyFormError
              v-if="hasError($v.form.cantidad, 'cantidad')"
              :text="errorText($v.form.cantidad, 'cantidad')"
              :val="errorValidation($v.form.cantidad)"
            />
          </FormInput>
        </div>
        <div v-if="error" class="text-red-500 text-center !-mb-1 font-semibold">
          Este material ya está en la lista.
        </div>
        <button
          type="button"
          class="btn green w-full !mt-5"
          @click="agregarMaterial"
        >
          Agregar más materiales
        </button>
      </div>
      <div class="side-table">
        <LazyTable v-if="list.materiales.length">
          <template #header>
            <TableHead :header="table" />
          </template>
          <template #body>
            <tr v-for="(material, index) in list.materiales" :key="material.id">
              <td class="table-td">
                {{ material.nombre }} {{ material.categoria }}
              </td>
              <td class="table-td text-gray-500">
                {{ material.deposito }}
              </td>
              <td class="table-td text-gray-500">
                {{ material.cantidad || 0 }}
              </td>
              <td class="table-td text-right">
                <TableButton type="delete" @click="eliminarMaterial(index)" />
              </td>
            </tr>
          </template>
        </LazyTable>
        <div v-else class="flex items-center flex-col">
          <img
            src="/svg/list_add.svg"
            alt="Agregar materiales"
            class="h-40 my-8 m-auto md:h-52 md:my-16"
          />
          <h4 class="text-gray-800 text-xl mb-3 leading-relaxed">
            Agrega
            <span class="font-semibold lowercase">materiales</span>
            para comenzar!
          </h4>
        </div>
      </div>
    </div>
    <div
      v-if="list.materiales.length"
      class="flex justify-end bg-gray-50 border rounded-lg px-4 py-3 mt-5"
    >
      <button class="btn green" type="submit" @click="guardarMateriales">
        Confirmar
      </button>
    </div>
  </div>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import {
  categoria,
  deposito,
  departamento,
} from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
  data() {
    return {
      form: {
        nombre: '',
        categoria: '',
        deposito: '',
        departamento_id: 0,
        deposito_id: 0,
        categoria_id: 0,
        cantidad: 1,
      },
      list: {
        usuario_ci: this.$auth.user.ci,
        materiales: [],
      },
      departamentos: [],
      table: ['Material', 'Depósito', 'Cantidad'],
      error: false,
    };
  },
  computed: {
    auxDepartamentos() {
      return this.$store.state.departamentos.departamentos;
    },
    depositos() {
      return this.$store.state.departamentos.depositos;
    },
    categorias() {
      return this.$store.state.categorias.categorias.length
        ? this.$store.state.categorias.categorias
        : this.$store.dispatch('categorias/all');
    },
  },
  async mounted() {
    await this.$store.dispatch('departamentos/all');
    // Array sin departamentos con depositos_count = 0
    this.departamentos = this.auxDepartamentos.filter((dep) => {
      return dep.depositos_count > 0;
    });
  },
  validations: {
    form: {
      nombre: {
        required,
        maxLength: maxLength(50),
      },
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
    agregarMaterial() {
      if (this.invalid()) return;
      if (this.verificarNombre(this.form)) {
        this.error = true;
        return;
      } else this.error = false;

      let data = {
        nombre: this.form.nombre,
        categoria_id: this.form.categoria_id,
        categoria: this.form.categoria,
        deposito_id: this.form.deposito_id,
        deposito: this.form.deposito,
        cantidad: this.form.cantidad,
      };

      this.form.nombre = '';
      this.form.categoria_id = 0;
      this.form.categoria = '';
      this.form.cantidad = 1;

      this.$v.$reset();
      this.list.materiales.push(data);
    },
    async guardarMateriales() {
      await this.$store
        .dispatch('materiales/create', this.list)
        .catch((e) => (this.errors = e.response.data.errors));
      this.$router.push({ path: '/materiales' });
    },
    eliminarMaterial(index) {
      this.list.materiales.splice(index, 1);
    },
    verificarNombre(data) {
      return this.list.materiales.find((m) => {
        return m.nombre === data.nombre && m.categoria_id === data.categoria_id;
      });
    },
    seleccionarDepartamento() {
      if (this.form.departamento_id != 0)
        this.$store.dispatch(
          'departamentos/depositos',
          this.form.departamento_id
        );
      else {
        this.form.deposito_id = 0;
        this.form.deposito = '';
      }
    },
    seleccionarDeposito(value) {
      this.form.deposito = value;
    },
    seleccionarCategoria(value) {
      this.form.categoria = value;
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
