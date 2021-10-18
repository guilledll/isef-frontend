import UsersService from '@/services/users.service';

export const state = () => ({
  users: [],
  user: null,
});

export const mutations = {
  GET_ALL_USERS(state, users) {
    state.users = users;
  },
};

export const actions = {
  all(context) {
    return UsersService.index().then((res) => {
      context.commit('GET_ALL_USERS', res.data);
    });
  },
  register(context, data) {
    return UsersService.register(data);
  },
};
