<template>
  <div>
    <div class="relative px-4 py-3 sm:pt-6 sm:px-6 lg:px-8">
      <nav
        class="
          flex
          items-center
          justify-between
          flex-grow flex-shrink-0
          sm:h-10
        "
      >
        <div class="flex items-center justify-between w-full">
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
          <div class="sm:-mr-2 flex items-center">
            <div class="hidden md:block md:ml-12 md:pr-5">
              <div v-if="!auth" class="md:space-x-6">
                <router-link
                  v-for="(item, i) in filterButtons"
                  :key="i"
                  :to="item.path"
                  class="font-medium text-gray-500 hover:text-gray-900"
                  >{{ item.text }}
                </router-link>
              </div>
              <div v-else class="md:space-x-6">
                <router-link
                  v-for="(item, i) in filterButtons"
                  :key="i"
                  :to="item.path"
                  class="font-medium text-gray-500 hover:text-gray-900"
                  >{{ item.text }}
                </router-link>
              </div>
            </div>
            <MenuButton @clicked="hideMenu" />
          </div>
        </div>
      </nav>
      <!-- Menu desplegable -->
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
            sm:w-52 sm:right-2 sm:left-auto sm:top-2
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
              <router-link
                to="/inicio"
                class="
                  text-3xl
                  tracking-tight
                  font-semibold
                  flex
                  items-center
                  sm:font-medium
                "
              >
                <img
                  src="/img/isef.png"
                  alt="isef"
                  class="h-8 inline mr-3 sm:h-12 sm:mr-3.5 sm:hidden"
                />
                ISEF
              </router-link>
              <MenuButton class="-mr-2" icon="x" @clicked="hideMenu" />
            </div>
            <div class="px-2 pt-2 pb-3 space-y-1" @click="hideMenu">
              <MenuILinks :items="filterButtons" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    MenuILinks: () => import('@/components/topbar/MenuLinks'),
    MenuButton: () => import('@/components/buttons/MenuButton'),
  },
  data() {
    return {
      showMenu: false,
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth.loggedIn
    },
    user() {
      return this.$store.state.auth.user
    },
    admin() {
      return this.user.rol === 3
    },
    topbarLink() {
      return this.auth ? '/inicio' : '/'
    },
    menuItems() {
      return [
        {
          text: 'Perfil',
          path: '/perfil',
          show: this.auth,
        },
        {
          text: 'Reservas',
          path: '/reservas',
          show: this.auth,
        },
        {
          text: 'Depósitos',
          path: '/depositos',
          show: this.auth && this.admin,
        },
        {
          text: 'Registros',
          path: '/inventario',
          show: this.auth && this.admin,
        },
        {
          text: 'Iniciar sesión',
          path: '/login',
          show: !this.auth,
        },
        {
          text: 'Registrarme',
          path: '/registro',
          show: !this.auth,
        },
      ]
    },
    filterButtons() {
      return this.menuItems.filter((btn) => btn.show)
    },
  },
  methods: {
    hideMenu() {
      this.showMenu = !this.showMenu
    },
  },
}
</script>
