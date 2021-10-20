<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div>
      <select
        id="deposito_id"
        v-model="dataMaterial.deposito"
        name="deposito_id"
        required
        class="input-text bg-white h-11 text-gray-900"
      >
        <option
          v-for="(deposito, i) in depositos"
          :key="i"
          :value="deposito.id"
        >
          {{ deposito.nombre }}
        </option>
      </select>
    </div>
    <div>
      <FormMaterialCreate :categorias="categorias" @agregar="agregarMaterial" />
      <ul>
        <li v-for="(form, index) in dataMaterial.materiales" :key="form.id">
          {{ form }}
          <button class="btn red" @click="deleteForm(index)">Quitar</button>
        </li>
      </ul>
    </div>
    <ModalFooter text="Confirmar" type="add" @action="createMateriales" />
  </div>
</template>

<script>
import MaterialesService from '~/services/materiales.service';
import CategoriasService from '~/services/categorias.service';
import DepositosService from '@/services/depositos.service';
export default {
  layout: 'AppLayout',
  data() {
    return {
      pageHeader: {
        title: 'Materiales',
        text: 'Registrar materiales en el sistema. Ejemplo de materiales: Pelotas, Chalecos, Conos, etc.',
      },
      nextformId: 0,
      dataMaterial: {
        //El material que se envía
        usuario_ci: this.$auth.user.ci,
        deposito: 1,
        materiales: [],
      },
      depositos: [],
      categorias: [],
    };
  },
  mounted() {
    DepositosService.index().then((res) => {
      this.depositos = res.data;
    });
    CategoriasService.index().then((res) => {
      this.categorias = res.data;
    });
  },
  methods: {
    agregarMaterial(data) {
      console.log(data);
      if (this.verificarNombre(data)) return;
      this.dataMaterial.materiales.push(data);
    },
    deleteForm: function (index) {
      this.dataMaterial.materiales.splice(index, 1);
    },
    createMateriales() {
      MaterialesService.create(this.dataMaterial)
        .then(() => {
          this.$router.go();
        })
        .catch((e) => {
          this.error = e.response.data.errors;
        });
    },
    verificarNombre(data) {
      return this.dataMaterial.materiales.find((m) => {
        return m.nombre === data.nombre && m.categoria_id === data.categoria_id;
      });
    },
  },
};
</script>

<style></style>
