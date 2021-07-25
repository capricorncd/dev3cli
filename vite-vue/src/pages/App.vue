<template>
  <div>
    <h1>Counter: {{ counter }}</h1>
    <button class="mr10" @click="increase">increase</button>
    <button @click="decrease">decrease</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      counter: 0,
    }
  },
  methods: {
    increase(): void {
      this.counter++
    },
    decrease(): void {
      this.counter--
    },
  },
})
</script>

<style scoped>
h1 {
  color: chocolate;
}
button {
  cursor: pointer;
}
</style>
