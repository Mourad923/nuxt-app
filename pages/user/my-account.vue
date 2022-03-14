<template>
  <div>
    <h1>Mon compte</h1>

    <hr>

    <div class="card">
      <div class="card-body">
        <h4>{{ $auth.user.full_name }}</h4>
        <div class="mb-5"><strong>Email:</strong> {{ $auth.user.email }}</div>
        <nuxt-link to="/user/logout" class="btn btn-danger">Déconnexion</nuxt-link>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>