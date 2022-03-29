import { createStore } from 'vuex'

export default createStore({
  state: {
    // data
    contador: 0,
    usuario: null
  },
  mutations: {
    // modifica estados (data)
    actualizaUsuario(state, user){
      state.usuario = user
    }
  },
  actions: {
    // methods
    ingresoUsuario(context, u){
      context.commit("actualizaUsuario", u)
    }
  },
  getters: {
    // retornar data
    estaAuthenticado(state){
      return state.usuario;
    }
  },
  modules: {
  }
})
