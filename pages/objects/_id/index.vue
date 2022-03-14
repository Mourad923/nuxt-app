<template>
  <div>
    <h1>Objet</h1>

    <hr>

    <div class="alert alert-success"
      v-if="$route.params.updated=='yes'">Mise à jour réussi</div>

    <h2>{{ objet.title }}</h2>
    

    <hr>
    <div class="d-flex justify-content-between">
      <div>
        <nuxt-link :to="'/objects/' + objet._id + '/update'" class="btn btn-primary mr-3">Mettre à jour</nuxt-link>
        <button class="btn btn-danger" @click="deleteRecord()">Supprimer</button>
      </div>
      <nuxt-link to="/objects" class="btn btn-secondary mr-3">Retour à liste d'objets</nuxt-link>
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
      objet : data
    }
  },

  methods:{
    deleteRecord(){
      if(confirm("Etes vous sure de supprimer l'objet ?") === true){
        this.$axios.delete('/api/objects/' + this.$route.params.id)
          .then((response) => {
            if(response.data._id){
              this.$router.push({ name:'objects', params:{ deleted:'yes' } })
            }
          })
          .catch( (error) => {
            console.log(error);
          });
      }
    }
  }
}
</script>
