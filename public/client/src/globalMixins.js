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
      usuarioTieneForo(pelicula) {
        this.$store.dispatch('usuarioTieneForo',pelicula)
      }
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
      }
    }
}

Vue.mixin(miMixinGlobal)