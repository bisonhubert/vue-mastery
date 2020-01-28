<template>
  <div>
    <h4>{{ name }}</h4>
    <router-link :to="url">Click to view details</router-link>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
h4 {
  color: green
}
</style>
