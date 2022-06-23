<template>
  <section class="src-components-logout">
    <div class="container mt-4">
      <h1>¿Quieres cerrar sesión?</h1>

      <img src="https://media.discordapp.net/attachments/958130927031185438/985677943470690374/LOGO_LOGOUT.PNG" width="300px">
      <br>

      <button
        class="btn btn-danger col-3 mt-4 rounded"
        style="background: #f48660"
        @click="goToLogin()"
      >
        Cerrar sesión
      </button>
      <br>
      <button
        class="btn btn-danger col-3 mt-4 rounded"
        style="background: #f48660"
        @click="goToList()"
      >
        Volver
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "src-components-logout",
  props: [],
  mounted() {
  },
  data() {
    return {};
  },
  methods: {
    goToLogin() {
      this.$router.push({
          path: '/login'
      })
    },
    goToList() {
      this.$router.push({
          path: '/searchMovies'
      })
    }
  },
  computed: {},
};
</script>

<style scoped lang="css">
.src-components-logout {
}

h1 {
  color: crimson;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 3.9rem;
}
</style>
