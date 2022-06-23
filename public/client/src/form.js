import Vue from 'vue'
import VueForm from 'vue-form'

var options = {
    validators: {
        'sin-espacios': function(value) {
            return !value.includes(' ')
        },
        'son-iguales': function(value, dato){
            return value == dato
        }
    }
}


Vue.use(VueForm,options)