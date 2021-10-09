<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <!-- AGREGAR MATERIALES -->
      <div class="w-full gap-3 lg:order-last lg:w-72 lg:block"></div>
    </div>
    <div>
      <form @submit.prevent="addForm">
        <!--<label for="new-form">Agregar form</label> -->
        <button>Agregar más materiales</button>
      </form>
    </div>
    <div>
      <ul>
        <li v-for="(form, index) in forms" :key="form.id">
          <FormMaterialCreate @agregar="agregarMaterial" />
          <button @click="deleteForm(index)">Quitar</button>
        </li>
      </ul>
    </div>
    <ModalFooter text="Confirmar" type="add" @action="createMateriales" />
    <button @click="createMateriales">Guardar materiales</button>
  </div>
</template>

<script>
import materialesService from '~/services/materiales.service';
export default {
  layout: 'AppLayout',
  data() {
    return {
      forms: [{ id: '' }], //Formularios
      nextformId: 0,
      dataMaterial: {
        //El material que se envía
        usuario_ci: this.$auth.user.ci,
        materiales: [],
      },
      header: {
        title: 'Materiales',
        text: 'materiales... etc.',
      },
    };
  },
  methods: {
    agregarMaterial(data) {
      this.dataMaterial.materiales.push(data);
      //console.log(this.dataMaterial.materiales);
    },
    addForm() {
      this.forms.push({
        id: this.nextformId++,
      });
    },
    deleteForm: function (index) {
      this.forms.splice(index, 1);
    },
    createMateriales() {
      //  this.$v.material.$touch();
      // if (this.$v.$invalid) return;
      materialesService
        .create(this.dataMaterial)
        .then(() => {
          // ALMACENAR EN STORE
          this.$router.go();
        })
        .catch((e) => {
          this.error = e.response.data.errors;
        });
    },
  },
};
</script>

<style></style>
