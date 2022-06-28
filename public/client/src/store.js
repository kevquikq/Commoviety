import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        urlUsuarios: 'http://localhost:4444/users',
        urlPeliculas: 'http://localhost:4444/films',
        urlForoPelicula: 'http://localhost:4444/moviesForums',
        urlForoUsuario: 'http://localhost:4444/usersforums',
        usuarioActual: null,
        usuarios: [],
        peliculas: []
    },
    actions : {
        postUsuario({commit},usuario) {
            commit('postUsuario',usuario)
        },
        actualizarUsuarios({commit}) {
            commit('actualizarUsuarios')
        },
        enviarUsuarioActual({commit},usuario){
            commit('enviarUsuarioActual',usuario)
        },
        actualizarPeliculas({commit}){
            commit('actualizarPeliculas')
        },
        asociarForoUsuario({commit}, pelicula) {
            commit('asociarForoUsuario', pelicula)
        },
        usuarioTieneForo({commit}, pelicula) {
            commit('usuarioTieneForo', pelicula)
        }
    },
    mutations : {
        async postUsuario(state,usuario){
            try {
                await axios.post(state.urlUsuarios, usuario, {'content-type':'application/json'} )

             }
             catch(error) {
               console.error('Error en postUsuario', error.message)
             }
        },
        enviarUsuarioActual(state,usuario){
            state.usuarioActual = usuario
        },
        async actualizarPeliculas(state) {
            let { data: peliculas } = await axios(state.urlPeliculas, {'content-type':'application/json'})
            state.peliculas = peliculas
        },
        async actualizarUsuarios(state) {
            let { data: usuarios } = await axios(state.urlUsuarios, {'content-type':'application/json'})
            state.usuarios = usuarios
        },
        async asociarForoUsuario(state, pelicula) {
            let foro
            await axios({
                method : 'post',
                url: state.urlForoPelicula,
                data: {idMovie: pelicula.id}
                
            }).then((response) => {
                foro = response.data.idForum
            })
            await axios.post(state.urlForoUsuario, {idForum: foro, idUser: state.usuarioActual.id}, {'content-type':'application/json'})
        },
        async usuarioTieneForo(state, pelicula) {
            let foro
            await axios({
                method : 'post',
                url: state.urlForoPelicula,
                data: {idMovie: pelicula.id}
                
            }).then((response) => {
                foro = response.data.idForum
            })
            let { data: tieneForo } = await axios(`${state.urlForoUsuario}?idForum=${foro}?idUser=${state.usuarioActual.id}`, {'content-type':'application/json'})
            return tieneForo
        }
    }
})