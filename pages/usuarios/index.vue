<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <GlobalSearch
      store="users"
      :title="searchTitle"
      :data="usuariosFiltrados"
      :inputs="inputs"
      @filtrar="filtrar"
      @limpiar="limpiar"
      @cambiar="cambiarFiltro"
    />
    <div class="flex flex-col gap-3 lg:flex-row">
      <Table>
        <template #head>
          <TableHead :header="table.header" />
        </template>
        <template #body>
          <tr v-for="user in usuarios" :key="user.ci">
            <td class="table-td">
              <router-link
                :to="`/usuarios/${user.ci}`"
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
            <td class="table-td text-gray-500">
              {{ user.telefono }}
            </td>
            <td class="table-td" :class="`rol-${user.rol}`">
              {{ mostrarRol(user.rol) }}
            </td>
            <td class="table-td text-right">
              <TableButton
                type="view"
                @click="$router.push(`/users/${user.ci}`)"
              />
              <!-- <TableButton
                v-if="user.ci != $auth.user.ci"
                type="delete"
                @click="seleccionarUsuario('del', user)"
              /> -->
              <TableButton
                v-if="user.ci != $auth.user.ci"
                type="edit"
                @click="seleccionarUsuario('mod', user)"
              />
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
      <!-- <LazyFormUsuarioDelete
        v-else-if="modal.action == 'del'"
        @close="modal.show = !modal.show"
      /> -->
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      pageHeader: {
        title: 'Usuarios',
        text: 'Listados de usuarios registrados en el sistema, sus datos y respectivos roles.',
      },
      table: {
        header: ['Nombre', 'Departamento', 'Teléfono', 'Rol'],
      },
      modal: {
        show: false,
        action: '',
      },
      usuarios: [],
      usuariosFiltrados: [],
      inputs: [
        { value: 'departamento_id', text: 'Departamento' },
        { value: 'rol', text: 'Rol' },
      ],
      searchTitle: 'depósito',
    };
  },
  computed: {
    usuariosAll() {
      return this.$store.state.users.users;
    },
    departamentos() {
      return this.$store.getters['departamentos/conUsuarios'];
    },
    filtrados() {
      return this.$store.state.users.filtrados;
    },
    // Devuelve objectos con formato { id: x, nombre: xxxx}
    // Son los roles traducidos Ej: { id: 2, nombre: Guardia}
    roles() {
      let rolesTraducidos = [];
      this.$store.getters['users/rolesConUsuarios'].forEach((rol) => {
        rolesTraducidos.push({
          id: rol,
          nombre: this.mostrarRol(rol),
        });
      });
      return rolesTraducidos;
    },
  },
  async mounted() {
    await this.$store.dispatch('users/all');
    await this.$store.dispatch('departamentos/all');
    this.cambiarFiltro('departamento_id');
  },
  methods: {
    seleccionarUsuario(action, user = null) {
      if (user) this.$store.dispatch('users/select', user);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    limpiar() {
      this.usuarios = this.usuariosAll;
    },
    filtrar() {
      this.usuarios = this.filtrados;
    },
    cambiarFiltro(dato) {
      this.usuariosFiltrados =
        dato === 'departamento_id' ? this.departamentos : this.roles;
      this.searchTitle = dato === 'departamento_id' ? 'departamento' : 'rol';
      this.limpiar();
    },
    mostrarRol(rol) {
      switch (parseInt(rol)) {
        case 1:
          rol = 'Usuario';
          break;
        case 2:
          rol = 'Guardia';
          break;
        case 3:
          rol = 'Administrador';
          break;
        default:
          rol = 'Sin asignar';
      }
      return rol;
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
