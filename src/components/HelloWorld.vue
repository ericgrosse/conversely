<template>
  <div class="hello">
    <h1>Sockets are cool</h1>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    socket.on('message', () => {
      console.log('message received from server, sending message back...');
      socket.emit('message');
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
