<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <!-- AGREGAR MATERIALES -->
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
              <b class="text-gray-800"> nuevo material.</b>
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
            @click="seleccionarMaterial('add')"
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
                    <th scope="col" class="table-th">Deposito</th>
                    <th scope="col" class="table-th">Categoria</th>
                    <th scope="col" class="table-th">Cantidad</th>
                    <th scope="col" class="table-th text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="material in materials" :key="material.id">
                    <td class="table-td">
                      {{ material.nombre }}
                    </td>
                    <td class="table-td text-gray-500">
                      {{ material.deposito }}
                    </td>
                    <td class="table-td text-gray-500">
                      {{ material.categoria }}
                    </td>
                    <td class="table-td text-gray-500">
                      {{ material.cantidad }}
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
                        @click="seleccionarMaterial('mod', material)"
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
      <LazyFormMaterialUpdate
        v-if="modal.action == 'mod'"
        :model="selectedmaterial"
        @close="modal.show = !modal.show"
      />
      <LazyFormMaterialCreate
        v-else-if="modal.action == 'add'"
        :model="selectedmaterial"
        @close="modal.show = !modal.show"
      />
    </LazyModal>
  </div>
</template>

<script>
import MaterialesService from '@/services/materiales.service';
export default {
  layout: 'AppLayout',
  data() {
    return {
      materials: [],
      selectedmaterial: {},
      header: {
        title: 'Depósitos',
        text: 'En los depósitos se encuentran los materiales, por ejemplo: Cure, Campus, etc.',
      },
      modal: {
        show: false,
        action: '',
      },
    };
  },
  async mounted() {
    await MaterialesService.index().then((res) => {
      this.materials = res.data;
    });
  },
  methods: {
    seleccionarMaterial(action, material = null) {
      if (material) {
        this.selectedmaterial = material;
      }
      this.modal.action = action;
      this.modal.show = !this.modal.show;
    },
  },
};
</script>

<style></style>
