<template>
<div style="text-align:center;">
    <h1 style="color:#33cc55">Open a Flif file to preview</h1>
    <br />
    <h3>Click the button below to continue.</h3>
    <p>Your file:</p>
    <el-input :disabled="true" :rows="1" autosize id="path3" type="textarea"></el-input>
     <div class="block">
       <span class="demonstration">Preview Quality:</span>
    <el-slider v-model="Qlt" show-input></el-slider>
  </div>
    <el-button @click="clickopen">Open a file</el-button>
    <el-button :disabled="filearimasen" @click="preview">Preview my file!</el-button>
    <input @change = "fileopen" type="file" name="filename" id="click2open" accept=".flif" style="display:none" />
    <div id="msgout"></div>
</div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      textarea: '',
      Qlt: 50,
      filearimasen: true
    }
  },
  methods: {
    clickopen () {
      document.getElementById('click2open').click()
    },
    fileopen () {
      document.getElementById('path3').value = document.getElementById('click2open').files[0].path
      this.filearimasen = false
    },
    preview () {
      this.$message('Decoding,please wait.')
      var nodeFLIF = require('node-flif')
      var qlty = this.Qlt
      var path = document.getElementById('click2open').files[0].path
      var temppath = __static
      var decodeParams = {
        input: path,
        output: temppath + '\\preview.tmp.png',
        overwrite: true,
        decodeQuality: qlty,
        keepMetaData: true,
        keepColorProfile: true
      }
      try {
        nodeFLIF.decode(decodeParams, function (data, error) {
          if (data === 1 && error === 'success') {
            var electron = require('electron')
            Message.success('Decode finished.')
            electron.shell.openItem(temppath + '\\preview.tmp.png')
          } else if (data !== 1 && (error !== 'success' || error !== null)) {
            Message.error('Decode Failed:' + error)
          }
        })
      } catch (err) {
        Message.error('Decode Failed:' + err.message)
      }
    }
  }
}
</script>

<style>
.ulf {
  border: 1px solid #eee;
  height: 30vh;
}
.ulf p {
  margin: 8% 0 0 0;
}
</style>