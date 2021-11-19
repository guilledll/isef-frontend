import CategoriasService from '~/services/categorias.service';

export const state = () => ({
  categorias: [],
  categoria: null,
  materiales: [],
});

export const mutations = {
  SELECT_CATEGORIA(state, categoria) {
    state.categoria = categoria;
    state.materiales = [];
  },
  CLEAR_SELECTED(state) {
    state.categoria = null;
  },
  GET_ALL_CATEGORIAS(state, categorias) {
    state.categorias = categorias;
  },
  ADD_CATEGORIA(state, categoria) {
    state.categorias.push(categoria);
  },
  MOD_CATEGORIA(state, categoria) {
    state.categorias = state.categorias.map((cat) =>
      cat.id == categoria.id ? { ...cat, nombre: categoria.nombre } : cat
    );
  },
  DEL_CATEGORIA(state, id) {
    state.categorias.map((cat, index) => {
      cat.id == id ? state.categorias.splice(index, 1) : cat;
    });
  },
  GET_MATERIALES(state, materiales) {
    state.materiales = materiales;
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_CATEGORIA', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  get(context, id) {
    return CategoriasService.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  all(context) {
    return CategoriasService.index().then((res) => {
      context.commit('GET_ALL_CATEGORIAS', res.data);
    });
  },
  create(context, data) {
    return CategoriasService.create(data).then((res) => {
      context.commit('ADD_CATEGORIA', res.data);
    });
  },
  update(context, data) {
    return CategoriasService.update(data.id, data).then((res) => {
      context.commit('MOD_CATEGORIA', res.data);
      context.dispatch('select', res.data);
    });
  },
  delete(context, id) {
    return CategoriasService.delete(id).then(() => {
      context.commit('DEL_CATEGORIA', id);
      context.dispatch('clear');
    });
  },
  materiales(context, id) {
    return CategoriasService.materiales(id).then((res) => {
      context.commit('GET_MATERIALES', res.data);
    });
  },
};
export const getters = {
  conMateriales(state) {
    return state.categorias.filter(
      cat => { return cat.cantidad_materiales > 0 });
  }
};
