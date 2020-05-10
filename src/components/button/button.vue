<template>
  <button :class="classes" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

interface ButtonProps {
  type: string
}

interface ButtonGetters {
  classes: Array<string>
}

export default Vue.extend<{}, {}, ButtonGetters, ButtonProps>({
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },

  computed: {
    classes() {
      return ['button', `button--${this.type}`]
    },
  },
})
</script>

<style lang="scss">
.button {
  outline: none;
}

.button--primary {
  color: tomato;
}

.button--disable {
  color: deepskyblue;
}
</style>
