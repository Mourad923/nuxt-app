<template>
  <div>
    <h1>Mettre à jour l'objet</h1>
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

          <input type="submit" value="Valider" class="btn btn-primary mr-3">
          <nuxt-link :to="'/objects/' + $route.params.id" class="btn btn-secondary mr-3">Retour</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData(context){
    const {data} = await context.$axios.get('/api/objects/' + context.route.params.id)
    return {
      object : data
    }
  },
  data(){
    return{
      errors:null,
      title:null,
      
    }
  },
  mounted(){
    this.fillFormData()
  },
  methods:{
    fillFormData(){
      this.title = this.object.title
      
    },
    submitForm(){
      this.$axios.put( '/api/objects/' + this.$route.params.id , {
          title: this.title,
          
        })
        .then((response) => {
          console.log(response)
          if(response.data._id){
            this.$router.push({ name:'objects-id', params:{ updated:'yes', id: this.$route.params.id } })
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