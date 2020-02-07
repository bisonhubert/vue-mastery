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
  name: "EventList",
  components: {
    EventCard
  },
  computed: {
    ...mapState(["events"]),
    page() {
      return this.$route.query.page || 1;
    }
  },
  created() {
    this.$store.dispatch("getEvents", { perPage: 3, page: this.page });
  }
};
</script>
