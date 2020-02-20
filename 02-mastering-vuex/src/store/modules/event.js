import EventService from "@/services/EventService";

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
};

export const mutations = {
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  SET_EVENTS_COUNT(state, count) {
    state.events.eventsTotal = count;
  },
  CREATE_EVENT(state, event) {
    state.events.push(event);
  }
};

export const actions = {
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
};

export const getters = {
  eventList: state => state.events,
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
