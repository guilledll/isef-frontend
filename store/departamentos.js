import DepartamentosService from '@/services/departamentos.service';

export const state = () => ({
  departamentos: [],
  departamento: null,
});
export const mutations = {
  SELECT_DEPARTAMENTO(state, departamento) {
    state.departamento = departamento;
  },
  CLEAR_SELECTED(state) {
    state.departamento = null;
  },
  GET_ALL_DEPARTAMENTOS(state, departamentos) {
    state.departamentos = departamentos;
  },
  ADD_DEPARTAMENTO(state, departamento) {
    state.departamentos.push(departamento);
  },
  MOD_DEPARTAMENTO(state, departamentos) {
    state.departamentos = state.departamentos.map((dep) =>
      dep.id == departamentos.id ? { ...dep, nombre: departamentos.nombre } : dep
    );
  },
  DEL_DEPARTAMENTO(state, id) {
    state.departamentos.map((dep, index) => {
      dep.id == id ? state.departamentos.splice(index, 1) : dep;
    });
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_DEPARTAMENTO', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  async get(context, id) {
    return await DepartamentosService.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  async getAll(context) {
    return await DepartamentosService.index().then((res) => {
      context.commit('GET_ALL_DEPARTAMENTOS', res.data);
    });
  },
  async create(context, data) {
    return await DepartamentosService.create(data).then(() => {
      context.commit('ADD_DEPARTAMENTO', data);
    });
  },
  async update(context, data) {
    return await DepartamentosService.update(data.id, data).then(() => {
      context.commit('MOD_DEPARTAMENTO', data);
    });
  },
  async delete(context, id) {
    return await DepartamentosService.delete(id).then(() => {
      context.commit('DEL_DEPARTAMENTO', id);
    });
  },
};

export const getters = {};
