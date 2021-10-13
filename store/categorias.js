import CategoriasService from '~/services/categorias.service';

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
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_CATEGORIA', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
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
};

export const getters = {};
