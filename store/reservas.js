import ReservasService from '~/services/reservas.service';

export const state = () => ({
  reservas: [],
  reserva: null,
  materialesDisponibles: [],
});

export const mutations = {
  INICIAR_RESERVA(state, reserva) {
    state.reserva = reserva;
  },
  MATERIALES_DISPONIBLES(state, materiales) {
    state.materialesDisponibles = materiales;
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
};

export const getters = {
  material: (state) => (id) => {
    return state.reserva.materiales.find((mat) => {
      return mat.id === id;
    });
  },
};
