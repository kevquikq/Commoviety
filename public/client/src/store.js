import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const delay = ms => new Promise((resolve, reject) => {
    if(typeof ms == 'number') {
        setTimeout(resolve, ms)
    }
    else {
        reject('ms no es del tipo number')
    }
})


Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        usuarios: [],
        url: 'https://62b47909530b26da4cbf650c.mockapi.io/users'
    },
    actions : {
        async agregarUsuario({commit}, usuarioNew) {
            try {
                await delay(1000)
                
                commit('agregarUsuario',usuarioNew)
            } catch(error) {
                console.error(error)
            }                
        }        
    },
    mutations : {
        async agregarUsuario(state, usuarioNew) {
            await axios.post(state.url, usuarioNew, {'content-type':'application/json'})
            let { data: usuarios } = await axios(state.url)
            state.usuarios = usuarios
        }
    }
})