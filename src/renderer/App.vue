<template>
  <div id="app">
    <titlebar />
    <router-view></router-view>
  </div>
</template>

<script>
import titlebar from './components/Title/Title'
export default {
  name: 'flifviewer-vue',
  components: {
    titlebar
  }
}
</script>

<style>
  /* CSS */
html,
body,
div {
  margin: 0;
  padding: 0;
}
#wrapper::-webkit-scrollbar:{
  display:none;
}
</style>
