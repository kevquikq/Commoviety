import Vue from 'vue'

const miMixinGlobal = {
    methods: {
      postUsuario(usuario) {
        this.$store.dispatch('postUsuario',usuario)
      },
      enviarUsuarioActual(usuario){
        this.$store.dispatch('enviarUsuarioActual',usuario)
      },
      actualizarUsuarios() {
        this.$store.dispatch('actualizarUsuarios')
      },
      actualizarPeliculas() {
        this.$store.dispatch('actualizarPeliculas')
      },
      asociarForoUsuario(pelicula) {
        this.$store.dispatch('asociarForoUsuario',pelicula)
      },
      actualizarPuntajes() {
        this.$store.dispatch('actualizarPuntajes')
      },
      esUsuarioActual(idUser) {
        return this.$store.state.usuarioActual.id == idUser;
      },
    },
    computed: {
      getPeliculas() {
        return this.$store.state.peliculas
      },
      getUsuarios() {
        return this.$store.state.usuarios
      },
      getUsuarioActual() {
        return this.$store.state.usuarioActual
      },
      getPuntajes() {
        return this.$store.state.puntajes
      },
      getUrlPeliculaForo() {
        return this.$store.state.urlForoPelicula
      },
      getUrlUsuarioForo() {
        return this.$store.state.urlForoUsuario
      }
    }
}

Vue.mixin(miMixinGlobal)