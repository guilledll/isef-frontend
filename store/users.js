import UsersService from '@/services/users.service';

export const state = () => ({
  users: [],
  filtrados: [],
  user: null,
  roles: [0, 1, 2, 3],
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
  FILTRAR_USUARIOS(state, filtrados) {
    state.filtrados = filtrados;
  }
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
    return UsersService.updateRol(data.ci, data).then((res) => {
      context.commit('UPDATE_ROL', res.data);
      context.dispatch('select', res.data);
      context.dispatch('global/loading', false, { root: true });
    });
  },
  delete(context, ci) {
    return UsersService.delete(ci).then(() => {
      context.commit('DEL_USUARIO', ci);
      context.commit('CLEAR_SELECTED');
    });
  },
  filtar(context, { contenido, id }) {
    let filtrado = context.state.users.filter(user =>
      user[contenido] == id
    );
    context.commit('FILTRAR_USUARIOS', filtrado);
  }


};

export const
  getters = {
    rolesConUsuarios(state) {
      let rolesConUsuarios = [];
      state.roles.forEach((rol) => {
        if (state.users.some(u => u.rol == rol)) {
          rolesConUsuarios.push(rol);
        }
      });
      return rolesConUsuarios;
    },
    conRol: state => rol => {
      return state.users.filter(user => { return user.rol == rol });
    }
  }
