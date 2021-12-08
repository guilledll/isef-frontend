<template>
  <div>
    <label :for="name" class="form-label font-1" :class="{ 'sr-only': !label }">
      {{ label || name }}
    </label>
    <DatePicker
      :id="name"
      v-model="data"
      :name="name"
      :type="type"
      :format="format"
      :minute-step="minuteStep"
      :show-second="showSecond"
      :clearable="clearable"
      :disabled-date="disabledDate"
      :input-class="['form-datepicker', { error: error }]"
    />
    <slot></slot>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/es';
export default {
  components: { DatePicker },
  props: {
    value: { type: Date, default: new Date() },
    type: { type: String, default: 'datetime' },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    name: { type: String, default: '' },
    minuteStep: { type: Number, default: 5 },
    showSecond: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    disabledDate: { type: Function, default: () => ({}) },
    label: { type: String, default: '' },
    error: { type: Boolean, default: false },
  },
  data() {
    return {
      data: this.value,
    };
  },
  watch: {
    data(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="postcss" scoped>
.mx-datepicker {
  @apply !w-full;
}
</style>
