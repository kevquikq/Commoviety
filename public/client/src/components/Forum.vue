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
                      :class="getClassMessage(message.userId)"
                      v-for="(message, index) in messages.data
                        .slice()
                        .reverse()"
                      :key="index"
                    >
                      <button
                        v-if="esUsuarioActual(message.userId)"
                        class="btn btn-sm btn-danger float-right"
                        style="height: 28px; margin-top: 3px"
                        @click="eliminarMensaje(message.id)"
                      >
                        Eliminar
                      </button>
                      <div class="msg rounded mt-1">
                        <p class="ml-2 mr-2 msg_text">{{ message.text }}</p>
                      </div>
                      <h6>{{ getNameUser(message.userId) }}</h6>
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
export default {
  name: "src-components-forum",
  props: ["index", "idForum"],
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
      urlBorrar: "http://localhost:4444/message",
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
    getClassMessage(idUser) {
      if (this.esUsuarioActual(idUser)) {
        return "messages msg_sent";
      } else {
        return "messages msg_receive";
      }
    },
    esUsuarioActual(idUser) {
      return this.getUsuarioActual.id == idUser;
    },
    getNameUser(idUser) {
      return this.getUsuarios[idUser - 1].nickname;
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
    async eliminarMensaje(id) {
      try {
        await this.axios.delete(`${this.urlBorrar}/${id}`, {
          "content-type": "application/json",
        });
      } catch (error) {
        console.error("Error en deleteMensaje", error.message);
      }
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
.msg_receive {
  width: 60%;
  margin-top: 10px;

  background-color: rgb(206, 243, 252);
}
.msg_receive > .msg {
  background-color: rgb(176, 228, 241);
}
.msg_receive > .msg > .msg_text {
  text-align: left;
}
.msg_sent {
  margin-left: 40%;
  margin-top: 10px;
  background-color: rgb(223, 252, 206);
  width: 60%;
}
.messages {
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.messages > time {
  font-size: 11px;
  color: #ccc;
}
.msg_container {
  padding: 10px;
  overflow: hidden;
  display: flex;
}

h6 {
  text-align: right;
  font-size: 13px;
  color: rgb(107, 107, 107);
}
.msg_sent > .msg {
  background-color: rgb(200, 240, 176);
}
.msg_sent > .msg > .msg_text {
  text-align: left;
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
