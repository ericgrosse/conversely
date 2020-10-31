<template>
  <div class="home">
    <h1>Chat</h1>
    <button v-on:click="navigateBack">Back</button>
    <input id="m" autocomplete="off" v-on:keyup="changeText" />
    <button v-on:click="submitText" v-bind:disabled="!currentMessage">Send</button>
    <ul id="messages">
      <li
        v-bind:key="message.id"
        v-for="message in messages"
      >
        {{message}}
      </li>
      <p v-if="typing">{{`${username} is typing...`}}</p>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'

const socket = io('http://localhost:3000')
let timeout;

export default {
  name: 'Home',
  data() {
    return {
      messages: [],
      currentMessage: '',
      typing: false,
    }
  },
  methods: {
    changeText(evt) {
      if (evt.which === 13) {
        return;
      }

      this.currentMessage = evt.target.value;

      if (this.typing === false) {
        socket.emit('typing', true);
        timeout = setTimeout(this.typeTimeout, 1000);
      }
      else {
        clearTimeout(timeout);
        timeout = setTimeout(this.typeTimeout, 1000);
      }
    },
    typeTimeout() {
      socket.emit('typing', false);
    },
    submitText() {
      // If still typing while submitting the form, remove the 'a user is typing' message
      if (this.typing === true) {
        clearTimeout(timeout); // clear the timer for 'a user is typing'
        socket.emit('typing', false);
      }

      socket.emit('send message', this.currentMessage);
    },
    navigateBack() {
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState(['username'])
  },
  created() {
    socket.emit('send message', `${this.username} connected`)

    socket.on('typing', (val) => {
      this.typing = val;
    });

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
p {
  font-size: 12px;
  margin: 0;
}
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
