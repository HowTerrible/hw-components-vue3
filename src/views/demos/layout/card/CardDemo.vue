<template>
  <div>
    <hw-card title="水能喝?" footer="关于这个困扰人类几千年的问题，专家给出了专业的解答">
      <p>
        水能喝是怎么回事呢？水相信大家都很熟悉，但是水能喝是怎么回事呢，下面就让小编带大家一起了解吧。
      </p>
      <p>
        水能喝，其实就是可以喝，大家可能会很惊讶水怎么会能喝呢？但事实就是这样，小编也感到非常惊讶。
      </p>
      <p>这就是关于水能喝的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！</p>
    </hw-card>
    <hw-card>
      <template v-slot:title>震惊，水居然能喝? 插槽版</template>
      <p>
        水能喝是怎么回事呢？水相信大家都很熟悉，但是水能喝是怎么回事呢，下面就让小编带大家一起了解吧。
      </p>
      <p>
        水能喝，其实就是可以喝，大家可能会很惊讶水怎么会能喝呢？但事实就是这样，小编也感到非常惊讶。
      </p>
      <p>这就是关于水能喝的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！</p>
      <template v-slot:footer>震惊，水居然能喝? 插槽版</template>
    </hw-card>
    <hw-card></hw-card>
    <hw-card></hw-card>
    <hw-card></hw-card>
  </div>
</template>

<script>
import Card from '@components/layout/card/Card.vue'
export default {
  name: 'hw-card-demo',
  components: {
    'hw-card': Card
  }
}
</script>

<style lang="less" scoped></style>