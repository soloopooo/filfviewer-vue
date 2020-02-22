<template>
<div>
    <div style="text-align:center;">
    <h1 style="color:#33cc55">Convert your png images to flifs.</h1>
    <br />
    <h3>Click the button below to continue.</h3>
    <el-table ref="multi" @selection-change="handleSelectionChange" :data="tdata" height="45vh" border style="width: 100%">
    <el-table-column type="selection"></el-table-column>
    <el-table-column prop="name" label="Name"></el-table-column>
    <el-table-column prop="size" label="Size"></el-table-column>
    <el-table-column prop="status" label="State"></el-table-column>
    <el-table-column prop="osize" label="OutSize"></el-table-column>
    </el-table>
    <p>Choose the folder you want to save.<p>
    <el-button @click="thefolder">Choose a folder to save...</el-button>
    <el-input :disabled="true" type="textarea" :rows = "1" autosize id="pathx"></el-input>
    <el-button @click="allfiles">Add file(s)</el-button>
    <el-button :disabled="filearimasenn" @click="clearall" type="danger">Clear all</el-button>
    <el-button @click="deleteo" :disabled="true">Delete Checked(Working)</el-button>
    <p>How many threads do you wanna use?(Working)</p>
    <el-slider v-model="throttles" :disabled="true" :max = "30" :min = "1" :show-input="true" :show-input-controls="false"></el-slider>
    <p>Please set compress level.The bigger value is, the smaller the output file is, and the longer the time uses.</p>
    <el-slider v-model="enq" :show-input="true" :show-input-controls="false"></el-slider>
    <el-button :disabled="filearimasenn" @click="startc" type="success">Start Convert!</el-button>
    <input @change = "fileoepn($event)" type="file" name="filename" id="click3open" accept=".png" multiple="multiple" style="display:none" />
    <input @change = "choosefolder($event)" type="file" name="filename" id="click5open" webkitdirectory multiple style="display:none" />
    </div>
</div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      i: 0,
      j: 0,
      max: 0,
      filearimasenn: true,
      tdata: [],
      multipleSelection: [],
      throttles: 1,
      path: [],
      opath: '',
      enq: 60,
      nowdata: []
    }
  },
  methods: {
    thefolder () {
      document.getElementById('click5open').click()
    },
    choosefolder (e) {
      document.getElementById('pathx').value = e.target.files[0].path
      this.opath = e.target.files[0].path
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    allfiles () {
      document.getElementById('click3open').click()
    },
    fileoepn ($event) {
      this.filearimasenn = false
      var nfile = $event.target.files
      var max = this.max
      max = max + $event.target.files.length
      this.max = max
      var i = this.i
      for (i; i <= max - 1; i++) {
        this.tdata.push({
          name: nfile[i].name,
          size: nfile[i].size,
          status: 'waiting'
        })
        this.path.push({
          path: nfile[i].path
        })
      }
    },
    clearall () {
      this.$confirm('Do you really want to Clear ALL?', 'Warning!', {
        confirmButtonText: 'Yes, Clear ALL!',
        cancelButtonText: 'No, Forget that.',
        type: 'warning'
      }).then(() => {
        this.filearimasenn = true
        this.i = 0
        this.max = 0
        this.tdata = []
        this.$message({
          type: 'success',
          message: 'Your List has been Cleared.'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled.'
        })
      })
    },
    deleteo ($event) {
      var max = this.max
      console.log(this.tdata[0].name)
      var j = this.j
      var i = 0
      var maxx
      j = 0
      maxx = this.multipleSelection.length
      if (this.multipleSelection.length === 0) {
        Message.info('Please Choose Some files!')
        return 0
      } else {
        if (this.tdata === undefined) {
          this.tdata = []
        }
        for (j; j <= max - 1; j++) {
          for (i; i <= maxx - 1; i++) {
            if (this.multipleSelection[i].name === this.tdata[j].name && this.multipleSelection[i].size === this.tdata[j].size) {
              delete (this.tdata[j])
              delete (this.multipleSelection[i])
            }
          }
        }
      }
    },
    startc () {
      var fs = require('fs')
      var nodeFLIF = require('node-flif')
      var maxab = this.max
      var path = this.path
      var opath = this.opath
      this.nowdata = this.tdata
      var tdata = this.tdata
      var thr = 0
      var c = 0
      var b = 0
      var enq = this.enq
      if (this.opath === '') {
        Message.warning('Please Choose the save folder!')
      } else {
        function cdecode(idta) {//判断线程数
          if (idta <= 3) {
            c++
            idta++
            callback(idta, c)
          } else {
            callback(idta)
          }
        }
        cdecode(thr2, function (thr, c) {//解码主函数
          var fs = require('fs')
          var encodeParams0 = {
              input: path[c].path,
              output: opath + '\\' + tdata[c].name.substring(0, tdata[c].name.indexOf('.')) + '.flif',
              effort: enq,
              overwrite: true,
              encodeQuality: 100,
              keepMetaData: true,
              keepColorProfile: true
            }
            console.log('Start Encode.')
            tdata[c].status = 'converting'
            nodeFLIF.encode(encodeParams0, function (data, error) {
              if (data === 1 && error === 'success') {
                b++
                thr--
                console.log(thr)
                var osize
                console.log('Encode finished.')
                Message.success({message: 'Encode finished:' + b + '/' + maxab, duration: '1000'})
                tdata[c].status = 'success'
                fs.stat(opath + tdata[c].name.substring(0, tdata[c].name.indexOf('.')) + '.filf', function (stats) {
                  osize = stats.size
                })
                tdata[c].osize = osize
                console.log(osize)
              } else if (data !== 1 && (error !== 'success' || error !== null)) {
                Message.error('Decode Failed:' + error)
                tdata[c].status = 'failed'
                thr--
              }
            }) 
          })
      /*  while (b < maxab) {
          if (c >= maxab || thr >= 3) {
            continue
          } else if (b >= maxab) {
            break
          } else {
            var encodeParams0 = {
              input: path[c].path,
              output: opath + '\\' + tdata[c].name. + '.flif',
              effort: enq,
              overwrite: true,
              encodeQuality: 100,
              keepMetaData: true,
              keepColorProfile: true
            }
            console.log('Start Encode.')
            tdata[c].status = 'converting'
            nodeFLIF.encode(encodeParams0, function (data, error) {
              if (data === 1 && error === 'success') {
                b++
                thr--
                console.log(thr)
                var osize
                console.log('Encode finished.')
                Message.success({message: 'Encode finished:' + b + '/' + maxab, duration: '1000'})
                tdata[c].status = 'success'
                fs.stat(opath + tdata[c].name + '.filf', function (stats) {
                  osize = stats.size
                })
                tdata[c].osize = osize
                console.log(osize)
              } else if (data !== 1 && (error !== 'success' || error !== null)) {
                Message.error('Decode Failed:' + error)
                tdata[c].status = 'failed'
                thr--
              }
            }) 
            c++
            thr++
          }*/
        }
      }
    }
  }
}
</script>

<style>
.f2pu {
  border: 1px solid #eee;
  height: 30vh;
}
.f2pu p {
  margin: 8% 0 0 0;
}
</style>