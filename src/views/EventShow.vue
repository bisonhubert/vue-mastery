<template>
  <div class="event-show">
    <h1>Event {{ id }} Details</h1>
    <div>{{ description }}</div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
  name: "EventShow",
  props: ["id"],
  data() {
    return {
      event: null
    };
  },
  computed: {
    description() {
      return this.event ? this.event.description : null;
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
