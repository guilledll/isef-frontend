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
    state.material = material;
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
  GET_MOVIMIENTOS(state, movimientos) {
    state.movimientos = movimientos;
  },
  FILTRAR_MATERIALES(state, filtrados) {
    state.filtrados = filtrados;
  },
  MOVER_MATERIALES(state, materiales) {
    // Itera sobre los 2 materiales (actuales y movidos)
    for (let material of materiales) {
      // Itera sobre todos los materiales y encuentra el indice
      let index = state.materiales.findIndex((mat) => {
        return mat.id == material.id;
      });

      if (index != -1) state.materiales[index] = material;
      else state.materiales.push(material);
    }

    state.materiales = [...state.materiales];
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
    return MaterialesService.create(data);
  },
  update(context, data) {
    return MaterialesService.update(data.id, data).then((res) => {
      context.commit('MOD_MATERIAL', res.data);
    });
  },
  movimientos(context, id) {
    return MaterialesService.movimientos(id).then((res) => {
      context.commit('GET_MOVIMIENTOS', res.data);
    });
  },
  filtrar(context, { contenido, id }) {
    let filtrado = context.state.materiales.filter(
      (material) => material[contenido] == id
    );
    context.commit('FILTRAR_MATERIALES', filtrado);
  },
  mover(context, data) {
    return MaterialesService.mover(data.id, data).then((res) => {
      context.commit('MOVER_MATERIALES', res.data);
    });
  },
};

export const getters = {};
