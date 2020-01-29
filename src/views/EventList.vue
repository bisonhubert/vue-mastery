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
import EventService from "@/services/EventService";

export default {
  name: "EventList",
  components: {
    EventCard
  },
  data() {
    return {
      eventsList: []
    };
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.eventsList = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped></style>
