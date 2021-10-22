import DepositosService from '@/services/depositos.service';

export const state = () => ({
  depositos: [],
  deposito: null,
});

export const mutations = {
  SELECT_DEPOSITO(state, deposito) {
    state.deposito = deposito;
  },
  CLEAR_SELECTED(state) {
    state.deposito = null;
  },
  GET_ALL_DEPOSITOS(state, depositos) {
    state.depositos = depositos;
  },
  ADD_DEPOSITO(state, deposito) {
    state.depositos.push(deposito);
  },
  MOD_DEPOSITO(state, depositos) {
    state.depositos = state.depositos.map((dep) =>
      dep.id == depositos.id ? { ...dep, nombre: depositos.nombre } : dep
    );
  },
  DEL_DEPOSITO(state, id) {
    state.depositos.map((dep, index) => {
      dep.id == id ? state.depositos.splice(index, 1) : dep;
    });
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_DEPOSITO', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  get(context, id) {
    return DepositosService.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  all(context) {
    return DepositosService.index().then((res) => {
      context.commit('GET_ALL_DEPOSITOS', res.data);
    });
  },
  create(context, data) {
    return DepositosService.create(data).then((res) => {
      res.data.departamento = data.departamento;
      context.commit('ADD_DEPOSITO', res.data);
    });
  },
  update(context, data) {
    return DepositosService.update(data.id, data).then(() => {
      context.commit('MOD_DEPOSITO', data);
    });
  },
  delete(context, id) {
    return DepositosService.delete(id).then(() => {
      context.commit('DEL_DEPOSITO', id);
      context.commit('CLEAR_SELECTED');
    });
  },
};

export const getters = {};