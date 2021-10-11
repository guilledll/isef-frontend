<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <!-- AGREGAR DEPARTAMENTO -->
      <div class="w-full gap-3 lg:order-last lg:w-72 lg:block">
        <div
          class="
            flex
            items-center
            justify-between
            h-auto
            bg-gray-50
            border border-green-100
            rounded-md
            p-2
            lg:flex-col lg:top-0 lg:sticky lg:border-green-200
          "
        >
          <div class="flex pl-1 lg:block">
            <span class="text-sm sm:text-base lg:text-lg">
              Agregar un
              <b class="text-gray-800"> nuevo departamento.</b>
            </span>
          </div>
          <button
            class="
              flex
              items-center
              justify-center
              rounded-md
              text-white
              h-full
              px-1.5
              py-2
              bg-green-600
              hover:bg-green-500
              sm:p-2.5
              lg:w-full lg:h-auto lg:mt-3
            "
            @click="seleccionarDepartamento('add')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
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
                    <th scope="col" class="table-th text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="departamento in departamentos"
                    :key="departamento.id"
                  >
                    <td class="table-td">
                      <router-link
                        :to="`/departamentos/${departamento.id}`"
                        class="text-black hover:text-blue-600 hover:underline"
                        @click.native="
                          seleccionarDepartamento('view', departamento)
                        "
                      >
                        {{ departamento.nombre }}
                      </router-link>
                    </td>
                    <td class="table-td text-right">
                      <TableButton
                        svg="view"
                        @click="
                          $router.push(`/departamentos/${departamento.id}`)
                        "
                      />
                      <TableButton
                        v-if="!departamento.cantidad_materiales"
                        svg="del"
                        @click="seleccionarDepartamento('del', departamento)"
                      />
                      <TableButton
                        svg="mod"
                        @click="seleccionarDepartamento('mod', departamento)"
                      />
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
      <LazyFormDepartamentoUpdate
        v-if="modal.action == 'mod'"
        @close="modal.show = !modal.show"
      />
      <LazyFormDepartamentoCreate
        v-else-if="modal.action == 'add'"
        @close="modal.show = !modal.show"
      />
      <LazyFormDepartamentoDelete
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
      header: {
        title: 'Departamentos',
        text: 'En los departamentos.. etc.',
      },
      modal: {
        show: false,
        action: '',
      },
    };
  },
  computed: {
    departamentos() {
      return this.$store.state.departamentos.departamentos;
    },
  },
  async mounted() {
    this.$store.dispatch('departamentos/getAll');
  },
  methods: {
    seleccionarDepartamento(action, departamento = null) {
      if (departamento)
        this.$store.dispatch('departamentos/select', departamento);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
  },
};
</script>

<style></style>
