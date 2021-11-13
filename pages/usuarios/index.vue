<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div class="mb-6">
      <hr class="my-4" />
      <label for="filtro" class="font-1">
        <GlobalSvg class="h-6 w-6 mr-1 inline text-blue-500" svg="search" />
        Filtrar usuarios
      </label>
      <FormSelect
        id="departamento_id"
        v-model.trim="filtro.id"
        class="mt-2 mb-1"
        name="departamento_id"
        @change="filtrar"
      >
        <template #options>
          <option value="0">Seleccionar</option>
          <option
            v-for="(contenido, index) in contenidoFiltrado"
            :key="index"
            :value="contenido.id || contenido"
          >
            <span v-if="contenido.id"> {{ contenido.nombre }} </span>
            <span v-else> {{ mostrarRol(contenido) }}</span>
          </option>
        </template>
      </FormSelect>
      <div v-for="(f, i) in inputs" :key="`value-${i}`" class="inline mr-2">
        <input
          :id="`filtro-${i}`"
          v-model="filtro.contenido"
          :name="`filtro-${i}`"
          type="radio"
          :checked="f.value == filtro.contenido"
          :value="f.value"
          @change="cambiarFiltro"
        />
        <label :for="`filtro-${i}`">{{ f.text }}</label>
      </div>
    </div>
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
            <td class="table-td" :class="claseRol(user.rol)">
              {{ mostrarRol(user.rol) }}
            </td>
            <td class="table-td text-right">
              <TableButton
                type="view"
                @click="$router.push(`/users/${user.ci}`)"
              />
              <TableButton
                v-if="user.ci != $auth.user.ci"
                type="delete"
                @click="seleccionarUsuario('del', user)"
              />
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
      contenidoFiltrado: [],
      filtro: { contenido: 'departamento_id', id: 1 },
      inputs: [
        { value: 'departamento_id', text: 'Departamento' },
        { value: 'rol', text: 'Rol' },
      ],
    };
  },
  computed: {
    users() {
      return this.$store.state.users.users;
    },
    departamentos() {
      return this.$store.getters['departamentos/conUsuarios'];
    },
    filtrados() {
      return this.$store.state.users.filtrados;
    },
    roles() {
      return this.$store.getters['users/rolesConUsuarios'];
    },
  },
  async mounted() {
    await this.$store.dispatch('users/all');
    await this.$store.dispatch('departamentos/all');
    this.cambiarFiltro();
  },
  methods: {
    seleccionarUsuario(action, user = null) {
      if (user) this.$store.dispatch('users/select', user);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    filtrar() {
      this.$store.dispatch('users/filtrar', {
        contenido: this.filtro.contenido,
        id: this.filtro.id,
      });
      this.usuarios = this.filtrados;
    },
    cambiarFiltro() {
      this.contenidoFiltrado =
        this.filtro.contenido === 'departamento_id'
          ? this.departamentos
          : (this.contenidoFiltrado = this.roles);
      this.filtro.id = 0; //Limpia select
      this.usuarios = this.users;
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
    claseRol(rol) {
      return `rol-${rol}`;
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
