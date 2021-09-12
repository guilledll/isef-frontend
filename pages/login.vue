<template>
  <div
    class="
      min-h-screen
      flex
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center space-y-2">
        <h2 class="text-4xl font-extrabold text-gray-900">ISEF</h2>
        <p class="text-gray-500 text-xl">Gestión de materiales y reservas</p>
      </div>
      <form class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-2">
          <div>
            <label for="correo" class="sr-only">Correo o CI</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="input-text"
              placeholder="Correo o CI"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="input-text"
              placeholder="Contraseña"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="checkbox">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="check"
            />
            <label for="remember-me" class="text"> Recuerdame </label>
          </div>
          <div class="text-sm">
            <a
              href="#"
              class="
                text-base
                font-medium
                text-indigo-600
                hover:text-indigo-500
              "
            >
              Recuperar contraseña
            </a>
          </div>
        </div>
        <div>
          <button type="submit" class="btn-indigo">Iniciar sesión</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>
