<template>
  <div class="footer">
    <div class="footer-content">
      <hr class="w-5/6 mx-auto mb-4" />
      <span>Instituto Superior de Educación Física</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.footer {
  @apply flex justify-center items-center mt-10 text-center;
  & > .footer-content {
    @apply p-5 text-sm text-gray-500;
  }
}
</style>
