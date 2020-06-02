<template>
  <div class="server-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header">{{$t( '前端服务器' )}}</span>
      </div>
      <el-row>
        <el-col v-for="item,i in frontServerList" :key="item.id" :span="8">
          <div class="grid-content" @click="toConsole">
            <div class="status"><span class="name">{{$t( '运行状态' )}}</span><span class="info green" >{{item.status}} <div class="icon"></div><div class="icon icon1"></div></span></div>
            <div class="status"><span class="name">{{$t( '名称' )}}</span><span class="info">第一台非洲主机</span></div>
            <div class="status"><span class="name">{{$t( '类型' )}}</span><span class="info">CentOS</span></div>
            <div class="status"><span class="name">{{$t( 'IP地址' )}}</span><span class="info">255.255.457.123</span></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header">{{$t( '业务服务器' )}}</span>
      </div>
      <el-row>
        <el-col v-for="item,i in list"  :key="item.id"  :span="8">
          <div class="grid-content" @click="toConsole">
            <div class="status"><span class="name">{{$t( '运行状态' )}}</span><span class="info green" >{{item.status}} <div class="icon"></div><div class="icon icon1"></div></span></div>
            <div class="status"><span class="name">{{$t( '名称' )}}</span><span class="info">第一台非洲主机</span></div>
            <div class="status"><span class="name">{{$t( '类型' )}}</span><span class="info">CentOS</span></div>
            <div class="status"><span class="name">{{$t( 'IP地址' )}}</span><span class="info">255.255.457.123</span></div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header">{{$t( '数据库服务器' )}}</span>
      </div>
      <el-row>
        <el-col v-for="item in list" :key="item.id" :span="8">
          <div class="grid-content" @click="toConsole">
            <div class="status"><span class="name">{{$t( '运行状态' )}}</span><span class="info green" >{{item.status}} <div class="icon"></div><div class="icon icon1"></div></span></div>
            <div class="status"><span class="name">{{$t( '名称' )}}</span><span class="info">第一台非洲主机</span></div>
            <div class="status"><span class="name">{{$t( '类型' )}}</span><span class="info">CentOS</span></div>
            <div class="status"><span class="name">{{$t( 'IP地址' )}}</span><span class="info">255.255.457.123</span></div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header">{{$t( '数据库备份服务器' )}}</span>
      </div>
      <el-row>
        <el-col v-for="item in list" :key="item.id" :span="8">
          <div class="grid-content" @click="toConsole">
            <div class="status"><span class="name">{{$t( '运行状态' )}}</span><span class="info green" >{{item.status}} <div class="icon"></div><div class="icon icon1"></div></span></div>
            <div class="status"><span class="name">{{$t( '名称' )}}</span><span class="info">第一台非洲主机</span></div>
            <div class="status"><span class="name">{{$t( '类型' )}}</span><span class="info">CentOS</span></div>
            <div class="status"><span class="name">{{$t( 'IP地址' )}}</span><span class="info">255.255.457.123</span></div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        frontServerList: [{status:this.$t( '运行中' )}, {status:this.$t( '已停止' )}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, ],
        list:[{}]
      }
    },
    mounted() {},
    methods: {
      toConsole(){
        this.$router.push({name:'server-console'})
      }
    }
  }
</script>