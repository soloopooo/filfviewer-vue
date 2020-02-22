<template>
  <div 
    class="titlebtn"
    v-bind:style="style"
    v-on:click="click" />
</template>

<script>
const {ipcRenderer: ipc} = require('electron')
const style = {
  min: {
    backgroundColor: 'green',
    right: '100px'
  },
  max: {
    backgroundColor: '#edf125',
    right: '60px'
  },
  close: {
    backgroundColor: 'red',
    right: '20px'
  }
}
export default {
  name: 'Titlebtn',
  props: ['type'],
  computed: {
    style: function () {
      return style[this.type]
    }
  },
  methods: {
    click: function () {
      ipc.send(this.type)
    }
  }
}
</script>
    
<style>
.titlebtn {
   position: absolute;
    width: 20px;
    height: 20px;
    top: 5px;
    bottom: initial;
    margin: auto auto;
    -webkit-app-region: no-drag;
    flex: 1;
    border-radius: 10px;
}
</style>