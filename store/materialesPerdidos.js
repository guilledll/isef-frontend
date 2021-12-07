import MaterialesPerdidosService from '@/services/materialesPerdidos.service';

export const state = () => ({
  materiales: [],
  material: null,
  filtrados: [],
});

export const mutations = {
  SELECT(state, material) {
    state.material = material;
  },
  CLEAR_SELECTED(state) {
    state.material = null;
  },
  GET_ALL_MATERIALES_PERDIDOS(state, material) {
    state.materiales = material;
  },
  FILTRAR_MATERIALES_PERDIDOS(state, filtrados) {
    state.filtrados = filtrados;
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  get(context, id) {
    return MaterialesPerdidosService.show(id).then((res) => {
      context.commit('SELECT', res.data);
    });
  },
  all(context) {
    return MaterialesPerdidosService.index().then((res) => {
      context.commit('GET_ALL_MATERIALES_PERDIDOS', res.data);
    });
  },
  accion(context, data) {
    return MaterialesPerdidosService.update(data.id, data).then(() => {
      context.dispatch('global/loading', false, { root: true });
    });
  },
  filtrar(context, { id }) {
    let filtrado = context.state.materiales.filter((material) => {
      return material.deposito_id == id;
    });
    context.commit('FILTRAR_MATERIALES_PERDIDOS', filtrado);
  },
};
