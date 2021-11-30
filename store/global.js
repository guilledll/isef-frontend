import ExisteService from '~/services/existe.service';

export const state = () => ({
  loading: false,
  // Objeto que sabe si existe al menos uno de cada tipo
  existen: {
    reservas: false,
    depositos: false,
    materiales: false,
    registros: false,
  },
});

export const mutations = {
  SET_STATUS(state, status) {
    state.loading = status;
  },
  EXISTE(state, { reservas, depositos, materiales, registros }) {
    state.existen = { reservas, depositos, materiales, registros };
  },
};

export const actions = {
  loading(context, status) {
    context.commit('SET_STATUS', status);
  },
  existen(context) {
    return ExisteService.existen().then((res) => {
      console.log(res.data);
      context.commit('EXISTE', res.data);
    });
  },
};
