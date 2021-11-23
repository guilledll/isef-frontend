import MaterialesPerdidosService from '@/services/materialesPerdidos.service';

export const state = () => ({
  materiales: [],
  material: null,
  filtrados: [],
});
6;

export const mutations = {
  SELECT(state, materiales) {
    state.materiales = materiales;
  },
  CLEAR_SELECTED(state) {
    state.material = null;
  },
  // GET_ALL_MATERIALES(state, materiales) {
  //   state.materiales = materiales;
  // },
  // ADD_MATERIALPERDIDO(state, material) {
  //   state.MaterialesPerdidos.push(material);
  // },
  // MOD_MATERIAL(state, materiales) {
  //   state.materiales = state.materiales.map((dep) =>
  //     dep.id == materiales.id ? { ...dep, nombre: materiales.nombre } : dep
  //   );
  // },
  // DEL_MATERIAL(state, id) {
  //   state.materiales.map((dep, index) => {
  //     dep.id == id ? state.materiales.splice(index, 1) : dep;
  //   });
  // },
  // GET_MATERIALES(state, materiales) {
  //   state.materiales = materiales;
  // },
  FILTRAR_MATERIALES(state, filtrados) {
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
  // all(context) {
  //   return MaterialesPerdidosService.index().then((res) => {
  //     context.commit('GET_ALL_MATERIALES', res.data);
  //   });
  // },
  // create(context, data) {
  //   return MaterialesPerdidosService.create(data).then((res) => {
  //     context.commit('ADD_MATERIALPERDIDO', res.data);
  //   });
  // },
  // delete(context, id) {
  //   return MaterialesPerdidosService.delete(id).then(() => {
  //     context.commit('DEL_MATERIAL', id);
  //     context.commit('CLEAR_SELECTED');
  //   });
  // },
  // filtar(context, { id }) {
  //   let filtrado = context.state.materiales.filter((material) => {
  //     return material.departamento_id == id;
  //   });
  //   context.commit('FILTRAR_MATERIAL', filtrado);
  // },
};
