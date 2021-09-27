<template>
  <div>
    <Header :title="header.title" :text="header.text" bg="bg-blue-600" />
    <div class="flex flex-col gap-3 md:flex-row">
      <!-- AGREGAR CATEGORIA -->
      <div
        class="
          flex
          items-center
          justify-between
          w-full
          gap-3
          border border-green-100
          bg-gray-50
          p-2
          rounded-md
          md:mb-10
        "
      >
        <div class="flex pl-1">
          <span>
            Agregar
            <b class="text-gray-800">nueva categoría</b>
            para materiales.
          </span>
        </div>
        <button
          class="
            flex
            items-center
            rounded-md
            h-full
            p-2.5
            bg-green-600
            hover:bg-green-500
          "
          @click="modal = !modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
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
      <!-- TABLA -->
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border border-gray-200 sm:rounded"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="table-th">Nombre</th>
                    <th scope="col" class="table-th">Materiales</th>
                    <th scope="col" class="table-th text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="categoria in categorias" :key="categoria.id">
                    <td class="table-td">
                      {{ categoria.nombre }}
                    </td>
                    <td class="table-td text-gray-500">
                      {{ categoria.materiales || 0 }}
                    </td>
                    <td class="table-td text-right">
                      <button class="table-btn group">
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
    <Modal v-if="modal" @close="modal = !modal" />
  </div>
</template>

<script>
import CategoriasService from '@/services/categoria.service'
import Header from '@/components/global/Header.vue'
export default {
  components: {
    Header,
    Modal: () => import('@/components/modals/Modal.vue'),
  },
  layout: 'app.layout',
  middleware: 'admin.middleware',
  data() {
    return {
      header: {
        title: 'Categorías de materiales',
        text: 'Los materiales pertenecen a categorías, por ejemplo: fútbol, pesas, atletismo, etc.',
      },
      categorias: {},
      modal: false,
    }
  },
  mounted() {
    CategoriasService.index().then((res) => {
      this.categorias = res.data
    })
  },
}
</script>
