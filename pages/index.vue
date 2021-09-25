<template>
  <main class="mt-6 mx-auto sm:mt-20 md:mt-28 lg:mt-32 lg:max-w-4xl xl:mt-40">
    <div class="text-center">
      <h1
        class="
          text-3xl
          tracking-tight
          font-extrabold
          text-gray-900
          sm:text-5xl
          md:text-6xl
        "
      >
        <span class="block xl:inline">Gestor de</span>
        <span class="text-indigo-600">materiales</span>
        y
        <span class="text-indigo-600">reservas</span>
      </h1>
      <p
        class="
          my-5
          mx-auto
          text-base text-gray-500
          sm:my-8 sm:text-lg sm:max-w-xl
          md:my-6 md:text-xl
        "
      >
        Sistema de gestión de inventario y reserva de materaieles disponibles
        para uso educativo en sedes ISEF Uruguay. Inicia sesión para reservar.
      </p>
      <div class="flex justify-center space-x-3 sm:mt-8">
        <router-link
          to="/login"
          class="
            flex
            items-center
            justify-center
            p-3
            border border-transparent
            text-base
            font-medium
            rounded-md
            text-white
            bg-green-500
            hover:bg-green-600
            md:py-4 md:text-lg md:px-10
          "
        >
          Iniciar sesión
        </router-link>
        <a
          href="https://isef.udelar.edu.uy/"
          target="_blank"
          class="
            flex
            items-center
            justify-center
            px-4
            py-3
            border border-transparent
            text-base
            font-medium
            rounded-md
            text-indigo-700
            bg-indigo-100
            hover:bg-indigo-200
            md:py-4 md:text-lg md:px-10
          "
        >
          Conoce ISEF
        </a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'out.layout',
}
</script>
