<template>
  <div>
    <h1>Deconnexion</h1>
    <hr>

    <p>Veuillez attendre</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData(context){
    await context.$auth.logout()
  },
}
</script>