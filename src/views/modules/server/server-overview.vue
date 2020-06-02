<template>
  <div class="server-overview">
    <div class="my-column">
      <div class="title">{{$t( '概览' )}}</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <div class="top-title">{{$t( '实例' )}}</div>
            <ul class="flex">
              <li>
                <div class="name">{{$t( '总数量' )}}</div>
                <div class="detail blue">1</div>
              </li>
              <li>
                <div class="name">{{$t( '运行中' )}}</div>
                <div class="detail green">1</div>
              </li>
              <li class="link">
                <div class="name">{{$t( '即将过期' )}}</div>
                <div class="detail red">1</div>
              </li>
              <li class="link">
                <div class="name">{{$t( '已过期' )}}</div>
                <div class="detail red">1</div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <div class="top-title">{{$t( '快照' )}}</div>
            <ul class="flex">
              <li>
                <div class="name">{{$t( '快照' )}}</div>
                <div class="detail blue">0</div>
              </li>
              <li>
                <div class="name">{{$t( '总数量' )}}</div>
                <div class="detail blue">0</div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="my-column">
      <div class="title">{{$t( '云安全中心' )}}</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <div class="top-title">{{$t( '安全预防' )}} </div>
            <ul class="flex">
              <li>
                <div class="name">{{$t( '待处理漏洞' )}}</div>
                <div class="detail blue">1</div>
              </li>
              <li>
                <div class="name">{{$t( '基线检查' )}}</div>
                <div class="detail blue">1</div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <div class="top-title">{{$t( '入侵检测' )}}</div>
            <ul class="flex">
              <li>
                <div class="name">{{$t( '异常登录' )}}</div>
                <div class="detail blue">0</div>
              </li>
              <li>
                <div class="name">{{$t( '网站后门' )}}</div>
                <div class="detail blue">0</div>
              </li>
              <li>
                <div class="name">{{$t( '主机异常' )}}</div>
                <div class="detail blue">0</div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="my-column my-column1">
      <div class="title">{{$t( '我的资源' )}}</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <div class="top-title top-title1">中国（香港） </div>
            <ul class="flex">
              <li class="dashed">
                <div class="detail1">{{$t( '云服务器' )}}<span class="detail blue number">1</span></div>
              </li>
              <li>
                <div class="content-detail content-detail1">
                  <div class="item"><div class="icon"></div><div class="to-way">{{$t( '运行中' )}}<span class="span green">1</span></div></div>
                  <div class="item"><div class="icon icon1"></div><div class="to-way">{{$t( '近期创建' )}}<span class="span">0</span></div></div>
                  <div class="item"><div class="icon icon2"></div><div class="to-way">{{$t( '即将过期' )}}<span class="span red">0</span></div></div>
                  <div class="item"><div class="icon icon2"></div><div class="to-way">{{$t( '已过期' )}}<span class="span red">0</span></div></div>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {},
    methods: {}
  }
</script>

<style lang="scss" >
	.server-overview {
    .my-column{margin-bottom: 16px;}
    .title{padding-bottom: 8px;}
    .link{color:#06C;cursor: pointer;
    &:hover{text-decoration: underline;}}
    .grid-content{border: 1px solid #dddddd;}
    .top-title {
        background: #f9f9f9;
        height: 36px;font-size: 12px;
        line-height: 36px;text-align: center;border-bottom: 1px solid #dddddd;
    }
    .top-title1{text-align: left;padding: 0 8px;}
    .flex {
        display: flex;
        text-align: center;
        li {
            margin: 5px 0;padding: 5px 0;
            flex: 1;
            border-right: 1px solid #dddddd;
            &:last-child {
                border-right: none;
            }
        }
        .name{line-height: 30px;}
        .detail{font-size: 30px;}
        .blue{color:#0070CC}
        .green{color: #1E8E3E;}
        .red{color: #D93026;}
        .my-column1{
        }
        
        .detail1{
            height: 110px;
            display: flex;align-items: center;
            padding:0 18px;
            cursor: pointer;
            
        }
        .dashed{border-right:1px dashed #ddd;}
        .number{margin-left: 18px;}
        .img{width: 19px;height: 99px;}
    }
    .icon{display: inline-block;vertical-align: top;background: url(/static/img/server.jpg);width: 15px;height: 16px;}
    .icon1{background-position: 0 -27px;}
    .icon2{background-position: 0 -54px;}
    .content-detail1{text-align: left;padding: 0 16px;}
    .to-way{display: inline-block;vertical-align: top;margin-left: 16px;margin-bottom: 12px;
    .span{margin-left: 8px;}
    }
}
</style>