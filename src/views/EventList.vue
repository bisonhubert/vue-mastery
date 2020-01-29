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

export default {
  name: "EventList",
  components: {
    EventCard
  },
  data() {
    return {
      eventsList: [
        {
          id: 1,
          name: "Bachelor Party",
          startDate: "Friday May 29, 2020",
          endDate: "Sunday May 31, 2020",
          checkIn: "3:00 PM",
          checkOut: "12:00PM",
          attendees: [
            { id: 1, name: "Tomas Rodriguez" },
            { id: 2, name: "James Bolotin" },
            { id: 3, name: "Joe Ott" },
            { id: 4, name: "Bryce Yockey" },
            { id: 5, name: "Grant Sloan" }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped></style>
