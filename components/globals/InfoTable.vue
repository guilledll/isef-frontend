<template>
  <div class="overflow-hidden">
    <div class="related-info" :class="{ 'mb-3': open }" @click="$emit('click')">
      <h4
        class="
          flex
          items-center
          gap-2
          text-base text-gray-800
          font-1
          md:text-lg
        "
      >
        <GlobalSvg class="h-5 w-5 md:h-7 md:w-7" :svg="svg" />
        {{ title }}
      </h4>
      <GlobalSvg
        class="h-6 w-6 transform"
        :class="{ 'rotate-180': open }"
        svg="chevron-down"
      />
    </div>
    <p
      v-if="open && count"
      class="text-sm font-semibold mb-1.5 text-gray-800 md:text-base"
    >
      Total de <span class="lowercase">{{ title }}</span> {{ count }}
    </p>
    <LazyTable v-if="open && count">
      <template #head>
        <TableHead :header="table" :action="action" />
      </template>
      <template #body>
        <slot></slot>
      </template>
    </LazyTable>
    <div v-else-if="open && !count" class="flex items-center flex-col">
      <img
        src="/svg/not_found.svg"
        alt="Revisión de perfil"
        class="h-40 my-8 m-auto md:h-52 md:my-16"
      />
      <h4 class="text-gray-800 text-xl leading-relaxed">
        No hay
        <span class="font-semibold lowercase">{{ title }}</span>
        registrados
      </h4>
      <hr class="mx-auto w-1/3 mt-3 mb-6 md:mb-0" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Relacionado' },
    table: { type: Array, default: () => [] },
    open: { type: Boolean, default: false },
    svg: { type: String, default: 'user-group' },
    count: { type: Number, default: 0 },
    action: { type: Boolean, default: false },
  },
};
</script>

<style lang="postcss" scoped>
.related-info {
  @apply flex justify-between items-center w-full p-2 border border-gray-200 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 md:px-4 md:py-3;
}
</style>
