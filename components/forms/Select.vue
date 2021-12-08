<template>
  <div>
    <label :for="id" class="form-label font-1" :class="{ 'sr-only': !label }">
      {{ label || name }}
    </label>
    <select
      :id="id"
      :name="name"
      :required="required"
      :class="{ error: error }"
      :disabled="disabled"
      class="form-select"
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
    disabled: { type: Boolean, default: false },
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
