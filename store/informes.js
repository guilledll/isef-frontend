import informesServices from '@/services/informes.service';

export const state = () => ({
  informes: [],
  filtrados: [],
  informe: null,
});

export const mutations = {
  SELECT_INFORME(state, informe) {
    state.informe = informe;
  },
  CLEAR_SELECTED(state) {
    state.informe = null;
  },
  GET_ALL_INFORMES(state, informes) {
    state.informes = informes;
  },
  ADD_INFORME(state, informe) {
    state.informes.push(informe);
  },
  MOD_INFORME(state, informes) {
    state.informes = state.informes.map((inv) =>
      inv.id == informes.id ? { ...inv, nombre: informes.nombre } : inv
    );
  },
  DEL_INFORME(state, id) {
    state.informes.map((inv, index) => {
      inv.id == id ? state.informes.splice(index, 1) : inv;
    });
  },
  FILTRAR_INFORMES(state, filtrados) {
    state.filtrados = filtrados;
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_INFORME', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  get(context, id) {
    return informesServices.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  all(context) {
    return informesServices.index().then((res) => {
      context.commit('GET_ALL_INFORMES', res.data);
    });
  },
  create(context, data) {
    return informesServices.create(data).then((res) => {
      context.commit('ADD_INFORME', res.data);
    });
  },
  update(context, data) {
    return informesServices.update(data.id, data).then(() => {
      context.commit('MOD_INFORME', data);
    });
  },
  delete(context, id) {
    return informesServices.delete(id).then(() => {
      context.commit('DEL_INFORME', id);
      context.commit('CLEAR_SELECTED');
    });
  },
  filtrar(context, { id }) {
    let filtrado = context.state.informes.filter((informe) => {
      return informe.deposito_id == id;
    });
    context.commit('FILTRAR_INFORMES', filtrado);
  },
};

export const getters = {};
