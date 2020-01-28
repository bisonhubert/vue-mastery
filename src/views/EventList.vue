<template>
  <div class="event-list">
    <h1>All Events</h1>
      <EventCard v-for="event in eventsList" :key="event.id" :name="event.name" :url="{ name: 'event-show', params: { id: event.id }}" />
  </div>
</template>

<script>
import EventCard from "@/views/EventCard"

export default {
  name: "EventList",
  components: {
    EventCard
  },
  data() {
    return {
      eventsList: [{ id: 1, name: "Bachelor Party" }]
    };
  }
};
</script>

<style scoped>
</style>
