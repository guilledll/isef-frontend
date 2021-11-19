<template>
  <div>
    <label :for="id" class="form-label font-1" :class="{ 'sr-only': sr }">
      {{ label || name }}
    </label>
    <textarea
      :id="id"
      :value="value"
      :name="name"
      :required="required"
      :placeholder="placeholder"
      :class="{ error: error }"
      :rows="rows"
      class="form-input-text"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('enter')"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    ></textarea>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], default: '' },
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: true },
    error: { type: Boolean, default: false },
    sr: { type: Boolean, default: true },
    rows: { type: [String, Number], default: 3 },
  },
};
</script>
