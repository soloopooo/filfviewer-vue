<template>
  <div id="wrapper">
    <main>
      <el-container class="mainwin" style="border:solid 1px #eee">
        <el-aside style="border:solid 3px #eee">
          <el-menu>
            <el-submenu index="convert">
              <template slot="title"><i class="el-icon-magic-stick"></i>Convert?</template>
              <el-menu-item-group>
            <el-menu-item @click="png2flifb">Convert png to flif</el-menu-item>
            <el-menu-item @click="flif2pngb">Convert flif to png</el-menu-item>
            </el-menu-item-group>
            </el-submenu>
             <el-submenu index="open">
              <template slot="title"><i class="el-icon-folder-opened"></i>Open?</template>
              <el-menu-item-group>
            <el-menu-item @click="openfileb">Open flif</el-menu-item>
            </el-menu-item-group>
            </el-submenu>
            <el-menu-item @click="drawer = true"><i class="el-icon-user-solid"></i>About Me</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main style="border:solid 3px #eee">
          <div id="full" v-if="main"><h1 style="text-align:center;color:#33cc55">Welcome to flifviewer!</h1>
          <br />
          <h3 style="text-align:center;">Please choose an item from left to get started.</h3>
          </div>
          <png2flif id="full" v-if="png2flif"></png2flif>
          <flif2png id="full" v-if="flif2png"></flif2png>
          <openfile id="full" v-if="openfile"></openfile>
           <full><h5 style="text-align:center;bottom:10px;color:grey;position:absolute;">flifviewer -- an open source unofficial flif image viewer and converter.</h5></full>
        </el-main>
      </el-container>
      <el-drawer
        title="About Me"
        :visible.sync="drawer"
        :with-header="false">
        <div id="middle">
        <div><h1>soloopooo</h1></div>
        <p></p>
        <h3>Writing codes,no ends.</h3>
        <p>Contact Me:</p>
          <el-button @click="em"><i class="el-icon-chat-line-square"></i>Email</el-button>
          <el-button @click="jq"><i class="el-icon-chat-line-square"></i>QQ Group</el-button>
        <el-button  id="webbutton" @click="oD">Click me to view my website.</el-button>
        <div style="color:red;font-size:22px;">Special Thanks to:
        <p>xszq</p><el-button @click="xszq" type="danger">Website</el-button>
        <p>xingsen</p><el-button @click="xingsen" type="danger">Website</el-button>
        </div>
        <p>This Project uses eletment-ui to build GUI.</p>
        </div>
      </el-drawer>
    </main>
  </div>
</template>

<script>
  import png2flif from './pages/p2f.vue'
  import flif2png from './pages/f2p.vue'
  import openfile from './pages/open.vue'
  export default {
    name: 'landing-page',
    components: { png2flif, flif2png, openfile },
    methods: {
      oD () {
        this.$message({
          message: 'Your browser will lead you to my website.',
          type: 'success',
          center: 'true'
        })
        this.$electron.shell.openExternal('https://soloop.ooo')
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      png2flifb: function () {
        this.png2flif = true
        this.flif2png = false
        this.openfile = false
        this.main = false
      },
      flif2pngb: function () {
        this.flif2png = true
        this.png2flif = false
        this.openfile = false
        this.main = false
      },
      openfileb: function () {
        this.openfile = true
        this.flif2png = false
        this.png2flif = false
        this.main = false
      },
      gohelp () {
      },
      jq () {
        this.$electron.shell.openExternal('https://jq.qq.com/?_wv=1027&k=53R0rYu')
      },
      em () {
        this.$electron.shell.openExternal('mailto://soloopooo@foxmail.com')
      },
      xszq () {
        this.$electron.shell.openExternal('https://xszq.tk')
      },
      xingsen () {
        this.$electron.shell.openExternal('https://xingsenblog.cn')
      }
    },
    data () {
      return {
        drawer: false,
        png2flif: false,
        flif2png: false,
        openfile: false,
        main: true
      }
    }
  }
</script>

<style>
  @import url('~@/assets/css/googlesans.css');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Google Sans', 微软雅黑,sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    padding: 0 0;
    width: 100vw;
    height: calc(100vh - 35px);
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  .left-side {
    display: flex;
    padding: 52px 12% 20px 23px;
    flex-direction: column;
  }

  .mainwin {
    display: flex;
    padding: 5% 12px 12px 2%;
    right: 5%;
    height: calc(100vh - 35px);
  }
  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
  #about {
    padding-left: 15px;
  }
  #middle {
    text-align: center;
  }
  full {
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    flex-direction: column;
    overflow: auto;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
