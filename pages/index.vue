<template>
  <div class="bg-white max-w-6xl mx-auto">
    <!-- Navbar del documento -->
    <div>
      <div class="p-4 sm:pt-6 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between sm:h-10">
          <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div class="flex items-center justify-between w-full md:w-auto">
              <a
                href="https://isef.udelar.edu.uy/"
                target="_blank"
                class="
                  text-gray-900 text-3xl
                  sm:text-4xl
                  tracking-tight
                  font-semibold
                  flex
                  items-center
                "
              >
                <img
                  src="/img/isef.png"
                  alt="isef"
                  class="h-8 inline mr-3 sm:h-12 sm:mr-3.5"
                />
                ISEF
              </a>
              <!-- Boton navbar disponible en mobile -->
              <div class="-mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  class="menu-btn"
                  @click="showMenu = !showMenu"
                >
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <router-link
              to="/registro"
              class="font-medium text-gray-500 hover:text-gray-900"
              >Registrarme
            </router-link>
            <router-link
              to="/login"
              class="font-medium text-gray-500 hover:text-gray-900"
              >Iniciar sesión
            </router-link>
          </div>
        </nav>
      </div>
      <!--  Menu disponible en mobile -->
      <transition
        enter-active-class="duration-150 ease-out"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showMenu"
          class="
            absolute
            z-10
            top-0
            inset-x-0
            p-2
            transition
            transform
            origin-top-right
            md:hidden
          "
        >
          <div
            class="
              rounded-lg
              shadow-md
              bg-white
              ring-1 ring-black ring-opacity-5
              overflow-hidden
            "
          >
            <div class="px-5 pt-3 flex items-center justify-between">
              <a
                href="https://isef.udelar.edu.uy/"
                target="_blank"
                class="text-3xl tracking-tight font-semibold flex items-center"
              >
                <img
                  src="/img/isef.png"
                  alt="isef"
                  class="h-8 inline mr-3 sm:h-12 sm:mr-3.5"
                />
                ISEF
              </a>
              <div class="-mr-2">
                <button
                  type="button"
                  class="menu-btn"
                  @click="showMenu = !showMenu"
                >
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="px-2 pt-2 pb-3 space-y-1">
              <router-link to="/login" class="menu-item"
                >Iniciar sesión
              </router-link>
              <router-link to="/registro" class="menu-item"
                >Registrarme
              </router-link>
              <a
                href="https://isef.udelar.edu.uy/"
                target="_blank"
                class="menu-item"
                >Acerca de ISEF</a
              >
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- Cuerpo del documento -->
    <main
      class="
        mt-16
        mx-auto
        max-w-6xl
        px-4
        sm:mt-20 sm:px-6
        md:mt-28
        lg:mt-32 lg:px-8 lg:max-w-4xl
        xl:mt-40
      "
    >
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
  </div>
</template>

<script>
export default {
  layout: 'App',
  data() {
    return {
      showMenu: false,
    }
  },
}
</script>

<style lang="postcss" scoped>
.menu-item {
  @apply block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50;
}
.menu-btn {
  @apply bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500;
}
</style>
