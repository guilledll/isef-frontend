<template>
  <div>
    <div class="rounded-xl bg-blue-500 px-8 py-6 w-full text-white">
      <h4 class="title">Categorías de materiales</h4>
      <span class="text-lg leading-5 font-medium">
        Listado de las categorías asignadas a los materiales. Como ejemplo
        algunas categorías pueden ser: Fútbol, Tennis, Pesas, Natación,
        Colchonetas, etc.
      </span>
    </div>
    <div class="w-full flex items-center justify-between mt-6 mb-10 gap-3">
      <div class="btn btn-options left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
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
        Materiales
      </div>
      <div class="btn btn-options right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
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
        Agregar categoría
      </div>
    </div>
    <div class="flex flex-col">
      <h4 class="font-medium mb-4 text-3xl text-gray-800">Categorías</h4>
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Departamento
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="categoria in categorias" :key="categoria.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ categoria.nombre }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                      {{ categoria.id }}
                    </div>
                  </td>
                  <td
                    class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-right text-sm
                      font-medium
                    "
                  >
                    <a
                      href="updateDeposito"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriasService from '@/services/categoria.service'
export default {
  layout: 'app.layout',
  middleware: 'admin.middleware',
  data() {
    return {
      categorias: {},
    }
  },
  mounted() {
    CategoriasService.index().then((res) => {
      this.categorias = res.data
    })
  },
}
</script>

<style lang="postcss" scoped>
.title {
  @apply font-medium text-4xl leading-6 mb-5;
}
.btn-options {
  @apply border border-transparent rounded-lg text-white text-center text-2xl h-16 cursor-pointer w-full;
  &.left {
    @apply bg-indigo-500 hover:bg-indigo-400;
  }
  &.right {
    @apply bg-green-500 hover:bg-green-600;
  }
}
</style>
