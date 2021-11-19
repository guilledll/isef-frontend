<template>
  <div class="flex flex-col lg:flex-grow">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border border-gray-200 rounded">
          <table class="min-w-full divide-y divide-gray-200">
            <slot name="head"></slot>
            <tbody class="bg-white divide-y divide-gray-200">
              <slot name="body"></slot>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
