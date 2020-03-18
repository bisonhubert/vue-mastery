<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @input="updateValue" v-on="$listeners">
      <option v-for="option in options" :key="option" :selected="option === value">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    label: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number]
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
