<template>
  <div class="about">
    <h1>Conversely Login</h1>
    <input v-on:keyup="handleInput" type="text">
    <button v-on:click="handleLogin" v-bind:disabled="!username">Join</button>
  </div>
</template>

<script>
//import io from 'socket.io-client'
//const socket = io('http://localhost:3000')

export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    handleInput(evt) {
      this.username = evt.target.value

      if(evt.which === 13) {
        this.handleLogin()
      }
    },
    handleLogin() {
      this.$store.commit('updateUsername', this.username)
      //socket.emit('send message', `${this.username} connected`)
      this.$router.push('/chat')
    },
  }
}
</script>

<style scoped>

</style>