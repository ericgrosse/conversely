<template>
  <div class="about">
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
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>