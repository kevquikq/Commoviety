<template>

  <section class="login">
    <div class="row">
      <span class="col-md-6" style="margin-left: 60px">
        <div class="row ml-4" >
          <div class="col-12 mt-5">
            <h1>BIENVENIDO!</h1>
          <h6>Por favor ingrese sus datos a continuación</h6>
          <br>
          <div v-if="!usuarioCorrecto">
            <div class="alert alert-danger"> El usuario o la contraseña es incorrecta </div>
          </div>
          </div>
        </div>
      
        <vue-form :state="formstate" @submit.prevent="enviar()">
          <div class="row ml-4">
            <div class="col-12 mt-5" style="width:100%">
              <validate tag="div">  
            <label for="nombre">Usuario</label>
            <input 
            type="text" 
            id="nombre" 
            v-model="formData.nombre" 
            name="nombre"
            autocomplete="off"
            class="form-control"
            required
            />
            
            <field-messages name="nombre" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">Campo obligatorio</div>
            </field-messages>
          </validate>
            </div>
          
          <br>
          </div>
          
        <div class="row ml-4">
          <div class="col-12 mt-3">
            <validate tag="div">  
            <label for="contrasenia">Contraseña</label>
            <input 
            type="password" 
            id="contrasenia" 
            v-model.trim="formData.contrasenia" 
            name="contrasenia"
            autocomplete="off"
            class="form-control"
            required 
            />
            
            <field-messages name="contrasenia" show="$dirty">
              <div slot="required" class="alert alert-danger mt-1">Campo obligatorio</div>
              </field-messages>
          </validate>
          </div>
          
          <br>
        </div>

        <br>

        <div class="row ml-4">
          <button class="btn btn-danger col-12 mt-5 rounded" 
                style="background:#F48660" 
                :disabled="formstate.$invalid" 
                type="submit">
                                  Iniciar sesión
        </button> 
        </div>

        <div class="row ml-4">
          <div class="col-12">
          <p class="mt-3" >¿No tienes cuenta? <a style="color:#F48660" @click="goToRegistration()" href="#"> Registrate gratis
        </a></p>
        </div>
        </div>
 
        </vue-form>
        
        

      </span>
      <span class="col-md-5">
        <img src="https://cdn.pixabay.com/photo/2016/08/23/15/12/popcorn-1614707_960_720.png" class="img-fluid " alt="Responsive image" style="margin-left: 170px">
      </span>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-login',
    props: [],
    mounted(){

    },
    data () {
      return {
        formstate: {},
        formData: this.getInitialData(),
        usuarioCorrecto: true,
      }
    },
    methods: {
      getInitialData() {
        return {
          nombre: "",
          contrasenia: ""
        }

      },
      goToRegistration() {
        this.$router.push({
          path: '/registration'
        })
      },
      enviar() {
        let usuario = {...this.formData}
        let usuarioRegistrado = this.obtenerUsuario(usuario.nombre,usuario.contrasenia)
        console.log(usuarioRegistrado)
        if(usuarioRegistrado){
          this.usuarioCorrecto = true
          this.enviarUsuarioActual(usuarioRegistrado)
          this.goToSearchMovie()
        }else{
          this.usuarioCorrecto = false
        }
        this.formData = this.getInitialData()
        this.formstate._reset()
      },
      obtenerUsuario(usuarioIngresado,contraseniaIngresada){
        return this.getUsuarios.find(usuario => usuario.nickname == usuarioIngresado && usuario.password == contraseniaIngresada)
      },
      goToSearchMovie() {
        this.$router.push({
          path: '/searchmovies'
        })
      },

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .login {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }

  h1 {
    color: #f48660;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 3.9rem;
  }
  h6, p, button, input {
    font-family: Helvetica, Arial, sans-serif;
  }


</style>
