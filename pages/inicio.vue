<template>
  <div>
    <!-- este archivo redirige al usuario cuando entra a la app -->
  </div>
</template>

<script>
export default {
  // Al cargar segun el rol, redirige al usuario
  middleware({ store, redirect }) {
    // Si es admin al panel
    if (store.$auth.user.rol === 3) {
      return redirect('/admin');
    }
    // Si es guardia al listado de reservas
    if (store.$auth.user.rol === 2) {
      return redirect('/guardia');
    }
    // Si es usuario a las reservas
    if (store.$auth.user.rol === 1) {
      return redirect('/reservas');
    }
    // Si es sin asignar a validar
    if (store.$auth.user.rol === 0) {
      return redirect('/auth/validar');
    }
  },
};
</script>

<style></style>
