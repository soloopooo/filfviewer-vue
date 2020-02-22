<template>
<div>
    <div id="titlebar">
        <div id="tit">flifviewer</div>
        <Titlebtn id="min" type="min" />
        <Titlebtn id="max" type="max" />
        <Titlebtn id="close" type="close" />
    </div>
</div>
</template>

<script>
import Titlebtn from './Titlebtn.vue'
export default {
  name: 'titlebar',
  methods: {
  },
  components: {
    Titlebtn
  }
}
</script>

<style>
#tit{
    font-size:24px;
    padding:3px 1px 1px 35px;
    color:#368463;
}
#titlebar{
  width: 100vw;
  height: 35px;
  background-color: rgba(10, 212, 212, 0.527);
  -webkit-app-region: drag;
  align-items: center;
}
#min:hover {
    background-color: #1ce41c !important;
    animation: green- 0.3s;
  }
#max:hover {
    background-color: #fdfd24 !important;
    animation: yellow- 0.3s;
  }
#close:hover {
    background-color: #ff8787 !important;
    animation: red- 0.3s;
  }
@keyframes green- {
    0% {
        background-color: green;
    }
    100% {
        background-color: #1ce41c;
    } 
}
@keyframes yellow- {
    0% {
        background-color: #edf125;
    }
    100% {
        background-color: #fdfd24;
    } 
}
@keyframes red- {
    0% {
        background-color: red;
    }
    100% {
        background-color: #ff8787;
    } 
}
</style>