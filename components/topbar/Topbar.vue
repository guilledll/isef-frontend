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
            to="/inicio"
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
          <div class="-mr-2 flex items-center sm:mr-2">
            <div class="hidden md:block md:space-x-6">
              <router-link
                v-for="(item, i) in filterButtons"
                :key="i"
                :to="item.path"
                class="font-medium hover:text-gray-900"
                :class="[item.selected ? 'text-gray-900' : 'text-gray-500']"
                >{{ item.text }}
              </router-link>
            </div>
            <div class="block md:hidden md:ml-5">
              <TopbarMenuButton @clicked="hideMenu" />
            </div>
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
            md:w-52 md:right-2 md:left-auto md:top-2
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
              <LazyTopbarMenuButton
                class="-mr-2"
                icon="x"
                @clicked="hideMenu"
              />
            </div>
            <div class="px-2 pt-2 pb-3 space-y-1" @click="hideMenu">
              <TopbarMenuLinks :items="filterButtons" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    auth() {
      return this.$store.state.auth.loggedIn;
    },
    user() {
      return this.$store.state.auth.user;
    },
    admin() {
      return this.user.rol === 3;
    },
    menuItems() {
      return [
        {
          text: 'Perfil',
          path: '/perfil',
          selected: this.selected('perfil'),
          show: this.auth,
        },
        {
          text: 'Reservas',
          path: '/reservas',
          selected: this.selected('reservas'),
          show: this.auth,
        },
        {
          text: 'Depósitos',
          path: '/depositos',
          selected: this.selected('depositos'),
          show: this.auth && this.admin,
        },
        {
          text: 'Materiales',
          path: '/materiales',
          selected: this.selected('materiales'),
          show: this.auth && this.admin,
        },
        {
          text: 'Categorias',
          path: '/categorias',
          selected: this.selected('categorias'),
          show: this.auth && this.admin,
        },
        {
          text: 'Departamentos',
          path: '/departamentos',
          selected: this.selected('departamentos'),
          show: this.auth && this.admin,
        },
        {
          text: 'Registros',
          path: '/inventario',
          selected: this.selected('inventario'),
          show: this.auth && this.admin,
        },
      ];
    },
    filterButtons() {
      return this.menuItems.filter((btn) => btn.show);
    },
  },
  methods: {
    hideMenu() {
      this.showMenu = !this.showMenu;
    },
    selected(path) {
      return this.$route.path.includes(path);
    },
  },
};
</script>
