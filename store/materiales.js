import MaterialesService from '@/services/materiales.service';

export const state = () => ({
  materiales: [],
  filtrados: [],
  material: null,
  movimientos: [],
});

export const mutations = {
  SELECT_MATERIAL(state, material) {
    state.material = material;
  },
  CLEAR_SELECTED(state) {
    state.material = null;
    state.movimientos = [];
  },
  GET_ALL_MATERIALES(state, materiales) {
    state.materiales = materiales;
  },
  MOD_MATERIAL(state, material) {
    state.materiales = state.materiales.map((mat) =>
      mat.id == material.id
        ? {
            ...mat,
            nombre: material.nombre,
            deposito: material.deposito,
            deposito_id: material.deposito_id,
            cantidad: material.cantidad,
            categoria_id: material.categoria_id,
            categoria: material.categoria,
          }
        : mat
    );
  },
  DEL_MATERIAL(state, id) {
    state.materiales.map((mat, index) => {
      mat.id == id ? state.materiales.splice(index, 1) : mat;
    });
  },
  GET_MOVIMIENTOS(state, movimientos) {
    state.movimientos = movimientos;
  },
  FILTRAR_MATERIALES(state, filtrados) {
    state.filtrados = filtrados;
    console.log(filtrados);
  }
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
    return MaterialesService.create(data);
  },
  update(context, data) {
    return MaterialesService.update(data.id, data).then((res) => {
      context.commit('MOD_MATERIAL', res.data);
    });
  },
  delete(context, id) {
    return MaterialesService.delete(id).then(() => {
      context.commit('DEL_MATERIAL', id);
      context.commit('CLEAR_SELECTED');
    });
  },
  movimientos(context, id) {
    return MaterialesService.movimientos(id).then((res) => {
      context.commit('GET_MOVIMIENTOS', res.data);
    });
  },
  filtar(context, { contenido, id }) {
    let filtrado = context.state.materiales.filter(material =>
      material[contenido] == id
    );
    context.commit('FILTRAR_MATERIALES', filtrado);
  }
};

export const getters = {};
