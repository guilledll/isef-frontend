import CategoriasService from '@/services/categoria.service';

export const state = () => ({
  categorias: [],
  categoria: null,
});

export const mutations = {
  SELECT_CATEGORIA(state, categoria) {
    state.categoria = categoria;
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
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_CATEGORIA', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  async get(context, id) {
    return await CategoriasService.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  async all(context) {
    return await CategoriasService.index().then((res) => {
      context.commit('GET_ALL_CATEGORIAS', res.data);
    });
  },
  async create(context, data) {
    return await CategoriasService.create(data).then((res) => {
      context.commit('ADD_CATEGORIA', res.data);
    });
  },
  async update(context, data) {
    return await CategoriasService.update(data.id, data).then(() => {
      context.commit('MOD_CATEGORIA', data);
    });
  },
  async delete(context, id) {
    return await CategoriasService.delete(id).then(() => {
      context.commit('DEL_CATEGORIA', id);
      context.dispatch('clear');
    });
  },
};

export const getters = {};
