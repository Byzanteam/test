import Vue from 'vue'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import Button from './button.vue'

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
}

export const Basic = () => Vue.extend({
  components: { Button },
  props: {
    type: {
      default: text('button type', 'primary'),
    },
  },
  methods: { onClick: action('button-click') },
  template: '<Button :type="type" @click="onClick">Click</Button>',
})
