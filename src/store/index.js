import { createStore } from 'vuex'

export default createStore({
  state: {
    // data
    contador: 0,
    usuario: null
  },
  getters: {
    // retornar data
  },
  mutations: {
    // modifica estados (data)
    addUsuario(state){
      state.usuario = "OSCAR"
    }
  },
  actions: {
    // methods
  },
  modules: {
  }
})
