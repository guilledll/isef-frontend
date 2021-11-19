import DepartamentosService from '@/services/departamentos.service';

export const state = () => ({
  departamentos: [],
  departamento: null,
  depositos: [],
  usuarios: [],
});

export const mutations = {
  SELECT_DEPARTAMENTO(state, departamento) {
    state.departamento = departamento;
  },
  CLEAR_SELECTED(state) {
    state.departamento = null;
    state.depositos = [];
    state.usuarios = [];
  },
  GET_ALL_DEPARTAMENTOS(state, departamentos) {
    state.departamentos = departamentos;
  },
  ADD_DEPARTAMENTO(state, departamento) {
    state.departamentos.push(departamento);
  },
  MOD_DEPARTAMENTO(state, departamentos) {
    state.departamentos = state.departamentos.map((dep) =>
      dep.id == departamentos.id
        ? { ...dep, nombre: departamentos.nombre }
        : dep
    );
  },
  DEL_DEPARTAMENTO(state, id) {
    state.departamentos.map((dep, index) => {
      dep.id == id ? state.departamentos.splice(index, 1) : dep;
    });
  },
  GET_DEPOSITOS(state, depositos) {
    state.depositos = depositos;
  },
  GET_USUARIOS(state, usuarios) {
    state.usuarios = usuarios;
  },
  FILTRAR_DEPARTAMENTOS(state, filtrados) {
    state.filtrados = filtrados;
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_DEPARTAMENTO', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  get(context, id) {
    return DepartamentosService.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  all(context) {
    return DepartamentosService.index().then((res) => {
      context.commit('GET_ALL_DEPARTAMENTOS', res.data);
    });
  },
  create(context, data) {
    return DepartamentosService.create(data).then((res) => {
      context.commit('ADD_DEPARTAMENTO', res.data);
    });
  },
  update(context, data) {
    return DepartamentosService.update(data.id, data).then((res) => {
      context.commit('MOD_DEPARTAMENTO', res.data);
      context.dispatch('select', res.data);
    });
  },
  delete(context, id) {
    return DepartamentosService.delete(id).then(() => {
      context.commit('DEL_DEPARTAMENTO', id);
      context.commit('CLEAR_SELECTED');
    });
  },
  depositos(context, id) {
    return DepartamentosService.depositos(id).then((res) => {
      context.commit('GET_DEPOSITOS', res.data);
    });
  },
  usuarios(context, id) {
    return DepartamentosService.usuarios(id).then((res) => {
      context.commit('GET_USUARIOS', res.data);
    });
  },
};
export const getters = {
  conDepositos(state) {
    return state.departamentos.filter((dep) => {
      return dep.depositos_count > 0;
    });
  },
  conUsuarios(state) {
    return state.departamentos.filter((dep) => {
      return dep.users_count > 0;
    });
  },
};
