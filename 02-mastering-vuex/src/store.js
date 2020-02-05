import Vue from "vue";
import Vuex from "vuex";
import EventService from '@/services/EventService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: []
  },
  mutations: {
    INITIALIZE_EVENT_LIST(state, events) {
      state.events = events
    },
    CREATE_EVENT(state, event) {
      state.event.push(event)
    }
  },
  actions: {
    initializeEventList({ commit }, events) {
      commit('INITIALIZE_EVENT_LIST', events)
    },
    createEvent({ commit }, event) {
      EventService.postEvent(event)
      commit('CREATE_EVENT', event)
    }
  },
  getters: {
    eventIndex: state => state.events
  }
});
