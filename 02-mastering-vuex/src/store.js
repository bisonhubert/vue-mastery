import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    events: {
      results: [],
      count: 0
    }
  },
  mutations: {
    GET_EVENTS(state, events) {
      state.events.results = events;
    },
    GET_EVENTS_COUNT(state, count) {
      state.events.count = count;
    },
    CREATE_EVENT(state, event) {
      state.events.results.push(event);
    }
  },
  actions: {
    getEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit("GET_EVENTS", response.data);
          commit("GET_EVENTS_COUNT", Number(response.headers["x-total-count"]));
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("CREATE_EVENT", event);
      });
    }
  },
  getters: {
    eventList: state => state.events
  }
});
