<template>
  <div class="login">
    <input v-on:keyup="handleInput" placeholder="Username" type="text">
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

<style scoped lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type=text] {
  font-size: 18px;
  padding: 4px;
}

button {
  padding: .375rem .75rem;
  background-color: #17a2b8;
  border: 1px solid #17a2b8;
  color: white;
  cursor: pointer;
  font-size: 16px;
  outline: none;

  &:hover {
    background-color: #138496;
    border-color: #117a8b;
  }

  &:disabled {
    opacity: 0.65;
  }
}
</style>