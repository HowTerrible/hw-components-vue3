<template>
  <input class="hw-input" type="text" v-bind="$attrs" />
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hw-input {
  display: inline-block;
  height: @height;
}

.hw-input.small {
  height: @hegiht-small;
}
</style>
