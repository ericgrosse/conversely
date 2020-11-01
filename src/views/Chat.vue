<template>
  <div class="home">
    <div class="message-input">
      <button v-on:click="navigateBack">&lt;</button>
      <input autocomplete="off" v-on:keyup="changeText" v-model="currentMessage" placeholder="Message" type="text" />
      <button v-on:click="submitText" v-bind:disabled="!currentMessage">Send</button>
    </div>

    <div class="chat-container">
      <div
        v-bind:key="'message-' + index"
        v-for="(message, index) in messages"
      >
        {{message}}
      </div>
      <div
        v-bind:key="'typing-message-' + index"
        v-for="(typingMessage, index) in typingMessages"
      >
        {{typingMessage}}
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'

const socket = io('http://localhost:3000')
let timeout

export default {
  name: 'Home',
  data() {
    return {
      messages: [],
      currentMessage: '',
      typing: false,
      typingMessages: [],
    }
  },
  methods: {
    changeText(evt) {
      if (evt.which === 13) {
        this.submitText()
        return
      }

      this.currentMessage = evt.target.value

      if (this.typing === false) {
        this.typing = true
        
        socket.emit('typing', {
          isTyping: true,
          message: `${this.username} is typing...`
        })

        timeout = setTimeout(this.typeTimeout, 1000)
      }
      else {
        clearTimeout(timeout)
        timeout = setTimeout(this.typeTimeout, 1000)
      }
    },
    typeTimeout() {
      this.typing = false
      socket.emit('typing', {isTyping: false})
    },
    submitText() {
      // If still typing while submitting the form, remove the 'a user is typing' message
      if (this.typing === true) {
        clearTimeout(timeout) // clear the timer for 'a user is typing'
        this.typing = false
      }

      socket.emit('send message', `${this.username}: ${this.currentMessage}`)
      socket.emit('typing', {isTyping: false})
      this.currentMessage = ''
    },
    navigateBack() {
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState(['username'])
  },
  created() {
    if (!this.username) {
      this.$router.push('/login')
    }

    socket.emit('send message', `${this.username} has joined the chat`)

    socket.on('typing', ({isTyping, message}) => {
      isTyping ? this.typingMessages.push(message) : this.typingMessages.pop()
    })

    socket.on('send message', (msg) => {
      this.messages.push(msg)
    })

    socket.on('remove message', () => {
      this.messages.pop()
    })
  },
  destroyed() {
    socket.emit('send message', `${this.username} has left the chat`)
  }
}
</script>

<style scoped lang="scss">
.chat-container {
  padding: 16px;
}

.message-input {
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
