<template>

  <section class="src-components-show-movie">
    <div class="container mt-5">
      <div class="jumbotron">
      <div class="row">
        <div class="card col-4" style="width:100px">
          <img :src="traerUrl(getPeliculas[index].image)" alt="">
          <br>
          <p> Score: </p>
          <p v-if="getPeliculas[index].averageScore" :style="getScoreStyle(getPeliculas[index].averageScore)"> <svg style="margin-bottom: 10px;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gold" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
           </svg> {{getPeliculas[index].averageScore}}/10 </p>
          <p v-else> N/A </p>
        </div>
        <div class="col">
          <h1>{{getPeliculas[index].name}}</h1>
          <br>
          <p class="ml-5">{{getPeliculas[index].description}}</p>
          <br>
          <div v-show="getUsuarioActual">
            <div v-if ="!puntajeEnviado">
              <vue-form :state="formstate" @submit.prevent="enviarPuntaje()">
                <validate tag="div">
                  <label for="puntaje">Puntaje:</label>
                  <input
                    type="number"
                    id="puntaje"
                    v-model.number="formData.puntaje"
                    name="puntaje"
                    autocomplete="off"
                    class="form-control"
                    required
                    :min="minPuntaje"
                    :max="maxPuntaje"
                  />

                  <field-messages name="puntaje" show="$dirty">
                    <div slot="required" class="alert alert-danger mt-1">
                      El campo es requerido
                    </div>
                    <div slot="min" class="alert alert-danger mt-1">
                      El puntaje minimo es 1
                    </div>
                    <div slot="max" class="alert alert-danger mt-1">
                      El puntaje maximo es 10
                    </div>
                  </field-messages>
                </validate>
                <br>
                <button class="btn btn-danger my-3 col-12" :disabled="formstate.$invalid" type="submit">Enviar puntaje</button>
              </vue-form>
            </div>
            <div v-else class="alert alert-success">
              Se envio el puntaje
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-if="!tieneForo" @click="asociarForoConUsuario(getPeliculas[index])"  class="btn btn-danger col-12" 
    style="background:#F48660">Asociarse al foro</button>
    <button v-else @click="irAForo(getPeliculas[index])" class="btn btn-danger col-12" style="background:#F48660">Ir al foro</button>

    <hr>

    <button @click="showList"  class="btn btn-danger col-12" 
    style="background:#F48660">Volver a la lista</button>
    </div>
  </section>

</template>

<script >
export default {
  name: "src-components-show-movie",
  props: ["index"],
  async mounted() {
    let { data: tieneForo } = await this.axios(`${this.$store.state.urlForoUsuario}/${(this.index + 1)}/${this.$store.state.usuarioActual.id}`, {'content-type':'application/json'})
    this.tieneForo = tieneForo.data
    this.actualizarPeliculas()
  },
  async updated() {
    let { data: tieneForo } = await this.axios(`${this.$store.state.urlForoUsuario}/${(this.index + 1)}/${this.$store.state.usuarioActual.id}`, {'content-type':'application/json'})
    this.tieneForo = tieneForo.data
  },
  data() {
    return {
        formstate: {},
        formData: this.getInitialData(),
        minPuntaje: 1,
        maxPuntaje: 10,
        puntajeEnviado: false,
        urlPuntuar: 'http://localhost:4444/scoreUser',
        tieneForo: false
      }
  },
  methods: {
    showList() {
      this.$router.push({
          path: '/searchMovies'
      })
    },
    getInitialData() {
        return {
          puntaje: "",
        }
    },
    traerUrl(path) {
      return "https://image.tmdb.org/t/p/original" + path;
    },
    asociarForoConUsuario(pelicula) {
      this.asociarForoUsuario(pelicula)
      this.irAForo(pelicula)
    },
    irAForo(pelicula) {
      let title = pelicula.name
      let idForum = 2
      this.$router.push({
          path: '/forum',
          name: 'forum',
          params: {title, idForum}
      })
    },
    async enviarPuntaje(){
      let nuevoPuntaje = {...this.formData}
      let puntajeUsuarioPelicula = {
         value: nuevoPuntaje.puntaje,
         idMovie: this.index + 1,
         idUser: this.getUsuarioActual.id
      }
      console.log(puntajeUsuarioPelicula)
      try {
        await this.axios.post(this.urlPuntuar, puntajeUsuarioPelicula, {'content-type':'application/json'} )
      }
      catch(error) {
        console.error('Error en postScoreUser', error.message)
      }
      this.puntajeEnviado = true
      this.actualizarPeliculas()
      this.formData = this.getInitialData()
      this.formstate._reset()
    },
    getScoreStyle(num){
      let color = "red"
        if(num >= 5 && num < 7){
          color = "orange"
        } else if (num >= 7){
          color = "green"
        }
        return {'color': color}
    }
  },
  computed: {},
};
</script>

<style scoped lang="css">
.src-components-show-movie {
}

.jumbotron {
  background-color: #fff;
  box-shadow: -4px 6px 36px 0px rgba(0, 0, 0, 0.42);
  -webkit-box-shadow: -4px 6px 36px 0px rgba(0, 0, 0, 0.42);
  -moz-box-shadow: -4px 6px 36px 0px rgba(0, 0, 0, 0.42);
}

.card {
  border: none;
}

h1 {
  color: #f48660;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: right;
  font-size: 425%;
}

p {
  text-align: left;
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 150%;
  margin-bottom: 0%;
}
</style>
