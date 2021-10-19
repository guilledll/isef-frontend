<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <!-- Listar Usuarios -->
      <div class="w-full gap-3 lg:order-last lg:w-72 lg:block"></div>
      <Table>
        <template #header>
          <TableHead :header="table.header" />
        </template> 
        <template #body>
          <tr v-for="user in users" :key="user.id">
            <td class="table-td">
              <router-link
                :to="`/users/${user.ci}`"
                class="text-black hover:text-blue-600 hover:underline"
                @click.native="seleccionarUsuario('view', user)"
              >
                {{ user.nombre }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              <router-link
                :to="`/departamentos/${user.departamento_id}`"
                class="hover:text-blue-600 hover:underline"
                @click.native="verDepartamento(user)"
              >
                {{ user.departamento }}
              </router-link>
            </td>
            <td class="table-td" :class="`rol-${user.rol}`">
              {{ mostrarRol(user.rol) }}
            </td>
            <td class="table-td text-right">
              <TableButton
                svg="view"
                @click="$router.push(`/users/${user.ci}`)"
              />
              <TableButton svg="del" @click="seleccionarUsuario('del', user)" />
              <TableButton svg="mod" @click="seleccionarUsuario('mod', user)" />
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <LazyModal v-if="modal.show">
      <LazyFormUsuarioRol
        v-if="modal.action == 'mod'"
        @close="modal.show = !modal.show"
      />
      <LazyFormUsuarioDelete
        v-else-if="modal.action == 'del'"
        @close="modal.show = !modal.show"
      />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  data() {
    return {
      pageHeader: {
        title: 'Usuarios',
        text: 'Usuarios registrados en el sistema.',
      },
      table: {
        header: ['Nombre', 'Departamento', 'Rol'],
      },
      modal: {
        show: false,
        action: '',
      },
    };
  },
  computed: {
    users() {
      return this.$store.state.users.users;
    },
  },
  mounted() {
    this.$store.dispatch('users/all');
  },
  methods: {
    seleccionarUsuario(action, user = null) {
      if (user) this.$store.dispatch('users/select', user);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    mostrarRol(rol) {
      switch (rol) {
        case 1:
          return 'Usuario';
        case 2:
          return 'Guardia';
        case 3:
          return 'Administrador';
        default:
          return 'Sin asignar';
      }
    },
    verDepartamento(dep) {
      this.$store.dispatch('departamentos/select', {
        id: dep.departamento_id,
        nombre: dep.departamento,
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.rol-0 {
  @apply text-red-500;
}
.rol-1 {
  @apply text-gray-500;
}
.rol-2 {
  @apply text-indigo-500;
}
.rol-3 {
  @apply text-green-500;
}
</style>
