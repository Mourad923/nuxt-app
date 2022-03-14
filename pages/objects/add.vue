<template>
  <div>
    <h1>Ajouter un nouvelle Objet</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form
          action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Titre</label>
            <input
              v-model="title" type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.title }">
            <div v-if="errors && errors.title" class="invalid-feedback">
              {{ errors.title.msg }}
            </div>
          </div>


          <input type="submit" value="Submit" class="btn btn-primary mr-3">
          <nuxt-link to="/objects" class="btn btn-secondary mr-3">Annuler</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data(){
    return{
      errors:null,
      title:null,
    
    }
  },
  methods:{
    submitForm(){
      this.$axios.post( '/api/objects', {
          title: this.title,
          
        })
        .then((response) => {
          console.log(response)
          if(response.data._id){
            this.$router.push({ name:'objects', params:{ created:'yes' } })
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