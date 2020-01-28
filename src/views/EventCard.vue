<template>
  <router-link :to="url" class="event-link">
    <div class="event-card -shadow">
      <span class="eyebrow">Starts at {{ event.checkIn }} on {{ event.startDate }}</span>
      <h4 class="title">{{ event.name }}</h4>
      <span>{{ event.attendees.length }} attending</span><br>
      <span>Ends {{ event.endDate }} at {{ event.checkOut }}</span>
      
    </div>
  </router-link>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true
    },
    url: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
