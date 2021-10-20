<template>
  <span class="error">
    {{ val ? validar(text) : text }}
  </span>
</template>

<script>
import { mensajes } from '@/services/validation.service';
import { validationMessage } from 'vuelidate-messages';
export default {
  props: {
    text: { type: [String, Object], default: 'Error de datos.' },
    val: { type: Boolean, default: true },
  },
  methods: {
    validar: validationMessage(mensajes),
  },
};
</script>

<style lang="postcss" scoped>
.error {
  @apply text-sm text-red-500 font-medium leading-relaxed;
}
</style>
