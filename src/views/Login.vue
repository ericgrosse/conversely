<template>
  <div class="about">
    <h1>Conversely Login</h1>
    <input v-on:keyup="handleInput" type="text">
    <button v-on:click="handleLogin">Join</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    handleInput(evt) {
      this.username = evt.target.value
    },
    handleLogin() {
      this.$store.commit('updateUsername', this.username)
      this.$router.push('/chat')
    },
  }
}
</script>

<style scoped>

</style>