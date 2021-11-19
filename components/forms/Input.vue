<template>
  <div>
    <label :for="id" class="form-label font-1" :class="{ 'sr-only': sr }">
      {{ label || name }}
    </label>
    <input
      :id="id"
      :value="value"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :required="required"
      :placeholder="placeholder"
      :class="{ error: error }"
      class="form-input-text"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('enter')"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], default: '' },
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: 'text' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    autocomplete: { type: String, default: 'on' },
    required: { type: Boolean, default: true },
    error: { type: Boolean, default: false },
    sr: { type: Boolean, default: true },
  },
};
</script>
