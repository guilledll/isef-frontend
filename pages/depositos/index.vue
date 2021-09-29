<template>
  <div>
    <div class="flex flex-col">
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
                      sm:px-6
                      px-3
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
                      sm:px-6
                      px-3
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
                  <th
                    scope="col"
                    class="
                      sm:px-6
                      px-3
                      py-3
                      text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                      text-right
                    "
                  >
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="deposito in depositos" :key="deposito.id">
                  <td class="sm:px-6 px-3 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="text-sm font-medium text-gray-900">
                        {{ deposito.nombre }}
                      </div>
                    </div>
                  </td>
                  <td class="sm:px-6 px-3 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">
                      {{ deposito.departamento }}
                    </div>
                  </td>
                  <td
                    class="
                      sm:px-6
                      px-3
                      py-4
                      whitespace-nowrap
                      text-right text-sm
                      font-medium
                    "
                  >
                    <a
                      class="text-indigo-600 hover:text-indigo-900"
                      @click="seleccionarDeposito(deposito, 'add')"
                      >Agregar</a
                    >
                  </td>

                  <td
                    class="
                      sm:px-6
                      px-3
                      py-4
                      whitespace-nowrap
                      text-right text-sm
                      font-medium
                    "
                  >
                    <a
                      class="text-indigo-600 hover:text-indigo-900"
                      @click="seleccionarDeposito(deposito, 'mod')"
                      >Editar</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="modal.show">
      <DepositoUpdate
        v-if="modal.action == 'mod'"
        :model="selectedDeposito"
        @close="modal.show = !modal.show"
      />
      <DepositoCreate
        v-else-if="modal.action == 'add'"
        :model="selectedDeposito"
        @close="modal.show = !modal.show"
      />
    </Modal>
  </div>
</template>

<script>
import DepositosService from '@/services/depositos.service'
export default {
  components: {
    Modal: () => import('@/components/modals/Modal'),
    DepositoUpdate: () => import('@/components/forms/DepositoUpdate'),
    DepositoCreate: () => import('@/components/forms/DepositoCreate'),
  },
  layout: 'app.layout',
  data() {
    return {
      depositos: [],
      selectedDeposito: {},
      modal: {
        show: false,
        action: '',
      },
    }
  },
  async mounted() {
    await DepositosService.index().then((res) => {
      this.depositos = res.data
    })
  },
  methods: {
    seleccionarDeposito(deposito, action) {
      this.selectedDeposito = deposito
      this.modal.action = action
      this.modal.show = !this.modal.show
    },
  },
}
</script>

<style></style>
