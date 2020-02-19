<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in eventList" :key="event.id" :event="event" />
    <template v-if="!isFirstPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
    </template>
    <span v-if="!isFirstPage && !isLastPage"> | </span>
    <template v-if="!isLastPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
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
  data() {
    return {
      perPage: 3
    };
  },
  computed: {
    ...mapState(["events", "user"]),
    eventList() {
      return this.events.results;
    },
    eventCount() {
      return this.events.count;
    },
    page() {
      return Number(this.$route.query.page) || 1;
    },
    isFirstPage() {
      return this.page === 1;
    },
    isLastPage() {
      return this.page >= this.eventCount / this.perPage;
    }
  },
  created() {
    this.$store.dispatch("getEvents", {
      perPage: this.perPage,
      page: this.page
    });
  },
  watch: {
    page(nextPage) {
      this.$store.dispatch("getEvents", {
        perPage: this.perPage,
        page: nextPage
      });
    }
  }
};
</script>
