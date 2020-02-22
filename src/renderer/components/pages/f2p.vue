<template>
<div>
    <div style="text-align:center;">
    <h1 style="color:#33cc55">Convert your flif images to pngs.</h1>
    <br />
    <h3>Click the button below to continue.</h3>
    <el-table ref="multi" @selection-change="handleSelectionChange" :data="tdata" height="45vh" border style="width: 100%">
    <el-table-column type="selection"></el-table-column>
    <el-table-column prop="name" label="Name"></el-table-column>
    <el-table-column prop="size" label="Size"></el-table-column>
    <el-table-column prop="status" label="State"></el-table-column>
    </el-table>
    <p>Choose the folder you want to save.<p>
    <el-button @click="thefolder">Choose a folder to save...</el-button>
    <el-input :disabled="true" type="textarea" :rows = "1" autosize id="pathx"></el-input>
    <el-button @click="allfiles">Add file(s)</el-button>
    <el-button :disabled="filearimasenn" @click="clearall" type="danger">Clear all</el-button>
    <el-button @click="deleteo" :disabled="true">Delete Checked(Working)</el-button>
    <p>How many threads do you wanna use?(Working)</p>
    <el-slider v-model="throttles" :disabled="true" :max = "30" :min = "1" :show-input="true" :show-input-controls="false"></el-slider>
    <el-button :disabled="filearimasenn" @click="startc" type="success">Start Convert!</el-button>
    <input @change = "fileoepn($event)" type="file" name="filename" id="click3open" accept=".flif" multiple="multiple" style="display:none" />
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
      opath: ''
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
      var nodeFLIF = require('node-flif')
      var max = this.max
      /* var thr = this.throttles */
      var path = this.path
      var opath = this.opath
      var tdata = this.tdata
      if (this.opath === '') {
        Message.warning('Please Choose the save folder!')
      } else {
        for (let i = 0; i < max; i++) {
          var b = 0
          var decodeParams0 = {
            input: path[i].path,
            output: opath + tdata[i] + '.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          console.log(decodeParams0.input)
          nodeFLIF.decode(decodeParams0, function (data, error) {
            if (data === 1 && error === 'success') {
              b++
              console.log('Decode finished.')
              Message.success({message: 'Decode finished:' + b + '/' + max, duration: '1000'})
              tdata[i].status = 'success'
            } else if (data !== 1 && (error !== 'success' || error !== null)) {
              Message.error('Decode Failed:' + error)
            }
          })
        }
      }
      /* for (i; i < max; i += thr) {
        var path = this.path
        var tdata = this.tdata
        if (max - i >= 1) {
          if (thr >= 1) {
            var decodeParams0 = {
              input: path[i].path,
              output: 'D:\\preview.tmp.png',
              overwrite: true,
              decodeQuality: 100,
              keepMetaData: true,
              keepColorProfile: true
            }
            console.log(decodeParams0.input)
            nodeFLIF.decode(decodeParams0, function (data) {
              console.log('Decode finished.')
              Message.success({message: 'Decode finished:' + i + '/' + max, duration: '1000'})
              tdata[i].status = 'success'
            })
          }
        } */
      /*  if (thr <= 2 && max - i >= 2) {
          var decodeParams1 = {
            input: '\'' + path[i + 1].path + '\'',
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams1, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + (i + 2) + '/' + max, duration: '500'})
            tdata[i + 1].status = 'success'
          })
        }
        if (thr <= 3 && max - i >= 3) {
          var decodeParams2 = {
            input: '\'' + path[i + 2] + '\'',
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams2, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + (i + 3) + '/' + max, duration: '500'})
            tdata[i + 2].status = 'success'
          })
        }
        if (thr <= 4) {
          var decodeParams3 = {
            input: '\'' + path[i + 3] + '\'',
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams3, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + (i + 4) + '/' + max, duration: '500'})
            tdata[i + 3].status = 'success'
          })
        }
        if (thr <= 5) {
          var decodeParams4 = {
            input: path[i + 4],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams4, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + (i + 4) + '/' + max, duration: '500'})
            tdata[i + 4].status = 'success'
          })
        }
        if (thr <= 6) {
          var decodeParams5 = {
            input: path[i + 5],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams5, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + (i + 5) + '/' + max, duration: '500'})
            tdata[i + 5].status = 'success'
          })
        }
        if (thr <= 7) {
          var decodeParams6 = {
            input: path[i + 6],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams6, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + (i + 6) + '/' + max, duration: '500'})
            tdata[i + 6].status = 'success'
          })
        }
        if (thr <= 8) {
          var decodeParams7 = {
            input: path[i + 7],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams7, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 7].status = 'success'
          })
        }
        if (thr <= 9) {
          var decodeParams8 = {
            input: path[i + 8],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams8, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 8].status = 'success'
          })
        }
        if (thr <= 10) {
          var decodeParams9 = {
            input: path[i + 9],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams9, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 9].status = 'success'
          })
        }
        if (thr <= 11) {
          var decodeParams10 = {
            input: path[i + 10],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams10, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 10].status = 'success'
          })
        }
        if (thr <= 12) {
          var decodeParams11 = {
            input: path[i + 11],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams11, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 11].status = 'success'
          })
        }
        if (thr <= 13) {
          var decodeParams12 = {
            input: path[i + 12],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams12, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 12].status = 'success'
          })
        }
        if (thr <= 14) {
          var decodeParams13 = {
            input: path[i + 13],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams13, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 13].status = 'success'
          })
        }
        if (thr <= 15) {
          var decodeParams14 = {
            input: path[i + 14],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams14, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 14].status = 'success'
          })
        }
        if (thr <= 16) {
          var decodeParams15 = {
            input: path[i + 15],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams15, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 15].status = 'success'
          })
        }
        if (thr <= 17) {
          var decodeParams16 = {
            input: path[i + 16],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams16, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 16].status = 'success'
          })
        }
        if (thr <= 18) {
          var decodeParams17 = {
            input: path[i + 17],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams17, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 17].status = 'success'
          })
        }
        if (thr <= 19) {
          var decodeParams18 = {
            input: path[i + 18],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams18, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 18].status = 'success'
          })
        }
        if (thr <= 20) {
          var decodeParams19 = {
            input: path[i + 19],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams19, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 19].status = 'success'
          })
        }
        if (thr <= 21) {
          var decodeParams20 = {
            input: path[i + 20],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams20, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 20].status = 'success'
          })
        }
        if (thr <= 22) {
          var decodeParams21 = {
            input: path[i + 21],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams21, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 21].status = 'success'
          })
        }
        if (thr <= 23) {
          var decodeParams22 = {
            input: path[i + 22],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams22, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 22].status = 'success'
          })
        }
        if (thr <= 24) {
          var decodeParams23 = {
            input: path[i + 23],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams23, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 23].status = 'success'
          })
        }
        if (thr <= 25) {
          var decodeParams24 = {
            input: path[i + 24],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams24, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 24].status = 'success'
          })
        }
        if (thr <= 26) {
          var decodeParams25 = {
            input: path[i + 25],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams25, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 25].status = 'success'
          })
        }
        if (thr <= 27) {
          var decodeParams26 = {
            input: path[i + 26],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams26, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 26].status = 'success'
          })
        }
        if (thr <= 28) {
          var decodeParams27 = {
            input: path[i + 27],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams27, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 27].status = 'success'
          })
        }
        if (thr <= 29) {
          var decodeParams28 = {
            input: path[i + 28],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams28, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 28].status = 'success'
          })
        }
        if (thr <= 30) {
          var decodeParams29 = {
            input: path[i + 29],
            output: '\\preview.tmp.png',
            overwrite: true,
            decodeQuality: 100,
            keepMetaData: true,
            keepColorProfile: true
          }
          nodeFLIF.decode(decodeParams29, function (data) {
            console.log('Decode finished.')
            Message.success({message: 'Decode finished:' + i + '/' + max, duration: '500'})
            tdata[i + 29].status = 'success'
          })
        } */
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