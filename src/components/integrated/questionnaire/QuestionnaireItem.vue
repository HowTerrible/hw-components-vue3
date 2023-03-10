<template>
  <li class="questionnaire-selection">
    <Checkbox
      ref="checkbox"
      @update:modelValue="localValueChanged"
      v-model="localValue"
      :true-value="localItem.checkboxValue"
      allowWrap
      :false-value="null"
      :text="localItem.text"
      :readonly="readonly"
    ></Checkbox>
    <span v-if="showScore" class="item-score">{{ localItem.value }} {{ unit }}</span>
  </li>
</template>

<script>
import Checkbox from '@components/form/checkbox/Checkbox.vue'
export default {
  name: 'questionnaire-item',
  components: {
    Checkbox
  },
  props: {
    item: {},
    /**
     * 选中结果后得得分单位
     */
    unit: {
      type: String,
      default: ''
    },
    startIndex: {
      type: Number,
      default: 0
    },
    index: {},
    modelValue: {},
    indexMappingToValue: {},
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * 如果问题得每个选项是对象格式，可以选配每个题目的【文本】对应的键
     */
    textKey: {
      type: String,
      default: 'text'
    },
    /**
     * 如果问题得每个选项是对象格式，可以选配每个题目的【值】对应的键
     */
    valueKey: {
      type: String,
      default: 'value'
    },
    /** 如果是函数，返回true则忽略此值 */
    ignoreValue: {
      type: [Function, Number, String],
      default: null
    }
  },
  computed: {
    showScore() {
      return typeof this.ignoreValue === 'function' ? !this.ignoreValue(this.localItem) : true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localItem: {},
      localValue: this.modelValue
    }
  },
  watch: {
    item: {
      handler(newValue) {
        if (!newValue) return
        let temp
        // 如果选项是基础数据类类型
        if (typeof newValue !== 'object') {
          // 如果下表对应值，则value是下标
          // 否则就是文本
          /**
           * 为每个项目增加checkboxValue，以处理值相同但选项不是同一个的情况
           */
          temp = this.indexMappingToValue
            ? {
                value: this.startIndex + this.index,
                text: newValue,
                checkboxValue: this.startIndex + this.index
              }
            : {
                value: newValue,
                text: newValue,
                checkboxValue: newValue
              }
        } else {
          temp = {
            text: newValue[this.textKey],
            value: newValue[this.valueKey]
          }
          temp.checkboxValue = newValue['checkboxValue'] || temp.value
        }
        this.localItem = temp
      },
      immediate: true
    },
    modelValue: {
      handler(newVal) {
        if (newVal) {
          let { value, index } = newVal
          // 值相等
          if (value === this.localItem.value) {
            // 有下表属性，则比较值的时候要带上下表
            if (index !== undefined && index !== null) {
              if (index === this.index) {
                // 下标相同，设置并设置选中
                this.localValue = this.localItem.checkboxValue
                this.setCheckbox(true)
              } else {
                // 下标不相同，不设值并设置未选中
                this.setCheckbox(false)
              }
            } else {
              // 没有index属性，直接赋值
              this.localValue = this.localItem.checkboxValue
              this.setCheckbox(true)
            }
          } else {
            this.localValue = value
            this.setCheckbox(false)
          }
        }
      },
      immediate: true
    },
    localValue() {
      // 因为值需要装箱并增加index属性，所以单独处理
      // this.$emit("update:modelValue", newValue);
    }
  },
  methods: {
    localValueChanged(newValue) {
      // 因为值需要装箱并增加index属性，所以单独处理
      if (newValue) {
        if (newValue === this.localItem.checkboxValue) {
          this.$emit('update:modelValue', {
            value: this.localItem.value,
            index: this.index
          })
        }
      } else {
        this.$emit('update:modelValue', { value: newValue, index: this.index })
      }
    },
    setCheckbox(result) {
      this.$refs && this.$refs.checkbox ? this.$refs.checkbox.setCheck(result) : null
    }
  }
}
</script>

<style lang="less" scoped>
.questionnaire-selection {
  list-style: none;
  margin: 10px 0;
  width: 100%;
  white-space: nowrap;
  padding-right: 40px;

  > *:nth-child(1) {
    width: 100%;
  }

  .selection-score {
    user-select: none;
    width: 40px;
    text-align: end;
    display: inline-block;
  }
}
</style>