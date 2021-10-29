import inventarioService from '@/services/inventario.service';

export const state = () => ({
  inventario: [],
  movimiento: null,
});

export const mutations = {
  SELECT_MOVIMIENTO(state, movimiento) {
    state.movimiento = movimiento;
  },
  CLEAR_SELECTED(state) {
    state.movimiento = null;
  },
  GET_ALL_INVENTARIO(state, inventario) {
    state.inventario = inventario;
  },
  ADD_MOVIMIENTO(state, movimiento) {
    state.inventario.push(movimiento);
  },
  MOD_MOVIMIENTO(state, inventario) {
    state.inventario = state.inventario.map((inv) =>
      inv.id == inventario.id ? { ...inv, nombre: inventario.nombre } : inv
    );
  },
  DEL_MOVIMIENTO(state, id) {
    state.inventario.map((inv, index) => {
      inv.id == id ? state.inventario.splice(index, 1) : inv;
    });
  },
};

export const actions = {
  select(context, data) {
    context.commit('SELECT_MOVIMIENTO', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
  get(context, id) {
    return inventarioService.show(id).then((res) => {
      context.dispatch('select', res.data);
    });
  },
  all(context) {
    return inventarioService.index().then((res) => {
      context.commit('GET_ALL_INVENTARIO', res.data);
    });
  },
  create(context, data) {
    return inventarioService.create(data).then((res) => {
      context.commit('ADD_MOVIMIENTO', res.data);
    });
  },
  update(context, data) {
    return inventarioService.update(data.id, data).then(() => {
      context.commit('MOD_MOVIMIENTO', data);
    });
  },
  delete(context, id) {
    return inventarioService.delete(id).then(() => {
      context.commit('DEL_MOVIMIENTO', id);
      context.commit('CLEAR_SELECTED');
    });
  },
};

export const getters = {};
