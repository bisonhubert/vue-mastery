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
    events: []
  },
  mutations: {
    GET_EVENTS(state, events) {
      state.events = events;
    },
    CREATE_EVENT(state, event) {
      state.events.push(event);
    }
  },
  actions: {
    getEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit("GET_EVENTS", response.data);
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
