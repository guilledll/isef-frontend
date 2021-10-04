import DepositosService from '@/services/depositos.service';

export const state = () => ({
  depositos: [],
  deposito: {},
});

export const mutations = {
  SELECT_DEPOSITO(state, deposito) {
    state.deposito = deposito;
  },
  GET_ALL_DEPOSITOS(state, depositos) {
    state.depositos = depositos;
  },
  ADD_DEPOSITO(state, deposito) {
    state.depositos.push(deposito);
  },
  MOD_DEPOSITO(state, data) {
    state.depositos = state.depositos.map((dep) =>
      dep.id == data.id ? { ...dep, nombre: data.nombre } : dep
    );
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_DEPOSITO', data);
  },
  async getAll(context) {
    return await DepositosService.index().then((res) => {
      context.commit('GET_ALL_DEPOSITOS', res.data);
    });
  },
  async create(context, data) {
    return await DepositosService.create(data).then(() => {
      context.commit('ADD_DEPOSITO', data);
    });
  },
  async update(context, data) {
    return await DepositosService.update(data.id, data).then(() => {
      context.commit('MOD_DEPOSITO', data);
    });
  },
};

export const getters = {};
