<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <hr class="my-5" />
    <FormReservaReportar></FormReservaReportar>
  </div>
</template>
<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      pageHeader: {
        title: 'Ingresar reporte',
        text: 'Envía un reporte al administrador del sistema para informarle sobre un material dañado.',
      },

    };
  },
};
</script>

<style></style>
