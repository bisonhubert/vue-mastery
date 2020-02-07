<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import EventCard from "@/components/EventCard.vue";

export default {
  components: {
    EventCard
  },
  computed: {
    ...mapState(["events"])
  },
  created() {
    this.$store.dispatch("initializeEventList");
  }
};
</script>
