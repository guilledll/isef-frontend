<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <!-- Listar Usuarios -->
      <div class="w-full gap-3 lg:order-last lg:w-72 lg:block"></div>
      <!-- TABLA -->
      <div class="flex flex-col lg:flex-grow">
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full">
            <div
              class="shadow overflow-hidden border border-gray-200 sm:rounded"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="table-th">Nombre</th>
                    <th scope="col" class="table-th">Departamento</th>
                    <th scope="col" class="table-th">Rol</th>
                    <th scope="col" class="table-th text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="usuario in Usuarios" :key="usuario.id">
                    <td class="table-td">
                      {{ usuario.nombre }}
                    </td>
                    <td class="table-td text-gray-500">
                      {{ usuario.departamento_id }}
                    </td>
                    <td
                      class="table-td text-gray-500"
                      :class="[
                        {
                          'text-red-500': usuario.rol === 0,
                        },
                        {
                          'text-green-500': usuario.rol === 2,
                        },
                      ]"
                    >
                      {{ mostrarRol(usuario.rol) }}
                    </td>
                    <td class="table-td text-right">
                      <button v-if="false" class="table-btn group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="group-hover:text-gray-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <button
                        class="table-btn group"
                        @click="seleccionarUsuario('mod', usuario)"
                      >
                        <svg
                          class="group-hover:text-gray-900"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LazyModal v-if="modal.show">
      <LazyFormUsuarioRol
        v-if="modal.action == 'mod'"
        :model="selectedUsuario"
        @close="modal.show = !modal.show"
      />
      <LazyFormusUsuarioCreate
        v-else-if="modal.action == 'add'"
        :model="selectedUsuario"
        @close="modal.show = !modal.show"
      />
    </LazyModal>
  </div>
</template>

<script>
import usuarioService from '@/services/user.service';
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
      modal: {
        show: false,
        action: '',
      },
    };
  },
  async mounted() {
    await usuarioService.index().then((res) => {
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
      return rol === 1
        ? 'Usuario'
        : rol === 2
        ? 'Guardia'
        : rol === 3
        ? 'Administrador'
        : 'Sin asignar';
    },
  },
};
</script>

<style></style>
