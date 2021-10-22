<template>
  <div>
    <div class="px-4 py-3 sm:pt-6 sm:px-6 lg:px-8">
      <nav class="flex items-center justify-between sm:h-10">
        <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
          <div class="flex items-center justify-between w-full md:w-auto">
            <router-link
              :to="topbarLink"
              class="
                text-gray-900 text-3xl
                md:text-4xl
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
            </router-link>
            <!-- Boton navbar disponible en mobile -->
            <div class="-mr-2 flex items-center md:hidden">
              <TopbarMenuButton @clicked="hideMenu" />
            </div>
          </div>
        </div>
        <div
          v-if="showActions"
          class="hidden md:block md:ml-10 md:pr-4 md:space-x-8"
        >
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
    <!-- Menu disponible en mobile -->
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
              <TopbarMenuButton icon="x" @clicked="hideMenu" />
            </div>
          </div>
          <div class="px-2 pt-2 pb-3 space-y-1" @click="hideMenu">
            <TopbarMenuLinks :items="menuItems" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      menuItems: [
        {
          text: 'Iniciar sesión',
          path: '/login',
        },
        {
          text: 'Registrarme',
          path: '/registro',
        },
      ],
    };
  },
  computed: {
    auth() {
      return this.$store.state.auth.loggedIn;
    },
    topbarLink() {
      return this.auth ? '/inicio' : '/';
    },
    showActions() {
      let pages = ['validar']; // Paginas en las que no se debe mostar la cabecera
      return pages.indexOf(this.$route.name) == -1;
    },
  },
  methods: {
    hideMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
