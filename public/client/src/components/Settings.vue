<template>
  <section class="src-components-settings">
    <div v-if="getUsuarioActual">
      <button
        class="btn btn-danger col-6 mt-2 mb-2"
        :style="{ background: '#f48660' }"
        @click="showList"
      >
        Volver al buscador
      </button>
      <div class="borde-titulo">
        <h1>Configuracion</h1>
      </div>
      <br />

      <button
        class="btn btn-danger col-5 mt-2 mb-2 mr-2"
        :style="{ background: '#f48660' }"
        @click="cambiarModoUsuario"
      >
        Cambiar nombre de usuario
      </button>

      <button
        class="btn btn-danger col-5 mt-2 mb-2"
        :style="{ background: '#f48660' }"
        @click="cambiarModoContrasenia"
      >
        Cambiar contraseña
      </button>

      <div v-show="modoUsuario" class="container">
        <br />
        <vue-form
          :state="formstateNickname"
          @submit.prevent="enviarNuevoNombreDeUsuario()"
        >
          <validate tag="div">
            <label for="usuario">Nuevo nombre de usuario</label>
            <input
              type="text"
              id="usuario"
              v-model.trim="formDataNickname.usuario"
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
                v-if="formDataNickname.usuario.length == datoMaxLength"
              >
                La cantidad maxima de caracteres es {{ datoMaxLength }}.
              </div>
            </field-messages>
          </validate>
          <button
            class="btn btn-danger col-12 mt-2 rounded"
            style="background: #f48660"
            :disabled="formstateNickname.$invalid"
            type="submit"
          >
            Enviar
          </button>
        </vue-form>
        <br />
        <div class="alert alert-success" v-if="cambioElNombreDeUsuario">
          Se cambio el nombre de usuario
        </div>
      </div>

      <div v-show="modoContrasenia" class="container">
        <br />
        <vue-form
          :state="formstatePassword"
          @submit.prevent="enviarNuevaContrasenia()"
        >
          <validate tag="div">
            <label for="contrasenia">Nueva contraseña</label>
            <input
              type="password"
              id="contrasenia"
              v-model.trim="formDataPassword.contrasenia"
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

          <validate tag="div">
            <label for="repeatContrasenia">Repetir nueva contraseña</label>
            <input
              type="password"
              id="repeatContrasenia"
              v-model.trim="formDataPassword.repeatContrasenia"
              name="repeatContrasenia"
              autocomplete="off"
              class="form-control"
              required
              :son-iguales="formDataPassword.contrasenia"
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

          <button
            class="btn btn-danger col-12 mt-2 rounded"
            style="background: #f48660"
            :disabled="formstatePassword.$invalid"
            type="submit"
          >
            Enviar
          </button>
        </vue-form>
        <br />
        <div class="alert alert-success" v-if="cambioLaContraseña">
          Se cambio la contraseña
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Debe estar logueado para ver esta pagina</h2>
      <button
        class="btn btn-danger col-6 mt-2 mb-2"
        :style="{ background: '#f48660' }"
        @click="showList"
      >
        Volver al buscador
      </button>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-settings',
    props: [],
    mounted () {

    },
    data () {
      return {
        modoUsuario : true,
        modoContrasenia: false,
        formstateNickname: {},
        formDataNickname: this.getInitialDataNickname(),
        formstatePassword: {},
        formDataPassword: this.getInitialDataPassword(),
        datoMaxLength: 20,
        datoMinLength: 3,
        cambioElNombreDeUsuario: false,
        cambioLaContraseña: false,
      }
    },
    methods: {
      getInitialDataNickname() {
        return {
          usuario: "",
        };
      },
      getInitialDataPassword() {
        return {
          contrasenia: "",
          repeatContrasenia: ""
        };
      },
      enviarNuevoNombreDeUsuario(){
        let nuevoNombreDeUsuario = { ...this.formDataNickname }
        this.modificarUsuario(nuevoNombreDeUsuario)
        this.cambioElNombreDeUsuario = true
        this.formDataNickname = this.getInitialDataNickname()
        this.formstateNickname._reset()
      },
      enviarNuevaContrasenia(){
        let nuevaContrasenia = { ...this.formDataPassword }
        delete nuevaContrasenia.repeatContrasenia;
        this.modificarUsuario(nuevaContrasenia)
        this.cambioLaContraseña = true
        this.formDataPassword = this.getInitialDataPassword()
        this.formstatePassword._reset()
      },
      cambiarModoUsuario() {
        this.modoUsuario = true
        this.modoContrasenia = false
        this.cambioElNombreDeUsuario = false
        this.cambioLaContraseña = false
      },
      cambiarModoContrasenia() {
        this.modoUsuario = false
        this.modoContrasenia = true
        this.cambioElNombreDeUsuario = false
        this.cambioLaContraseña = false
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
.src-components-settings {
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
