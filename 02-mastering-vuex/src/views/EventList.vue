<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="!isFirstPage">
      <router-link :to="{ name: 'event-list', query: { page: prevPageNum }}" rel="prev">Prev Page</router-link>
    </template>
    <template v-if="!isLastPage">
      <router-link :to="{ name: 'event-list', query: { page: nextPageNum }}" rel="next">Next Page</router-link>
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
    }
  },
  computed: {
    ...mapState(["events"]),
    page() {
      return this.$route.query.page || 1;
    },
    isFirstPage() {
      return this.page === 1
    },
    isLastPage() {
      return this.page < (this.events / this.perPage)
    },
    prevPageNum() {
      return this.isFirstPage
        ? 1
        : this.page - 1
    },
    nextPageNum() {
      return this.isLastPage
        ? this.page
        : this.page + 1
    }
  },
  created() {
    this.$store.dispatch("getEvents", { perPage: this.perPage, page: this.page });
  },
  watch: {
    page(nextPage) {
      this.$store.dispatch("getEvents", { perPage: this.perPage, page: nextPage });
    }
  }
};
</script>
