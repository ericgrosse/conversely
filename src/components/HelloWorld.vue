<template>
  <div class="hello-world">
    <input id="m" autocomplete="off" v-on:keyup="changeText" />
    <button v-on:click="submitText">Send</button>
    <ul id="messages">
      <li
        v-bind:key="message.id"
        v-for="message in messages"
      >
        {{message}}
      </li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client'

const socket = io('http://localhost:3000')
let typing = false;
let timeout;

function timeoutFunction() {
  typing = false;
  socket.emit('remove message');
}

export default {
  name: 'HelloWorld',
  data() {
    return {
      messages: [],
      currentMessage: '',
    }
  },
  methods: {
    changeText(evt) {
      if (evt.which === 13) {
        return;
      }

      this.currentMessage = evt.target.value;

      if (typing === false) {
        typing = true;
        socket.emit('typing', 'a user is typing...');
        timeout = setTimeout(timeoutFunction, 1000);
      }
      else {
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 1000);
      }
    },
    submitText() {
      // If still typing while submitting the form, remove the 'a user is typing' message
      if (typing === true) {
        clearTimeout(timeout); // clear the timer for 'a user is typing'
        typing = false;
        socket.emit('remove message');
      }

      socket.emit('send message', this.currentMessage);
      return false;
    }
  },
  created() {
    socket.on('send message', (msg) => {
      this.messages.push(msg)
    });

    socket.on('remove message', () => {
      this.messages.pop()
    });
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
