import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";
import * as user from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
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
    },
    event: {}
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events.results = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_EVENTS_COUNT(state, count) {
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
          commit("SET_EVENTS", response.data);
          commit("SET_EVENTS_COUNT", Number(response.headers["x-total-count"]));
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    getEvent({ commit, state, getters }, id) {
      const event = getters.getEventById(id);
      if (event !== undefined) {
        if (id !== state.event.id) {
          commit("SET_EVENT", event);
        }
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit("SET_EVENT", response.data);
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
      }
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("CREATE_EVENT", event);
      });
    }
  },
  getters: {
    eventList: state => state.events,
    getEventById: state => id => {
      return state.events.results.find(event => event.id === id);
    }
  }
});
