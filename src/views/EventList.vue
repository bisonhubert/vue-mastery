<template>
  <div class="event-list">
    <h1>All Events</h1>
    <EventCard
      v-for="event in eventsList"
      :key="event.id"
      :event="event"
      :url="{ name: 'event-show', params: { id: event.id } }"
    />
  </div>
</template>

<script>
import EventCard from "@/components/EventCard";
import axios from 'axios';

export default {
  name: "EventList",
  components: {
    EventCard
  },
  data() {
    return {
      eventsList: []
    }
  },
  created() {
    axios
      .get('http://localhost:3000/events')
      .then(response => {
        this.eventsList = response.data
      })
  }
};
</script>

<style scoped></style>
