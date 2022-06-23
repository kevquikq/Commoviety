<template >
  <section class="registration">
    <h1 class="text-uppercase">Registrarse</h1>
    <p>Por favor completa los siguiente campos para registrarse</p>

    <!-- FORMULARIO -->
    <vue-form
      class="row"
      :state="formstate"
      @submit.prevent="enviar()"
      :style="{ margin: '0 15rem' }"
    >
      <div class="col">
        <div>
          <div class="d-flex justify-content-between">
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
                :style="{ width: '27rem' }"
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
            <br />

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
                :style="{ width: '27rem' }"
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
            <br />
          </div>
          <br />
          <div class="d-flex justify-content-between">
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
                :style="{ width: '27rem' }"
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
            <br />

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
                :style="{ width: '27rem' }"
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
                  v-if="formData.email.length == datoMaxLength"
                >
                  La cantidad maxima de caracteres es {{ datoMaxLength }}.
                </div>
              </field-messages>
            </validate>
            <br />
          </div>
          <br />
          <div class="d-flex justify-content-between">
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
                :style="{ width: '27rem' }"
              />

              <field-messages name="contrasenia" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">
                  Campo obligatorio
                </div>
                <!-- <div slot="sin-espacios" class="alert alert-danger mt-1">No puede haber espacios en este campo</div>
                        <div slot="minlength" class="alert alert-danger mt-1">
                          Se debe insertar como minimo {{datoMinLength}} caracteres.
                        </div>
                        <div class="alert alert-danger mt-1" v-if="formData.apellido.length==datoMaxLength">
                          La cantidad maxima de caracteres es {{datoMaxLength}}.
                        </div> -->
              </field-messages>
            </validate>
            <br />

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
                :style="{ width: '27rem' }"
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
            <br />
          </div>
        </div>
      </div>
      <div class="col-3">
        <svg
          style="color: #f48660"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          fill="currentColor"
          class="bi bi-file-person-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"
          />
        </svg>
      </div>
      <button
        class="btn btn-danger col-12 mt-5"
        style="background: #f48660"
        :disabled="formstate.$invalid"
        type="submit"
      >
        Registrarse
      </button>
      <p class="mt-3" :style="{ paddingLeft: '33rem' }">
        ¿Ya tienes cuenta?
        <a style="color: #f48660" href="#" @click="goToLogin()"
          >Inicia sesion</a
        >
      </p>
    </vue-form>
  </section>
</template>

<script >
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "registration",
  props: [],
  async mounted() {
    let { data: usuarios } = await this.axios(this.url);
    this.usuarios = usuarios;
  },
  data() {
    return {
      formstate: {},
      formData: this.getInitialData(),
      url: "https://627da2b8dd8aafd4fa80dcd3.mockapi.io/personas",
      datoMaxLength: 20,
      datoMinLength: 3,
      usuarios: [],
    };
  },
  methods: {
    getInitialData() {
      return {
        nombre: "",
        apellido: "",
        usuario: "",
        email: "",
        contrasenia: "",
        repeatContrasenia: "",
      };
    },
    async enviar() {
      let usuario = { ...this.formData };
      if (this.noExiste(usuario.usuario)) {
        delete usuario.repeatContrasenia;
        await this.axios.post(this.url, usuario, {
          "content-type": "application/json",
        });
      }

      let { data: usuarios } = await this.axios(this.url);
      this.usuarios = usuarios;
      this.formData = this.getInitialData();
      this.formstate._reset();
    },
    noExiste(nombreUsuario) {
      return (
        this.usuarios.filter((usuario) => usuario.usuario == nombreUsuario)
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
