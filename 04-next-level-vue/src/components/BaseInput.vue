<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <datepicker v-if="type === 'datepicker'" @input="updateValue" :placeholder="placeholder" />
    <input v-else :type="type" :value="value" :placeholder="placeholder" @input="updateValue"/>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "BaseInput",
  components: {
    Datepicker
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    value: [String, Number],
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>
