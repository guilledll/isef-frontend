import ReservasService from '~/services/reservas.service';

export const state = () => ({
  reservas: [],
  filtrados: [],
  reserva: null,
  materialesDisponibles: [],
  // 1 - Activa
  // 2 - Aprobada
  // 3 - Pendiente
  // 4 - Finalizada
  // 5 - Cancelada
  estados: [1, 2, 3, 4, 5],
});

export const mutations = {
  SELECT_RESERVA(state, reserva) {
    state.reserva = reserva;
  },
  CLEAR_SELECTED(state) {
    state.material = null;
    state.movimientos = [];
    state.materialesDisponibles = [];
  },
  INICIAR_RESERVA(state, reserva) {
    state.reserva = reserva;
  },
  MATERIALES_DISPONIBLES(state, materiales) {
    state.materialesDisponibles = materiales;
  },
  GET_ALL_RESERVAS(state, reservas) {
    state.reservas = reservas;
  },
  GET_ALL_RESERVAS_USUARIO(state, reservas) {
    state.reservas = reservas;
  },
  GET_RESERVA(state, reserva, materiales) {
    state.reserva = reserva;
    state.materialesDisponibles = materiales;
  },
  UPDATE_ESTADO(state, reservas) {
    state.users = state.reservas.map((user) =>
      user.ci == reservas.ci ? { ...user, estado: reservas.estado } : user
    );
  },
  AGREGAR_MATERIAL(state, material) {
    state.reserva.materiales.push({
      id: material.id,
      nombre: material.nombre + ' ' + material.categoria,
      cantidad: 1,
    });
  },
  REMOVER_MATERIAL(state, id) {
    state.reserva.materiales = state.reserva.materiales.filter(
      (mat) => mat.id !== id
    );
  },
  CANTIDAD_MATERIAL(state, { id, cant }) {
    let index = state.reserva.materiales.findIndex((mat) => mat.id == id);
    state.reserva.materiales[index].cantidad = cant;
  },
  ACTUALIZAR_RESERVA(state, data) {
    Object.keys(data).forEach((key) => {
      state.reserva[key] = data[key];
    });
  },
  CANCELAR_RESERVA(state) {
    state.reserva = null;
  },
  FILTRAR_RESERVAS(state, filtrados) {
    state.filtrados = filtrados;
  },
};

export const actions = {
  iniciar(context, data) {
    return ReservasService.iniciar(data).then((res) => {
      context.commit('INICIAR_RESERVA', data);
      let disponibles = res.data.filter((mat) => {
        return mat.cantidad > 0;
      });
      context.commit('MATERIALES_DISPONIBLES', disponibles);
    });
  },
  get(context, id) {
    return ReservasService.show(id).then((res) => {
      context.dispatch('select', res.data.reserva);
      context.commit('MATERIALES_DISPONIBLES', res.data.materiales);
    });
  },
  getAllReservasUsuario(context, id) {
    return ReservasService.getAllReservasUsuario(id).then((res) => {
      context.commit('GET_ALL_RESERVAS_USUARIO', res.data);
    })
  },
  all(context) {
    return ReservasService.index().then((res) => {
      context.commit('GET_ALL_RESERVAS', res.data);
    });
  },
  agregarMaterial(context, material) {
    context.commit('AGREGAR_MATERIAL', material);
  },
  removerMaterial(context, id) {
    context.commit('REMOVER_MATERIAL', id);
  },
  cantidadMaterial(context, { id, cant }) {
    context.commit('CANTIDAD_MATERIAL', { id, cant });
  },
  confirmarReserva(context, data) {
    context.commit('ACTUALIZAR_RESERVA', data);
    return ReservasService.create(context.state.reserva);
  },
  cancelarReserva(context) {
    context.commit('CANCELAR_RESERVA');
  },
  entregar(context, { id, data }) {
    return ReservasService.entregar(id, data);
  },
  recibir(context, { id, data }) {
    return ReservasService.recibir(id, data);
  },
  updateEstado(context, data) {
    return ReservasService.updateEstado(data.ci, data).then((res) => {
      context.commit('UPDATE_ESTADO', res.data);
      context.dispatch('select', res.data);
      context.dispatch('global/loading', false, { root: true });
    });
  },
  filtrar(context, { contenido, id }) {
    let filtrado = context.state.reservas.filter(
      (reserva) => reserva[contenido] == id
    );
    context.commit('FILTRAR_RESERVAS', filtrado);
  },
  select(context, data) {
    context.commit('SELECT_RESERVA', data);
  },
  clear(context) {
    context.commit('CLEAR_SELECTED');
  },
};

export const getters = {
  material: (state) => (id) => {
    return state.reserva.materiales.find((mat) => {
      return mat.id === id;
    });
  },
  estadosConReserva(state) {
    let estadosConReserva = [];
    state.estados.forEach((estado) => {
      if (state.reservas.some((r) => r.estado == estado)) {
        estadosConReserva.push(estado);
      }
    });
    return estadosConReserva;
  },
  conEstado: (state) => (estado) => {
    return state.users.filter((user) => {
      return user.estado == estado;
    });
  },
};
