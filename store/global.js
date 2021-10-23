export const state = () => ({
  loading: false,
});

export const mutations = {
  SET_STATUS(state, status) {
    state.loading = status;
  },
};

export const actions = {
  loading(context, status) {
    context.commit('SET_STATUS', status);
  },
};
