<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <hr class="mb-6 w-full" />
    <div class="grid lg:grid-cols-2 gap-3">
      <div
        v-for="(boton, index) in botones"
        v-show="boton.show"
        :key="index"
        class="admin-button"
        :class="definirColor(index)"
        @click="goTo(boton.ruta)"
      >
        <GlobalSvg :svg="boton.svg" class="h-5 w-5 mr-1.5 lg:h-8 lg:w-8" />
        {{ boton.texto }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      pageHeader: {
        title: 'Administración',
        text: 'Panel de gestión central para administradores.',
      },
    };
  },
  computed: {
    existen() {
      return this.$store.state.global.existen;
    },
    botones() {
      return [
        {
          texto: 'Gestionar usuarios',
          ruta: 'usuarios',
          svg: 'user-group',
          show: true,
        },
        {
          texto: 'Mostrar informes',
          ruta: '',
          svg: 'clipboard-list',
          show: true,
        },
        {
          texto: 'Ver reservas',
          ruta: 'guardia',
          svg: 'pencil',
          show: this.existen.materiales && this.existen.depositos,
        },
        {
          texto: 'Gestión de materiales',
          ruta: 'materiales',
          svg: 'cube',
          show: true,
        },
        {
          texto: 'Ver depósitos',
          ruta: 'depositos',
          svg: 'office-building',
          show: true,
        },
        {
          texto: 'Movimientos inventario',
          ruta: 'inventario',
          svg: 'view-list',
          show: this.existen.materiales,
        },
      ];
    },
  },
  methods: {
    goTo(ruta) {
      this.$router.push(`/${ruta}`);
    },
    definirColor(pasada) {
      return pasada == 0 || pasada == 3 || pasada == 4 ? 'green' : 'blue';
    },
  },
};
</script>
<style lang="postcss" scoped>
.admin-button {
  @apply text-white text-lg h-16 text-center font-bold uppercase rounded-md flex items-center justify-center cursor-pointer lg:text-3xl lg:h-36;
  &.blue {
    @apply bg-blue-500 hover:bg-blue-400;
  }
  &.green {
    @apply bg-green-500 hover:bg-green-400;
  }
}
</style>
