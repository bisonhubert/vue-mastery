<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" :value="value" :placeholder="placeholder" @input="updateValue"/>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number],
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
