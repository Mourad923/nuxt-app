<template>
  <div>
    <h1>Connexion</h1>
    <hr>

    <div
      v-if="$route.params.registered=='yes'"
      class="alert alert-success">Vous avez bien été enregistré</div>

    <div class="row">
      <div class="col-md-6">
        <form
          action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Email</label>
            <input
              v-model="email" type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.email }">
            <div v-if="errors && errors.email" class="invalid-feedback">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Mot de passe</label>
            <input
              v-model="password" type="password"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.password }">
            <div v-if="errors && errors.password" class="invalid-feedback">
              {{ errors.password.msg }}
            </div>
          </div>

          <div
            v-if="login_error"
            class="alert alert-danger">{{ login_error }}</div>

          <input type="submit" value="Connexion" class="btn btn-primary mr-3">
          <nuxt-link to="/" class="btn btn-secondary mr-3">Annuler</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data(){
    return{
      errors:null,
      login_error:null,
      email:null,
      password:null,
      status:false,
    }
  },
  methods:{
    submitForm(){
      this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.message){
            this.login_error = error.response.data.message
          }
        })
    }
  }
}
</script>