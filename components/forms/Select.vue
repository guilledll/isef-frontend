<template>
  <div>
    <label :for="id" class="font-1" :class="{ 'sr-only': sr }">
      {{ label || name }}
    </label>
    <select
      :id="id"
      :name="name"
      :required="required"
      :class="{ error: error }"
      class="form-select bg-white h-11 text-gray-900"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @change="change($event)"
    >
      <slot name="options"></slot>
    </select>
    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    required: { type: Boolean, default: true },
    error: { type: Boolean, default: false },
    sr: { type: Boolean, default: true },
  },
  methods: {
    // Emite el texto del <option>
    change(event) {
      this.$emit(
        'change',
        event.target[event.target.options.selectedIndex].text
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
label {
  @apply inline-block mb-1.5 text-base md:text-lg;
}
</style>
