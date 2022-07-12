<template>

  <section :class="getClassMessage(message.userId)">
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
  </section>

</template>

<script>

  export default  {
    name: 'src-components-message',
    props: ["message"],
    mounted () {

    },
    data () {
      return {
        urlBorrar: "http://localhost:4444/message",
      }
    },
    methods: {
    getNameUser(idUser) {
      return this.getUsuarios[idUser - 1].nickname;
    },
    getClassMessage(idUser) {
      if (this.esUsuarioActual(idUser)) {
        return "messages msg_sent";
      } else {
        return "messages msg_receive";
      }
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
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  h6 {
  text-align: right;
  font-size: 13px;
  color: rgb(107, 107, 107);
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
.msg_sent > .msg {
  background-color: rgb(200, 240, 176);
}
.msg_sent > .msg > .msg_text {
  text-align: left;
}
</style>
