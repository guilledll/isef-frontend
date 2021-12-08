<template>
  <div>
    <GlobalAlert color="gray">
      Registre todos los materiales que desea agregar al sistema.
    </GlobalAlert>
    <div class="flex flex-col justify-between gap-4 mt-4 lg:flex-row">
      <div class="flex-grow space-y-2">
        <div>
          <h3 class="flex justify-between items-center text-2xl font-1">
            Registrar material
            <GlobalSvg class="text-indigo-500 h-6 w-6" svg="cube" />
          </h3>
          <hr class="w-full mb-4 mt-2" />
        </div>
        <div class="space-y-3">
          <!-- Departamento -->
          <FormSelect
            id="departamento_id"
            v-model.number="form.departamento_id"
            name="departamento_id"
            label="Departamento"
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
          <!-- Deposito -->
          <LazyFormSelect
            v-if="form.departamento_id != 0"
            id="deposito_id"
            v-model.number="form.deposito_id"
            name="deposito_id"
            label="Depósito"
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
          </LazyFormSelect>
          <!-- Alerta de dep y deposito -->
        </div>
        <LazyGlobalAlert
          v-if="!form.departamento_id || !form.deposito_id"
          class="!mt-3"
          color="gray"
          svg="location-marker"
        >
          Indique el departamento y el depósito donde agregará los materiales.
        </LazyGlobalAlert>
        <div v-else class="space-y-3">
          <GlobalAlert color="gray">
            Nombre los materiales en singular y respetando el formato
            <b>"Nombre Categoría"</b>. Ejemplos: <b>Pelota fútbol</b>,
            <b>5K pesa</b>, <b>Red tennis</b>.
          </GlobalAlert>
          <!-- Materiales -->
          <FormInput
            id="nombre"
            v-model.trim="form.nombre"
            name="nombre"
            label="Material"
            autocomplete="on"
            placeholder="Nombre del material"
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
          <!-- Categoria -->
          <FormSelect
            id="categoria_id"
            v-model.number="form.categoria_id"
            name="categoria_id"
            label="Categoría"
            required
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
          <!-- Alerta material + categoria -->
          <LazyGlobalAlert v-if="form.nombre" color="indigo" svg="cube">
            El material será:
            <b>{{ nombreConFormato() }} {{ form.categoria }}</b>
          </LazyGlobalAlert>
          <!-- Cantidad -->
          <FormInput
            id="cantidad"
            v-model.number="form.cantidad"
            name="cantidad"
            autocomplete="off"
            type="number"
            placeholder="Cantidad de materiales"
            label="Cantidad a agregar"
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
          <!-- Nota -->
          <FormTextarea
            id="nota"
            v-model.trim="form.nota"
            name="nota"
            placeholder="Notas (opcional)"
            label="Notas del movimiento"
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
        <div v-if="error" class="text-red-500 text-center !-mb-1 font-semibold">
          Este material ya está en la lista.
        </div>
        <button
          type="button"
          class="btn indigo w-full !mt-3"
          :disabled="disabled"
          @click="agregarMaterial"
        >
          Agregar material a la lista
        </button>
      </div>
      <div class="side-table">
        <div v-if="list.materiales.length" class="space-y-4">
          <div>
            <h3 class="flex justify-between items-center text-2xl font-1">
              Lista materiales agregados
              <GlobalSvg class="text-green-500 h-6 w-6" svg="clipboard-check" />
            </h3>
            <hr class="w-full mb-4 mt-2" />
          </div>
          <LazyTable>
            <template #head>
              <TableHead :header="table" />
            </template>
            <template #body>
              <tr
                v-for="(material, index) in list.materiales"
                :key="material.id"
              >
                <td class="table-td">
                  {{ material.nombre }} {{ material.categoria }}
                </td>
                <td class="table-td text-gray-500">
                  {{ material.deposito }}
                </td>
                <td class="table-td text-gray-500">
                  {{ material.cantidad || 0 }}
                </td>
                <td
                  class="table-td text-center text-gray-500"
                  :class="{
                    'hover:bg-gray-100 hover:text-blue-500': material.nota,
                  }"
                >
                  <GlobalSvg
                    v-if="material.nota"
                    class="h-5 w-5 m-auto"
                    svg="chat-alt"
                  />
                </td>
                <td class="table-td text-right">
                  <TableButton type="delete" @click="eliminarMaterial(index)" />
                </td>
              </tr>
            </template>
          </LazyTable>
          <div class="confirm">
            <p class="font-1 text-sm text-gray-800 sm:text-lg">
              Cuando todo esté listo, presione confirmar.
            </p>
            <button class="btn green" @click="guardarMateriales">
              Confirmar
            </button>
          </div>
        </div>
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
  </div>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import {
  categoria,
  deposito,
  departamento,
  cantidad,
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
        nota: '',
        departamento_id: 0,
        deposito_id: 0,
        categoria_id: 0,
        cantidad: 1,
      },
      list: {
        usuario_ci: this.$auth.user.ci,
        materiales: [],
      },
      table: ['Material', 'Depósito', 'Cantidad', 'Nota'],
      error: false,
    };
  },
  computed: {
    departamentos() {
      return this.$store.getters['departamentos/conDepositos'];
    },
    depositos() {
      return this.$store.state.departamentos.depositos;
    },
    categorias() {
      return this.$store.state.categorias.categorias.length
        ? this.$store.state.categorias.categorias
        : this.$store.dispatch('categorias/all');
    },
    disabled() {
      return (
        !this.form.nombre ||
        !this.form.departamento_id ||
        !this.form.deposito_id ||
        !this.form.categoria_id ||
        !this.form.cantidad
      );
    },
  },
  async mounted() {
    await this.$store.dispatch('departamentos/all');
  },
  methods: {
    agregarMaterial() {
      if (this.invalid()) return;
      if (this.verificarNombre(this.form)) {
        this.error = true;
        return;
      } else this.error = false;

      let data = {
        nombre: this.nombreConFormato(),
        categoria_id: this.form.categoria_id,
        categoria: this.form.categoria,
        deposito_id: this.form.deposito_id,
        deposito: this.form.deposito,
        cantidad: this.form.cantidad,
        nota: this.form.nota,
      };

      this.form.nombre = '';
      this.form.categoria_id = 0;
      this.form.categoria = '';
      this.form.cantidad = 1;
      this.form.nota = '';

      this.$v.$reset();
      this.list.materiales.push(data);
    },
    async guardarMateriales() {
      await this.$store
        .dispatch('materiales/create', this.list)
        .then(() =>
          this.$router.push({ path: '/materiales', query: { add: true } })
        )
        .catch((e) => console.error(e));
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
      this.$store.dispatch(
        'departamentos/depositos',
        this.form.departamento_id
      );
      this.form.deposito_id = 0;
      this.form.deposito = '';
    },
    seleccionarDeposito(value) {
      this.form.deposito = value;
    },
    seleccionarCategoria(value) {
      this.form.categoria = value;
    },
    nombreConFormato() {
      let nom = this.form.nombre.toLowerCase();
      return nom[0].toUpperCase() + nom.substring(1);
    },
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
        cantidad,
      },
      nota: {
        maxLength: maxLength(255),
      },
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
.confirm {
  @apply flex justify-between items-center bg-gray-50 border-l-4 border-green-600 px-4 py-2;
}
</style>
