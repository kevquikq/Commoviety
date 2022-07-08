<template>
  <section class="src-components-movies">
    <div class="row">
      <div class="col">
        <button
          class="btn btn-danger mt-2 mb-2 mr-2"
          :style="{ background: '#f48660' }"
          @click="goToTopAvgScore()"
        >
          Ver top por puntaje
        </button>
        <button
          class="btn btn-danger mt-2 mb-2"
          :style="{ background: '#f48660' }"
          @click="goToTopPopularity()"
        >
          Ver top por popularidad
        </button>
      </div>
      <div class="col">
        <div v-if="getUsuarioActual">
          <h3 class="mt-2 mb-2">
            ¡Bienvenido {{ getUsuarioActual.nickname | nombreDeUsuario }}!
          </h3>
        </div>
      </div>
      <div class="col">
        <button
          v-if="getUsuarioActual"
          class="btn btn-secondary mt-2 mb-2 mr-2"
          :style="{ background: '#657275' }"
          @click="goToSettings()"
        >
          Configuracion
        </button>
        <button
          v-if="getUsuarioActual"
          class="btn btn-danger mt-2 mb-2"
          :style="{ background: '#f46060' }"
          @click="goToLogout()"
        >
          Cerrar sesión
        </button>
        <div v-else>
          <button class="btn btn-success mt-2 mb-2 mr-2" @click="goToLogin()">
            Iniciar sesion
          </button>
          <button class="btn btn-warning mt-2 mb-2" @click="goToRegistration()">
            Registrarse
          </button>
        </div>
      </div>
    </div>

    <div class="borde-buscador">
      <div class="row">
        <div class="input-icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
          <input
            type="text"
            class="input-field"
            v-model="busquedaPorTitulo"
            placeholder="Ingresar el titulo de la pelicula..."
          />
        </div>
      </div>
    </div>
    <br />
    <h1>TITULOS</h1>
    <div class="contenedor">
      <div v-if="!peliculasFiltradas.length">
        <h3 class="alert alert-danger" style="margin-bottom: 585px">
          No se encontraron peliculas
        </h3>
      </div>
      <div v-else>
        <div class="row">
          <div
            v-for="(movie, index) in peliculasFiltradas"
            :key="index"
            class="col-4"
          >
            <div class="card mt-4">
              <img
                class="card-img-top"
                :src="traerUrl(movie.image)"
                alt="Card image"
              />
              <div class="card-body">
                <h4 class="card-title" :style="getTitleStyle(movie.name)">
                  {{ movie.name }}
                </h4>
                <button
                  @click="showDetails(index)"
                  class="btn btn-danger"
                  style="background: #f48660"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-light text-center text-lg-start">
      <div class="text-center p-3 mt-4" style="background-color: #f48660">
        <div>Copyright © 2020</div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-facebook mr-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-twitter mr-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-instagram"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
            />
          </svg>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: "src-components-movies",
  props: [],
  mounted() {
    this.actualizarPeliculas();
  },

  data() {
    return {
      numRow: 0,
      busquedaPorTitulo: "",
    };
  },
  methods: {
    traerUrl(path) {
      return "https://image.tmdb.org/t/p/original" + path;
    },

    getStyle() {
      return {};
    },

    getTitleStyle(title) {
      return {
        "font-size": title.length > 20 ? "18.2px" : "",
        "padding-bottom": title.length > 20 ? "10px" : "",
        color: "#F48660",
      };
    },

    showDetails(index) {
      this.$router.push({
        path: "/detailsMovies",
        name: "detailsMovies",
        params: { index },
      });
    },

    goToLogout() {
      this.$router.push({
        path: "/logout",
      });
    },
    goToLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    goToRegistration() {
      this.$router.push({
        path: "/registration",
      });
    },
    goToTopAvgScore() {
      this.$router.push({
        path: "/topAvgScore",
      });
    },
    goToTopPopularity() {
      this.$router.push({
        path: "/topPopularity",
      });
    },
    goToSettings() {
      this.$router.push({
        path: "/settings",
      });
    },
  },
  computed: {
    peliculasFiltradas() {
      return this.getPeliculas.filter((movie) => {
        if (!this.busquedaPorTitulo.length) {
          return true;
        } else {
          let registroTitulo = `${movie.name}`;
          return registroTitulo
            .toLowerCase()
            .startsWith(this.busquedaPorTitulo.toLowerCase());
        }
      });
    },
  },
};
</script>

<style scoped lang="css">
.src-components-movies {
}
.borde-buscador {
  background-color: #f48660;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.form-control {
  border-radius: 30px;
}
.contenedor {
  padding-left: 300px;
  padding-right: 300px;
}
h1 {
  color: crimson;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-left: 200px;
  text-align: left;
  font-size: 300%;
}
h3 {
  color: crimson;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.input-icons svg {
  margin: 10px;
  position: absolute;
}

.input-icons {
  width: 100%;
  margin-bottom: 10px;
}

.icon {
  padding: 10px;
  min-width: 40px;
}

.input-field {
  width: 100%;
  padding-left: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 20px;
  border: none;
}
</style>
