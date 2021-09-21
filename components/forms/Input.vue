<template>
  <div>
    {{ value }}
    <label :for="id" :class="{ 'sr-only': sr }">{{ label }}</label>
    <input
      :id="id"
      :value="model.$model"
      :name="name"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :class="{ error: value.$anyError }"
      class="input-text"
      @input="setModel($event.target.value)"
    />
    <span v-if="model.$anyError" class="error">
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: '' },
    label: { type: String, default: '' },
    message: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    sr: { type: Boolean, default: true },
  },
  data() {
    return {
      model: '',
    }
  },
  methods: {
    setModel(value) {
      console.log(this.model, value, this.value)
      this.model = value
      this.value.$touch()
      console.log(this.model, value, this.value)
    },
  },
}
</script>

<style></style>
