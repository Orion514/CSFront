<template>
  <div class="box">
    <tree/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import tree from '@/components/tree/index.vue'

export default defineComponent({
  components: {
    tree
  }
})
</script>

<style lang="scss" scoped>
  .box {
    padding: 15px;
  }
</style>
