<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>Objets</h1>
      <nuxt-link to="/objects/add" class="btn btn-success">Ajouter un objet</nuxt-link>
    </div>
    <hr>

    <div
    v-if="$route.params.created=='yes'"
      class="alert alert-success">Enregistrement reussi</div>
    <div
    v-if="$route.params.deleted=='yes'"
      class="alert alert-success">Suppression reussi</div>

    <div
      v-if="objects.length">
      <nuxt-link
      
        v-for="object in objects"
        :key="object._id"
        class="list-group-item list-group-item-action"
        :to="'/objects/' + object._id">
        {{ object.title }}
        
      </nuxt-link>
    </div>

    <div
    v-else
      class="alert alert-info">
      Pas d'enregistrement trouvé.
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context){
    const {data} = await context.$axios.get('/api/objects')
    return {
      objects : data
    }
  },
}
</script>