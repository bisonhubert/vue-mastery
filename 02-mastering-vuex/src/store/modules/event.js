import EventService from "@/services/EventService";

export const namespaced = true;

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
  getEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_EVENTS", response.data);
        commit("SET_EVENTS_COUNT", Number(response.headers["x-total-count"]));
      })
      .catch(error => {
        const message = `There was a problem getting events: ${error.message}`;
        const notification = {
          type: "error",
          message
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  getEvent({ commit, state, getters, dispatch }, id) {
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
          const message = `There was a problem getting event ${id}: ${error.message}`;
          const notification = {
            type: "error",
            message
          };
          dispatch("notification/add", notification, { root: true });
        });
    }
  },
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("CREATE_EVENT", event);
        const message = "Event created.";
        const notification = {
          type: "success",
          message
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const message = `There was a problem creating the event: ${error.message}`;
        const notification = {
          type: "error",
          message
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  }
};

export const getters = {
  eventList: state => state.events,
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
