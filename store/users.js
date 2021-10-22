import UsersService from '@/services/users.service';

export const state = () => ({
  users: [],
  user: null,
});

export const mutations = {
  SELECT_USUARIO(state, user) {
    state.user = user;
  },
  CLEAR_SELECTED(state) {
    state.user = null;
  },
  GET_ALL_USERS(state, users) {
    state.users = users;
  },
  UPDATE_ROL(state, users) {
    state.users = state.users.map((user) =>
      user.ci == users.ci ? { ...user, rol: users.rol } : user
    );
  },
  DEL_USUARIO(state, ci) {
    state.users.map((user, index) => {
      user.ci == ci ? state.users.splice(index, 1) : user;
    });
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_USUARIO', data);
  },
  get(context, ci) {
    return UsersService.show(ci).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  all(context) {
    return UsersService.index().then((res) => {
      context.commit('GET_ALL_USERS', res.data);
    });
  },
  register(context, data) {
    return UsersService.register(data).then(() => {
      context.dispatch('emailVerification', data);
    });
  },
  emailVerification(context, data) {
    return UsersService.emailVerification(data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  updateRol(context, data) {
    return UsersService.updateRol(data.ci, data).then(() => {
      context.commit('UPDATE_ROL', data);
    });
  },
  delete(context, ci) {
    return UsersService.delete(ci).then(() => {
      context.commit('DEL_USUARIO', ci);
      context.commit('CLEAR_SELECTED');
    });
  },
};
