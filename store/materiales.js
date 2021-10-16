import MaterialesService from '@/services/materiales.service';

export const state = () => ({
  materiales: [],
  material: null,
});

export const mutations = {
  SELECT_MATERIAL(state, material) {
    state.material = material;
  },
  CLEAR_SELECTED(state) {
    state.material = null;
  },
  GET_ALL_MATERIALES(state, materiales) {
    state.materiales = materiales;
  },
  ADD_MATERIAL(state, material) {
    state.materiales.push(material);
  },
  MOD_MATERIAL(state, materiales) {
    state.materiales = state.materiales.map((dep) =>
      dep.id == materiales.id ? { ...dep, nombre: materiales.nombre } : dep
    );
  },
  DEL_MATERIAL(state, id) {
    state.materiales.map((dep, index) => {
      dep.id == id ? state.materiales.splice(index, 1) : dep;
    });
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_MATERIAL', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  async get(context, id) {
    return await MaterialesService.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  async all(context) {
    return await MaterialesService.index().then((res) => {
      context.commit('GET_ALL_MATERIALES', res.data);
    });
  },
  async create(context, data) {
    return await MaterialesService.create(data).then((res) => {
      context.commit('ADD_MATERIAL', res.data);
    });
  },
  async update(context, data) {
    return await MaterialesService.update(data.id, data).then(() => {
      context.commit('MOD_MATERIAL', data);
    });
  },
  async delete(context, id) {
    return await MaterialesService.delete(id).then(() => {
      context.commit('DEL_MATERIAL', id);
      context.commit('CLEAR_SELECTED');
    });
  },
};

export const getters = {};
