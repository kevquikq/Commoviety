<template >
  <section class="registration">
    <h1 class="text-uppercase">Registrarse</h1>
    <p>Por favor completa los siguiente campos para registrarse</p>

    <!-- FORMULARIO -->

    

    <vue-form
      :state="formstate"
      @submit.prevent="enviar()"

    >
    <div class="container-fluid mt-2">
  <div class="row">
  <span class="col-xl-9">
        <div class="row ml-2">
      <div class="col">

            <!--CAMPO NOMBRE -->
            <validate tag="div">
              <label for="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                v-model="formData.nombre"
                name="nombre"
                autocomplete="off"
                class="form-control"
                required
                sin-espacios
                :minlength="datoMinLength"
                :maxlength="datoMaxLength"
              />

              <field-messages name="nombre" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">
                  Campo obligatorio
                </div>
                <div slot="sin-espacios" class="alert alert-danger mt-1">
                  No puede haber espacios en este campo
                </div>
                <div slot="minlength" class="alert alert-danger mt-1">
                  Se debe insertar como minimo {{ datoMinLength }} caracteres.
                </div>
                <div
                  class="alert alert-danger mt-1"
                  v-if="formData.nombre.length == datoMaxLength"
                >
                  La cantidad maxima de caracteres es {{ datoMaxLength }}.
                </div>
              </field-messages>
            </validate>
            </div>
            <br>
            <div class="col">
            <!--CAMPO Apellido -->
            <validate tag="div">
              <label for="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                v-model.trim="formData.apellido"
                name="apellido"
                autocomplete="off"
                class="form-control"
                required
                sin-espacios
                :minlength="datoMinLength"
                :maxlength="datoMaxLength"
              />

              <field-messages name="apellido" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">
                  Campo obligatorio
                </div>
                <div slot="sin-espacios" class="alert alert-danger mt-1">
                  No puede haber espacios en este campo
                </div>
                <div slot="minlength" class="alert alert-danger mt-1">
                  Se debe insertar como minimo {{ datoMinLength }} caracteres.
                </div>
                <div
                  class="alert alert-danger mt-1"
                  v-if="formData.apellido.length == datoMaxLength"
                >
                  La cantidad maxima de caracteres es {{ datoMaxLength }}.
                </div>
              </field-messages>
            </validate>
          </div>
          </div>
          <br>
          <div class="row ml-2" >
            <div class="col">
            <!--CAMPO USUARIO -->
            <validate tag="div">
              <label for="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                v-model.trim="formData.usuario"
                name="usuario"
                autocomplete="off"
                class="form-control"
                required
                sin-espacios
                :minlength="datoMinLength"
                :maxlength="datoMaxLength"
              />

              <field-messages name="usuario" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">
                  Campo obligatorio
                </div>
                <div slot="sin-espacios" class="alert alert-danger mt-1">
                  No puede haber espacios en este campo
                </div>
                <div slot="minlength" class="alert alert-danger mt-1">
                  Se debe insertar como minimo {{ datoMinLength }} caracteres.
                </div>
                <div
                  class="alert alert-danger mt-1"
                  v-if="formData.usuario.length == datoMaxLength"
                >
                  La cantidad maxima de caracteres es {{ datoMaxLength }}.
                </div>
              </field-messages>
            </validate>
            </div>
            <div class="col">
            <!-- CAMPO EDAD -->
            <validate tag="div">

          <label for="edad">Edad</label>
          <input 
            type="number"
            id="age"
            class="form-control"
            name="age"
            autocomplete="off"
            v-model.number="formData.edad" 
            required 
            :min="edadMin"
            :max="edadMax"
          />
    
          <field-messages name="edad" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="min" class="alert alert-danger mt-1">La edad mínima debe ser {{edadMin}} años.</div>
            <div slot="max" class="alert alert-danger mt-1">La edad no debe superar los {{edadMax}} años.</div>
          </field-messages>

        </validate>
        <br>
            </div>
</div>


        <div class="row ml-2">
          <div class="col">
            <!--CAMPO EMAIL -->
            <validate tag="div">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model.trim="formData.email"
                name="email"
                autocomplete="off"
                class="form-control"
                required
               
                sin-espacios
                :minlength="datoMinLength"
                :maxlength="datoMaxLength"
              />

              <field-messages name="email" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">
                  Campo obligatorio
                </div>
                <div slot="sin-espacios" class="alert alert-danger mt-1">
                  No puede haber espacios en este campo
                </div>
                <div slot="minlength" class="alert alert-danger mt-1">
                  Se debe insertar como minimo {{ datoMinLength }} caracteres.
                </div>
                <div
                  class="alert alert-danger mt-1"
                  slot="maxlength"
                >
                  La cantidad maxima de caracteres es {{ datoMaxLength }}.
                </div>
              </field-messages>
            </validate>

         </div>
          </div>

          <br>
          <div class="row ml-2">

          <div class="col">

            <!--CAMPO CONTRASEÑA -->
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
                <div slot="required" class="alert alert-danger mt-1">
                  Campo obligatorio
                </div>

              </field-messages>
            </validate>
          </div>
          <br>

          <div class="col-md-6">

            <!--CAMPO REPETIR CONTRASEÑA -->
            <validate tag="div">
              <label for="repeatContrasenia">Repetir Contraseña</label>
              <input
                type="password"
                id="repeatContrasenia"
                v-model.trim="formData.repeatContrasenia"
                name="repeatContrasenia"
                autocomplete="off"
                class="form-control"
                required

                :son-iguales="formData.contrasenia"
              />

              <field-messages name="repeatContrasenia" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">
                  Campo obligatorio
                </div>
                <div class="alert alert-danger mt-1" slot="son-iguales">
                  Las contraseñas deben ser iguales
                </div>
              </field-messages>
            </validate>
            </div>
          </div>
        
      
      
      </span>
      <br>
      

        <span class="col-sm-3">
          
        <svg
          class="mt-3 pt-3 bi bi-file-person-fill" style="color: #f48660"
          width="300"
          height="300"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"
          />
        </svg>
        </span>
      </div>
      </div>
      <button
        class="btn btn-danger col-12 mt-5"
        style="background: #f48660"
        :disabled="formstate.$invalid"
        type="submit"
      >
        Registrarse
      </button>
      </vue-form>
      <p class="mt-3">
        ¿Ya tienes cuenta?
        <a style="color: #f48660" href="#" @click="goToLogin()"
          >Inicia sesion</a
        >
      </p>
    
  </section>
</template>

<script >
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "registration",
  props: [],
  mounted(){
    this.$store.dispatch('getUsuarios')
  },
  data() {
    return {
      formstate: {},
      formData: this.getInitialData(),
      datoMaxLength: 20,
      datoMinLength: 3,
      edadMin: 18,
      edadMax: 120,
    };
  },
  methods: {
    getInitialData() {
      return {
        nombre: "",
        apellido: "",
        usuario: "",
        edad: "",
        email: "",
        contrasenia: "",
        repeatContrasenia: "",
      };
    },
    async enviar() {
      let usuario = { ...this.formData };
      if (this.noExiste(usuario.usuario)) {
        delete usuario.repeatContrasenia;
        this.postUsuario(usuario)
      }
      this.formData = this.getInitialData();
      this.formstate._reset();
    },
    noExiste(nombreUsuario) {
      return (
        this.getUsuarios.filter((usuario) => usuario.nickname == nombreUsuario)
          .length == 0
      );
    },

    goToLogin() {
      this.$router.push({
        path: '/login'
      })
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
.registration {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

h1 {
  color: #f48660;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 3.9rem;
}

.row {
  grid-template: 1fr 1fr;
}
</style>
