<template>
  <section class="src-components-top-popularity">
    <button
      class="btn btn-danger col-6 mt-2 mb-2"
      :style="{ background: '#f48660' }"
      @click="showList"
    >
      Volver al buscador
    </button>
    <div class="borde-titulo">
      <h1>Top de peliculas por popularidad</h1>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <br />
        <div v-for="(movie, index) in topPopularity" :key="index" style="col-4">
          <div class="card mb-3" style="max-width: 540px">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  class="card-img-top"
                  :src="traerUrl(movie.image)"
                  alt="Card image"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <br />
                  <h5 class="card-text">
                    <b>{{ movie.name }}</b>
                  </h5>
                  <h5 class="card-text" v-if="movie.quantScores">
                    Cantidad de votos: {{ movie.quantScores }}
                  </h5>
                  <div v-else>Aun no fue puntuada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-top-quant-score',
    props: [],
    async mounted () {
      let { data: top } = await this.axios(this.urlTopPopularity,{ "content-type": "application/json"})
      this.topPopularity = top
    },
    data () {
      return {
        topPopularity : [],
        urlTopPopularity: 'http://localhost:4444/moviesTopPopularity'
      }
    },
    methods: {
      traerUrl(path) {
        return "https://image.tmdb.org/t/p/original" + path;
      },
      showList() {
        this.$router.push({
          path: "/searchMovies",
        });
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-top-popularity {
}
.borde-titulo {
  background-color: #f48660;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
}

h1 {
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
