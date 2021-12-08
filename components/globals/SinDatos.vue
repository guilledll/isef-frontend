<template>
  <div class="flex flex-col items-center justify-center lg:flex-grow">
    <img
      class="h-40 my-8 m-auto md:h-52 md:my-16"
      src="/svg/empty.svg"
      alt="No hay datos"
    />
    <p class="font-1 text-lg md:text-xl">No hay {{ model }} en el sistema!</p>
  </div>
</template>

<script>
export default {
  props: {
    model: { type: String, default: 'nada' },
  },
};
</script>
