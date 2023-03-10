<template>
  <div class="questionnaire-base" ref="questionnaire-base" :style="baseStyle">
    <div class="questionnaire-main" :style="questionnaireStyle">
      <h2 class="questionnaire-title">{{ title }}</h2>
      <div class="questionnaire-content">
        <div class="questionnaire-inner">
          <transition name="questionnaire-list">
            <keep-alive>
              <template v-for="item in items" :key="item.id">
                <questionnaire-list
                  v-if="currentItem.id === item.id"
                  :unit="unit"
                  :item="item"
                  :textKey="textKey"
                  :valueKey="valueKey"
                  :value="value"
                  :ignoreValue="ignoreValue"
                  @value-change="onValueChanged"
                ></questionnaire-list>
              </template>
            </keep-alive>
          </transition>
        </div>
      </div>
      <div class="questionnaire-nav prev" @click="toPrev" v-show="currentIndex > 0">
        <i>←</i>
      </div>
      <div class="questionnaire-nav next" @click="toNext" v-show="currentIndex < items.length - 1">
        <i>→</i>
      </div>
    </div>
    <div class="questionnaire-anchor" :style="anchorStyle">
      <questionnaire-anchor
        :width="anchorWidth"
        :selected-item="currentItem"
        :items="items"
        :unit="unit"
        :value="value"
        :ignoreValue="ignoreValue"
        :ignoreValueAnchor="ignoreValueAnchor"
        @click="onAnchorClicked"
      ></questionnaire-anchor>
      <div class="questionnaire-total">
        <Item label-width="60" content-width="40px" :title="totalText" text-align="right"
          >{{ total }} {{ unit }}</Item
        >
      </div>
    </div>
    <div
      class="questionnaire-description"
      v-if="description"
      :style="{ height: descriptionHeight + 'px' }"
    >
      <questionnaire-description
        v-if="typeof description === 'function'"
        :render="description"
      ></questionnaire-description>
      <pre v-else
        >{{ descriptionTitle }}
{{ description }}
        </pre
      >
    </div>
    <div class="questionnaire-btndiv">
      <slot name="footer">
        <input
          type="button"
          value="关闭"
          style="float: right; margin-right: 10px"
          @click="onClose"
        />
        <input
          type="button"
          value="保存"
          style="float: right; margin-right: 10px"
          @click="onClose"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import Item from '@components/layout/item/Item.vue'
import QuestionnaireList from './QuestionnaireList.vue'
import QuestionnaireAnchor from './QuestionnaireAnchor.vue'
import _ from 'lodash'
export default {
  name: 'questionnaire',
  components: {
    Item,
    'questionnaire-list': QuestionnaireList,
    'questionnaire-anchor': QuestionnaireAnchor,
    'questionnaire-description': () => import('./QuestionnaireDescription.vue')
  },
  props: {
    /** 问卷标题 */
    title: {
      type: String,
      default: '',
      require: true
    },
    /** 问卷说明 */
    description: {
      type: String,
      default: ''
    },
    /** 问卷的所有题目 */
    items: {
      type: Array,
      default: () => [],
      require: true
    },
    /** 问卷的值 支持v-model，但是暂不支持v-model。有计划将value改为对象类型以便包含total */
    modelValue: {
      type: Array,
      default: () => [],
      require: true
    },
    /** 全局单位，为方便计算总和，暂不支持各个题目独立单位。 */
    unit: {
      type: String,
      default: ''
    },
    /** 说明文字用的标题。 */
    descriptionTitle: {
      type: String,
      default: '说明：'
    },
    /** 说明的高度 */
    descriptionHeight: {
      type: Number,
      default: 150
    },
    /** 问卷题目锚点宽度 */
    anchorWidth: {
      type: Number,
      default: 150
    },
    /** 是否计算综合 */
    showTotal: {
      type: Boolean,
      default: false
    },
    enableSaveWhenFinished: {
      type: Boolean,
      default: false
    },
    clickToNext: {
      type: Boolean,
      default: false
    },
    /** 总分的文本 */
    totalText: {
      type: String,
      default: '总分'
    },
    /** 每个选项展示文本的键 */
    textKey: {
      type: String,
      default: 'text'
    },
    /** 每个选项取值的键 */
    valueKey: {
      type: String,
      default: 'value'
    },
    /** 如果是函数，返回true则忽略此值 */
    ignoreValue: {
      type: [Function, Number, String],
      default: null
    },
    /** 右侧锚点用回调 */
    ignoreValueAnchor: {
      type: Function
    }
  },
  data() {
    return {
      currentItem: this.items[0],
      currentIndex: 0,
      questionnaireStyle: { width: 'auto' },
      total: null,
      animationDirection: ''
    }
  },
  computed: {
    anchorStyle() {
      let result = {}
      result.width = this.anchorWidth + 'px'
      return result
    },
    baseStyle() {
      const defaultPaddingBottom = 46
      let result = {}
      result.paddingBottom = this.description
        ? this.descriptionHeight + defaultPaddingBottom + 'px'
        : defaultPaddingBottom + 'px'
      return result
    },
    disableSaveBtn() {
      let result = false
      if (this.enableSaveWhenFinished) {
        this.modelValue.findIndex((item) => item.value === undefined || item.value === null) >= 0
          ? (result = true)
          : null
      }
      return result
    }
  },
  emits: ['save', 'close', 'update:modelValue'],
  watch: {
    currentIndex(newValue, oldValue) {
      this.currentItem = this.items[newValue]
      // 用于计算动画的方向
      this.animationDirection =
        oldValue === undefined || oldValue === null
          ? 'right'
          : newValue - oldValue > 0
          ? 'right'
          : 'left'
    }
  },
  created() {
    if (this.modelValue.length === 0) {
      // 如果value为空， 初始化（虽然组件里也做了初始化的操作）
      this.items.forEach((item) => {
        this.modelValue.push({
          id: item.id,
          title: item.title,
          value: undefined,
          text: undefined
        })
      })
    }
    this.valueChangeDebounce = _.debounce(
      () => {
        this.toNext()
      },
      1000,
      { leading: false }
    )
  },
  mounted() {
    let baseEl = this.$refs['questionnaire-base']
    this.questionnaireStyle.width = baseEl.offsetWidth - this.anchorWidth + 'px'
  },
  methods: {
    onAnchorClicked({ item, index }) {
      this.currentIndex = index
    },
    onValueChanged(value, item) {
      if (this.clickToNext && value !== undefined && value !== null) {
        this.valueChangeDebounce()
      }
      this.calculateTotal()
    },
    calculateTotal() {
      let total = ''
      if (this.modelValue && this.modelValue.length > 0) {
        total = this.modelValue.reduce((pre, cur) => {
          return isNaN(cur.value) || this.handleIgnoreValue(cur) ? pre : pre + cur.value
        }, 0)
      }
      this.total = total
    },
    handleIgnoreValue(data) {
      if (typeof this.ignoreValue === 'function') {
        return this.ignoreValue(data)
      } else {
        this.ignoreValue === data.value
      }
    },
    toPrev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    toNext() {
      if (this.currentIndex < this.items.length - 1) {
        this.currentIndex++
      }
    },
    onSave() {
      this.$emit('save', this.modelValue, this.total)
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.questionnaire-base {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.questionnaire-main {
  position: relative;
  float: left;
  height: 100%;
  overflow: hidden;
  padding-top: 34px;
}

.questionnaire-title {
  position: absolute;
  background-color: @backcolor-white;
  top: 0;
  left: 0;
  right: 0;
}

.questionnaire-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  float: left;

  .questionnaire-inner {
    position: relative;
    overflow: hidden;
    height: 100%;
  }
}

.questionnaire-nav {
  transition-duration: @transition-duration;
  position: relative;
  float: left;
  width: 30px;
  height: 100%;
  user-select: none;
  cursor: pointer;
  opacity: 0.6;

  > * {
    font-size: 16x;
    position: absolute;
    top: 50%;
    left: 40%;
  }
}

.questionnaire-nav:hover {
  opacity: 1;

  > * {
    color: @color-blue;
  }
}

.questionnaire-nav.prev {
  margin-left: -100%;
  border-left: 1px solid @bordercolor-gray-light;
  background: linear-gradient(to right, rgba(@backcolor-gray, 0.3), rgba(0, 0, 0, 0));
}

.questionnaire-nav.next {
  margin-left: -30px;
  border-right: 1px solid @bordercolor-gray-light;
  background: linear-gradient(to left, rgba(@backcolor-gray, 0.3), rgba(0, 0, 0, 0));
}

.questionnaire-anchor {
  position: relative;
  float: right;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  padding: 0 0 40px 10px;
  border-left: 1px solid @bordercolor-gray-light;
  overflow: hidden;
}

.questionnaire-total {
  position: absolute;
  user-select: none;
  bottom: 4px;
}

.questionnaire-btndiv {
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
}

.questionnaire-description {
  width: 100%;
  float: left;
  padding: 0px 20px;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
}
</style>