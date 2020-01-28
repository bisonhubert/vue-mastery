<template>
  <div class="event-list">
    <h1>All Events</h1>
    <ul>
      <li v-for="event in eventsList" :key="event.id">
        {{ event.name }}
        <router-link :to="{ name: 'event-show', params: { id: event.id } }">
          See Details
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EventList",
  data() {
    return {
      eventsList: [{ id: 1, name: "Bachelor Party" }]
    };
  }
};
</script>
