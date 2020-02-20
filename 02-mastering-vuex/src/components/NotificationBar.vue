<template>
  <div class="notification-bar" :class="typeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
export default {
  name: "NotificationBar",
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    typeClass() {
      return `-text-${this.notification.type}`;
    }
  }
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
.text-error {
  color: red;
}
.text-success {
  color: green;
}
</style>
