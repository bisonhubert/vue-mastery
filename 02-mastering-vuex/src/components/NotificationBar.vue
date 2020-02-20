<template>
  <div v-if="timeout !== null" class="notification-bar" :class="typeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NotificationBar",
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  computed: {
    typeClass() {
      return `-text-${this.notification.type}`;
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification.id), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    ...mapActions("notification", ["remove"])
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
