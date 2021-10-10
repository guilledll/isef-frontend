import CategoriasService from '@/services/categoria.service';

export const state = () => ({
  categorias: [],
  categoria: {},
});

export const mutations = {
  SELECT_CATEGORIA(state, categoria) {
    state.categoria = categoria;
  },
  GET_ALL_CATEGORIAS(state, categorias) {
    state.categorias = categorias;
  },
  ADD_CATEGORIA(state, categoria) {
    state.categorias.push(categoria);
  },
  MOD_CATEGORIA(state, data) {
    state.categorias = state.categorias.map((dep) =>
      dep.id == data.id ? { ...dep, nombre: data.nombre } : dep
    );
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_CATEGORIA', data);
  },
  async getAll(context) {
    return await CategoriasService.index().then((res) => {
      context.commit('GET_ALL_CATEGORIAS', res.data);
    });
  },
  async create(context, data) {
    return await CategoriasService.create(data).then(() => {
      context.commit('ADD_CATEGORIA', data);
    });
  },
  async update(context, data) {
    return await CategoriasService.update(data.id, data).then(() => {
      context.commit('MOD_CATEGORIA', data);
    });
  },
};

export const getters = {};
