<template>
  <div
    class="hw-drawer-base"
    :class="[direction, open ? 'open' : '']"
    :style="{
      height,
      width
    }"
    v-transfer-dom
    :data-transfer="!notTransfer"
  >
    <div class="hw-drawer-header">
      <div class="hw-drawer-title">{{ title }}</div>
      <div class="hw-drawer-btn">
        <input type="button" value="×" @click="$emit('update:open', false)" />
      </div>
    </div>
    <div class="hw-drawer-content"><slot></slot></div>
    <div class="hw-drawer-footer"><slot name="footer"></slot></div>
  </div>
</template>

<script>
import { TransferDom } from '@directives/transfer-dom'
export default {
  directives: { TransferDom },
  name: 'hw-drawer',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '500px'
    },
    width: {
      type: String,
      default: '800px'
    },
    title: {
      type: String
    },
    notTransfer: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'bottom',
      validator: (item) =>
        [
          'top-left',
          'top',
          'top-right',
          'right-top',
          'right',
          'right-bottom',
          'bottom-right',
          'bottom',
          'bottom-left',
          'left-bottom',
          'left',
          'left-top'
        ].indexOf(item) > 0
    }
  },
  emits: ['update:open']
}
</script>

<style lang="less" scoped>
.hw-drawer-base {
  position: absolute;
  border: 1px solid @bordercolor-gray-light;
  background-color: @backcolor-white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: @transition-duration-slow;

  > * {
    padding: 20px;
  }

  .hw-drawer-header {
    height: 40px;
    border-bottom: 1px solid @bordercolor-gray-light;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hw-drawer-content {
    height: 100%;
    flex: 1;
    overflow-y: auto;
  }

  &.top-right {
    right: 0;
    top: 0;
    transform: translateY(-100%);
    &.open {
      transform: translateY(0);
    }
  }
  &.top {
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    &.open {
      transform: translateX(-50%) translateY(0);
    }
  }
  &.top-left {
    left: 0;
    top: 0;
    transform: translateY(-100%);
    &.open {
      transform: translateY(0);
    }
  }

  &.right-top {
    right: 0;
    top: 0;
    transform: translateX(100%);
    &.open {
      transform: translateX(0);
    }
  }
  &.right {
    right: 0;
    top: 50%;
    transform: translateX(100%) translateY(-50%);
    &.open {
      transform: translateX(0) translateY(-50%);
    }
  }
  &.right-bottom {
    right: 0;
    bottom: 0;
    transform: translateX(100%);
    &.open {
      transform: translateX(0);
    }
  }

  &.bottom-right {
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    &.open {
      transform: translateY(0);
    }
  }
  &.bottom {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    &.open {
      transform: translateX(-50%) translateY(0);
    }
  }
  &.bottom-left {
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    &.open {
      transform: translateY(0);
    }
  }

  &.left-top {
    left: 0;
    top: 0;
    transform: translateX(-100%);
    &.open {
      transform: translateX(0);
    }
  }
  &.left {
    left: 0;
    top: 50%;
    transform: translateX(-100%) translateY(-50%);
    &.open {
      transform: translateX(0) translateY(-50%);
    }
  }
  &.left-bottom {
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    &.open {
      transform: translateX(0);
    }
  }
}
</style>