<template lang="html">

  <section class="src-components-show-movie">
    <div class="container mt-5">
      <div class="jumbotron">
      <div class="row">
        <div class="card col-4" style="width:100px">
          <img :src="traerUrl(poster_path)" alt="">
          <br>
          <p> Calificacion: </p>
          <p> <svg style="margin-bottom: 10px;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gold" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
           </svg> {{vote_average}}/10</p>
        </div>
        <div class="col">
        <h1>{{title}}</h1>
        <br>
        <p class="ml-5">{{overview}}</p>
        </div>
      </div>
    </div>
    <button @click="showList"  class="btn btn-danger col-12" 
    style="background:#F48660">Volver a la lista</button>
    </div>
    
  </section>

</template>

<script >
export default {
  name: "src-components-show-movie",
  props: ["title","poster_path","overview","vote_average"],
  mounted() {

  },
  data() {
    return {};
  },
  methods: {
    showList() {
      this.$router.push({
          path: '/searchMovies'
      })
    },
    traerUrl(path) {
      return "https://image.tmdb.org/t/p/original" + path;
    },
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
