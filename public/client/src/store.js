import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        urlUsuarios: 'http://localhost:4444/users',
        urlPeliculas: 'http://localhost:4444/films',
        urlPuntajes: 'http://localhost:4444/scores',
        urlForoPelicula: 'http://localhost:4444/moviesForums',
        urlForoUsuario: 'http://localhost:4444/usersforums',
        usuarioActual: null,
        usuarios: [],
        peliculas: [],
        puntajes: []
    },
    actions : {
        async postUsuario({commit},usuario) {
            try {
                await axios.post(this.state.urlUsuarios, usuario, {'content-type':'application/json'} )
             }
             catch(error) {
               console.error('Error en postUsuario', error.message)
             }
             commit('postUsuario')
        },
        enviarUsuarioActual({commit},usuario){
            commit('enviarUsuarioActual',usuario)
        },
        async actualizarUsuarios({commit}) {
            let { data: usuarios } = await axios(this.state.urlUsuarios, {'content-type':'application/json'})
            commit('actualizarUsuarios',usuarios)
        },
        async actualizarPeliculas({commit}){
            let { data: peliculas } = await axios(this.state.urlPeliculas, {'content-type':'application/json'})
            commit('actualizarPeliculas',peliculas)
        },
        async asociarForoUsuario({commit},pelicula) {
            let foro
            console.log(pelicula)
            await axios({
                method : 'post',
                url: this.state.urlForoPelicula,
                data: {idMovie: pelicula.id}
                
            }).then((response) => {
                foro = response.data.idForum
            })
            await axios.post(this.state.urlForoUsuario, {idForum: foro, idUser: this.state.usuarioActual.id}, {'content-type':'application/json'})
            commit('asociarForoUsuario')
        },
        async actualizarPuntajes({commit}){
            let { data: puntajes } = await axios(this.state.urlPuntajes, {'content-type':'application/json'})
            commit('actualizarPuntajes',puntajes)
        },
        async modificarUsuario({commit},data){
            try {
                await axios.put(this.state.urlUsuarios + "/" + this.state.usuarioActual.id, data, {'content-type':'application/json'} )
            }
            catch(error) {
               console.error('Error en putUsuario', error.message)
            }
            commit('modificarUsuario')
        },
        async actualizarUsuarioActual({commit}){
            let { data: usuarioActual} = await axios(this.state.urlUsuarios + "/" + this.state.usuarioActual.id)
            commit('actualizarUsuarioActual',usuarioActual)
        }
    },
    mutations : {
        postUsuario(){
            this.dispatch('actualizarUsuarios')
        },
        enviarUsuarioActual(state,usuario){
            state.usuarioActual = usuario
        },
        actualizarPeliculas(state,peliculas) {
            state.peliculas = peliculas
        },
        asociarForoUsuario(){
            this.dispatch('actualizarUsuarios')
        },
        actualizarUsuarios(state,usuarios) {
            state.usuarios = usuarios
        },
        actualizarPuntajes(state,puntajes) {
            state.puntajes = puntajes
        },
        actualizarUsuarioActual(state,usuarioActual){
            state.usuarioActual = usuarioActual
        },
        modificarUsuario(){
            this.dispatch('actualizarUsuarioActual')
            this.dispatch('actualizarUsuarios')
        }
    }
})