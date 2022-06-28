import Vue from 'vue'

const miMixinGlobal = {
    methods: {
      postUsuario(usuario) {
        this.$store.dispatch('postUsuario',usuario)
      },
      enviarUsuarioActual(usuario){
        this.$store.dispatch('enviarUsuarioActual',usuario)
      }
    },
    computed: {
      getUsuarios() {
        return this.$store.state.usuarios
      },
      getUsuarioActual() {
        return this.$store.state.usuarioActual
      }
    }
}

Vue.mixin(miMixinGlobal)