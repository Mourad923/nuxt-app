<template>
  <div>
    <h1>Inscription</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form
          action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Nom</label>
            <input
              v-model="name" type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.name }">
            <div v-if="errors && errors.name" class="invalid-feedback">
              {{ errors.name.msg }}
            </div>
          </div>

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

          <input type="submit" value="S'inscrire" class="btn btn-primary mr-3">
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
      name:null,
      email:null,
      password:null,
      status:false,
    }
  },
  methods:{
    submitForm(){
      this.$axios.post( '/api/users/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response)
          if(response.data._id){
            this.$router.push({ name:'user-login', params:{ registered:'yes' } })
            
            this.$auth.loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password
                }
              })
              .catch( (error) => {
                console.log(error)
              })
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  }
}
</script>