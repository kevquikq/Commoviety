import Vue from 'vue'

Vue.filter('puntaje', function(value) {
    return value + "/10"
})
