<template>
  <div>
    <h1>index de depositos</h1>
    {{ depositos }}
  </div>
</template>

<script>
import DepositosService from '@/services/depositos.service'
export default {
  layout: 'App',
  middleware: 'auth',
  data() {
    return {
      depositos: {},
    }
  },
  mounted() {
    DepositosService.index().then((res) => {
      this.depositos = res.data
    })
  },
  methods: {},
}
</script>

<style></style>
