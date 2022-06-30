<template>

  <section class="src-components-forum">
    <div class="row chat-window" id="chat_window_1">
        <div class="col-12 col-12">
          <div class="panel panel-default">
                <div class="panel-heading top-bar">
                        <h3 class="panel-title"><span class="glyphicon glyphicon-comment"></span> {{title}}</h3>
                    <div class="col-md-4 col-xs-4" style="text-align: right;">
                        <a href="#"><span id="minim_chat_window" class="glyphicon glyphicon-minus icon_minim"></span></a>
                        <a href="#"><span class="glyphicon glyphicon-remove icon_close" data-id="chat_window_1"></span></a>
                    </div>
                </div>
                <div class="panel-body msg_container_base">
                    <div class="row msg_container">
                        <div class="col-md-10 col-xs-10">
                            <div :class="getClassMessage(message.userId)" v-for="(message, index) in messages.data" :key="index">
                                <div class="msg rounded"> <p class="ml-2 mr-2 msg_text">{{message.text}}</p> </div>
                                <h6>{{getNameUser(message.userId)}}</h6>
                            </div>
                        </div>
                      </div>
                  </div>
            </div>
        </div>
    </div>



    

    <vue-form
      :state="formstate"
      @submit.prevent="enviar()"
      class="row mt-1 mr-2" style="float:right;
  "
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
  </section>

</template>

<script>

  export default  {
    name: 'src-components-forum',
    props: ["title", "idForum"],
    async mounted () {
       let { data: messages } = await this.axios(`${this.url}/${(this.idForum)}`, {'content-type':'application/json'})
       this.messages = messages
    },
      async updated () {
       let { data: messages } = await this.axios(`${this.url}/${(this.idForum)}`, {'content-type':'application/json'})
       this.messages = messages
    },
    data () {
      return {
        url: 'http://localhost:4444/messagesForums',
        messages: [],
        formstate: {},
        formData: this.getInitialData()
      }
    },
    methods: {
      getInitialData() {
        return {
          text: ""
        }
        
      },
      getClassMessage(idUser) {
        if(this.getUsuarioActual.id == idUser) {
          return 'messages msg_sent'
        }
        else {
          return 'messages msg_receive'
        }
      },
      getNameUser(idUser) {
        return this.getUsuarios[idUser - 1].nickname
        
      },
      async enviar() {
        let text = { ...this.formData }
        try {
                await this.axios.post(this.url, {text: text, idForum: this.idForum, idUser: this.getUsuarioActual.id}, {'content-type':'application/json'} )

             }
             catch(error) {
               console.error('Error en postMensaje', error.message)
             }
             this.formData = this.getInitialData();
      this.formstate._reset();
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-forum {

  }
.top-bar {
  background: rgb(244, 134, 96);
  color: white;
  padding: 10px;
  
}
.msg_receive{
    padding-left:0;
    margin-left:0;
    margin-top: 10px;
    background-color: rgb(206, 243, 252);
}
.msg_receive > .msg {
  background-color: rgb(176, 228, 241);
  
}
.msg_receive > .msg > .msg_text {
  text-align: left;
}
.msg_sent{
    padding-bottom:20px;
    margin-top: 10px;
    background-color: rgb(223, 252, 206);
    
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
  color:rgb(107, 107, 107);
}
.msg_sent > .msg {
  background-color: rgb(200, 240, 176);
  
}
.msg_sent > .msg > .msg_text {
  text-align: left;
}

.msg_container_base::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}
.msg_container_base::-webkit-scrollbar
{
    width: 12px;
    background-color: #F5F5F5;
}

.msg_container_base::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}



.chat-window > div > .panel{
    border-radius: 5px 5px 0 0;
}
.icon_minim{
    padding:2px 10px;
}
.msg_container_base{
  background: #e5e5e5;
  margin: 0;
  padding: 0 10px 10px;
  max-height: 800px;
  overflow-x:hidden;
}

</style>
