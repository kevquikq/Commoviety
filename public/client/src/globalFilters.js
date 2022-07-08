import Vue from 'vue'

Vue.filter('puntaje', function(value) {
    return value + "/10"
})

Vue.filter('nombreDeUsuario', function(value) {
    return '"' + value + '"'
})

