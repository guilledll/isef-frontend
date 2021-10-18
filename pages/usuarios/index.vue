<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <!-- Listar Usuarios -->
      <div class="w-full gap-3 lg:order-last lg:w-72 lg:block"></div>
      <Table>
        <template #header>
          <TableHead :header="table.header" />
        </template>
        <template #body>
          <tr v-for="usuario in Usuarios" :key="usuario.id">
            <td class="table-td">
              <router-link
                :to="`/users/${usuario.ci}`"
                class="text-black hover:text-blue-600 hover:underline"
                @click.native="seleccionarUsuario('view', usuario)"
              >
                {{ usuario.nombre }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              <router-link
                :to="`/departamentos/${usuario.departamento_id}`"
                class="hover:text-blue-600 hover:underline"
                @click.native="verDepartamento(usuario)"
              >
                {{ usuario.departamento }}
              </router-link>
            </td>
            <td class="table-td" :class="`rol-${usuario.rol}`">
              {{ mostrarRol(usuario.rol) }}
            </td>
            <td class="table-td text-right">
              <TableButton
                svg="view"
                @click="$router.push(`/users/${usuario.ci}`)"
              />
              <TableButton
                svg="del"
                @click="seleccionarUsuario('del', usuario)"
              />
              <TableButton
                svg="mod"
                @click="seleccionarUsuario('mod', usuario)"
              />
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <LazyModal v-if="modal.show">
      <LazyFormUsuarioRol
        v-if="modal.action == 'mod'"
        :model="selectedUsuario"
        @close="modal.show = !modal.show"
      />
      <!-- <LazyFormUsuarioCreate
        v-else-if="modal.action == 'add'"
        :model="selectedUsuario"
        @close="modal.show = !modal.show"
      /> -->
    </LazyModal>
  </div>
</template>

<script>
import usuarioService from '@/services/users.service';
export default {
  layout: 'AppLayout',
  data() {
    return {
      Usuarios: [],
      selectedUsuario: {},
      header: {
        title: 'Usuarios',
        text: 'En los Usuarios.. etc.',
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
  mounted() {
    usuarioService.index().then((res) => {
      this.Usuarios = res.data;
    });
  },
  methods: {
    seleccionarUsuario(action, usuario = null) {
      if (usuario) {
        this.selectedUsuario = usuario;
      }
      this.modal.action = action;
      this.modal.show = !this.modal.show;
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
