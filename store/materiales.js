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
    state.materiales = state.materiales.map((mat) =>
      mat.id == materiales.id ? { ...mat, nombre: materiales.nombre } : mat
    );
  },
  DEL_MATERIAL(state, id) {
    state.materiales.map((mat, index) => {
      mat.id == id ? state.materiales.splice(index, 1) : mat;
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
  get(context, id) {
    return MaterialesService.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  all(context) {
    return MaterialesService.index().then((res) => {
      context.commit('GET_ALL_MATERIALES', res.data);
    });
  },
  create(context, data) {
    return MaterialesService.create(data).then((res) => {
      context.commit('ADD_MATERIAL', res.data);
    });
  },
  update(context, data) {
    return MaterialesService.update(data.id, data).then(() => {
      context.commit('MOD_MATERIAL', data);
    });
  },
  delete(context, id) {
    return MaterialesService.delete(id).then(() => {
      context.commit('DEL_MATERIAL', id);
      context.commit('CLEAR_SELECTED');
    });
  },
};

export const getters = {};
