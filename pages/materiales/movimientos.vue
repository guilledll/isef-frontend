<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <hr class="my-5" />
    <FormMaterialCreate />
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      pageHeader: {
        title: 'Agregar materiales',
        text: 'Registrar materiales en el sistema. Ejemplo de materiales: Pelotas, Chalecos, Conos, etc.',
      },
    };
  },
};
</script>

<style></style>
