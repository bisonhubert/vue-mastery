<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in eventIndex" :key="event.id" :event="event" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";

export default {
  components: {
    EventCard
  },
  computed: {
    ...mapGetters(['eventIndex'])
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.$store.dispatch('initializeEventList', response.data)
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>
