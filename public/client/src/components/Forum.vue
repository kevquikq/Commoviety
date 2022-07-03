<template>
  <section class="src-components-forum">
    <div v-if="getUsuarioActual">
      <div v-if="messages.data && getPeliculas[index]">
        <div class="row">
          <div class="col-12 col-12">
            <div class="panel panel-default">
              <div class="panel-heading top-bar">
                <h3 class="panel-title">
                  <span class="glyphicon glyphicon-comment"></span>
                  {{ getPeliculas[index].name }}
                </h3>
              </div>
              <div class="col-12 msg_container_base">
                <div v-if="messages.data.length" class="col-12 msg_container">
                  <div class="col-12">
                    <div
                      
                      v-for="(message, index) in messages.data
                        .slice()
                        .reverse()"
                      :key="index"
                    >
                      <Message :message="message"/>
                    </div>
                  </div>
                </div>
                <h4 v-else class="alert alert-warning mt-3">
                  Aun no hay mensajes, se el primero en mandar uno!
                </h4>
              </div>
            </div>
          </div>
        </div>
        <vue-form
          :state="formstate"
          @submit.prevent="enviar()"
          class="row mt-1 mr-2"
          style="float: right"
        >
          <validate tag="div">
            <input
              type="text"
              id="text"
              v-model="formData.text"
              name="text"
              autocomplete="off"
              class="form-control"
              style="width: 300px"
              required
              :maxlength="max"
            />
          </validate>
          <button
            class="btn btn-danger"
            style="background: #f48660"
            :disabled="formstate.$invalid"
            type="submit"
          >
            Enviar
          </button>
        </vue-form>
        <br />
      </div>
    </div>
    <h1 v-else class="mt-2">Debe estar logueado para ver esta pagina</h1>
    <br />
    <button
      @click="showDetails"
      class="btn btn-danger col-12"
      style="background: #f48660"
    >
      Volver a la pelicula
    </button>
  </section>
</template>

<script>
import Message from './Message.vue'

export default {
  name: "src-components-forum",
  props: ["index", "idForum"],
  components: {Message},
  async mounted() {
    this.actualizarPeliculas();
    let { data: messages } = await this.axios(`${this.url}/${this.idForum}`, {
      "content-type": "application/json",
    });
    this.messages = messages;
  },
   async updated() {
    let { data: messages } = await this.axios(`${this.url}/${this.idForum}`, {
      "content-type": "application/json",
    });
    this.messages = messages;
  },
  data() {
    return {
      url: "http://localhost:4444/messagesForums",
      
      messages: [],
      formstate: {},
      formData: this.getInitialData(),
      max: 55,
    };
  },
  methods: {
    getInitialData() {
      return {
        text: "",
      };
    },
    
    
   
    async enviar() {
      let text = { ...this.formData };
      try {
        await this.axios.post(
          this.url,
          {
            text: text,
            idForum: this.idForum,
            idUser: this.getUsuarioActual.id,
          },
          { "content-type": "application/json" }
        );
      } catch (error) {
        console.error("Error en postMensaje", error.message);
      }
      this.formData = this.getInitialData();
      this.formstate._reset();
    },
    
    showDetails() {
      let indexActual = this.index;
      this.$router.push({
        path: "/detailsMovies",
        name: "detailsMovies",
        params: { indexActual },
      });
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
.src-components-forum {
}
.top-bar {
  background: rgb(244, 134, 96);
  color: white;
  padding: 10px;
}


.msg_container {
  padding: 10px;
  overflow: hidden;
  display: flex;
}



.msg_container_base::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  direction: reverse;
}
.msg_container_base::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
  direction: reverse;
}

.msg_container_base::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
  direction: reverse;
}

.msg_container_base {
  background: #e5e5e5;
  margin: 0;
  padding: 0 10px 10px;
  max-height: 800px;
  overflow-x: hidden;
}
</style>
