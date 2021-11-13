export default {
  methods: {
    // Formatea la fecha de UTC a Local
    formatearFecha(fecha) {
      let f = new Date(fecha);
      return f.toLocaleString('es-UY', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
  },
};
