<template>
  <section class="src-components-top-avg-score">
    <button
      class="btn btn-danger col-6 mt-2 mb-2"
      :style="{ background: '#f48660' }"
      @click="showList"
    >
      Volver al buscador
    </button>
    <div class="borde-titulo">
      <h1>Top de peliculas por puntaje</h1>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <br />
        <div
          v-for="(movie, index) in topMoviesAvgScore"
          :key="index"
          style="col-4"
        >
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
                  <h4 class="card-text">
                    <b>{{ movie.name }}</b>
                  </h4>
                  <h4 class="card-text" v-if="movie.averageScore">
                    <svg
                      style="margin-bottom: 10px"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="gold"
                      class="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                      />
                    </svg>
                    {{ movie.averageScore }}
                  </h4>
                  <div v-else>Aún no fue puntuada</div>
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
    name: 'src-components-top-avg-score',
    props: [],
    async mounted () {
      let { data: top } = await this.axios(this.urlTopAvgScore,{ "content-type": "application/json"})
      this.topMoviesAvgScore = top
    },
    data () {
      return {
        topMoviesAvgScore : [],
        urlTopAvgScore: 'http://localhost:4444/moviesTopAvgScore'
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
.src-components-top-avg-score {
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
