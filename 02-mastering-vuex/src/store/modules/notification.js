export const namespaced = true;

export const state = {
  notifications: []
};

let nextId = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    });
  },
  DELETE(state, notificationId) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationId
    );
  }
};

export const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification);
  },
  remove({ commit }, notificationId) {
    commit("DELETE", notificationId);
  }
};
