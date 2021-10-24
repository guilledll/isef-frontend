<template>
  <div class="page-container">
    <div class="page-side">
      <button class="btn blue side"></button>
    </div>
    <div class="page-main">
      <h3 class="font-1">{{ departamento.nombre }}</h3>
      <hr class="mt-3" />
    </div>
    <div class="grid gap-3 lg:grid-cols-2">
      <GlobalInfoTable
        title="Depósitos"
        svg="office-building"
        :table="table.depositos"
        :open="open.depositos"
        @click="showDetails('depositos')"
      >
        <tr v-for="deposito in depositos" :key="deposito.id">
          <td class="table-td">
            <router-link
              :to="`/depositos/${deposito.id}`"
              class="text-black hover:text-blue-600 hover:underline"
            >
              {{ deposito.nombre }}
            </router-link>
          </td>
          <td class="table-td text-gray-500">
            {{ deposito.materiales_count || 0 }}
          </td>
        </tr>
      </GlobalInfoTable>
      <GlobalInfoTable
        title="Usuarios"
        svg="user-group"
        :table="table.usuarios"
        :open="open.usuarios"
        @click="showDetails('usuarios')"
      >
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td class="table-td text-gray-500">
            <router-link
              :to="`/usuarios/${usuario.ci}`"
              class="text-black hover:text-blue-600 hover:underline"
            >
              {{ usuario.nombre }} {{ usuario.apellido }}
            </router-link>
          </td>
          <td class="table-td">
            <router-link
              :to="`/usuarios/${usuario.ci}`"
              class="text-gray-500 hover:text-blue-600 hover:underline"
            >
              {{ usuario.ci }}
            </router-link>
          </td>
          <td class="table-td text-gray-500">
            {{ usuario.telefono }}
          </td>
        </tr>
      </GlobalInfoTable>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      open: {
        depositos: false,
        usuarios: false,
      },
      table: {
        depositos: ['Nombre', 'Materiales'],
        usuarios: ['Nombre', 'CI', 'Teléfono'],
      },
    };
  },
  computed: {
    departamento() {
      return (
        this.$store.state.departamentos.departamento ||
        this.$store.dispatch('departamentos/get', this.$route.params.id)
      );
    },
    depositos() {
      return this.$store.state.departamentos.depositos;
    },
    usuarios() {
      return this.$store.state.departamentos.usuarios;
    },
  },
  methods: {
    async showDetails(data) {
      if (data == 'depositos' && !this.depositos.length) {
        await this.$store.dispatch(
          'departamentos/depositos',
          this.departamento.id
        );
      } else if (data == 'usuarios' && !this.usuarios.length) {
        await this.$store.dispatch(
          'departamentos/usuarios',
          this.departamento.id
        );
      }

      if (data == 'depositos') this.open.depositos = !this.open.depositos;
      else if (data == 'usuarios') this.open.usuarios = !this.open.usuarios;
    },
  },
};
</script>

<style lang="postcss" scoped>
.page-container {
  @appy flex flex-col gap-3 lg:flex-row;
}
.page-main {
  @apply mb-10;
  & > h3 {
    @apply text-4xl text-gray-900;
  }
}

.page-side {
  /* & > .side {
    @apply ;
  } */
}
</style>
