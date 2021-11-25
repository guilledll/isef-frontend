import MaterialesPerdidosService from '@/services/materialesPerdidos.service';

export const state = () => ({
  materiales: [],
  material: null,
  filtrados: [],
});

export const mutations = {
  SELECT(state, materiales) {
    state.materiales = materiales;
  },
  CLEAR_SELECTED(state) {
    state.material = null;
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
  accion(context, data) {
    return MaterialesPerdidosService.update(data.id, data).then(() => {
      context.dispatch('global/loading', false, { root: true });
    });
  },
};
