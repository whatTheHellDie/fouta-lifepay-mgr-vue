<template>
  <div class="server-console">
    <div class="title clearfix"><img class="img" src="/static/img/cloud.png" />iZj6cdhriqana5cxgh4o4s
      <div class="right">
        <el-button type="info">{{$t( '刷新' )}}</el-button>
        <el-button type="info">{{$t( '停止' )}}</el-button>
        <el-button type="info">{{$t( '重启' )}}</el-button>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="base-info">
            <div class="header">{{$t( '基本信息' )}}</div>
            <div class="name">ID：<span class="detail">i-j6cdhriqana5cxgh4o4s</span></div>
            <div class="name">{{$t( '所在可用区' )}}： <span class="detail">香港可用区 C</span></div>
            <div class="name">{{$t( '名称' )}}： <span class="detail">iZj6cdhriqana5cxgh4o4s...</span></div>
            <div class="name">{{$t( '描述' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '实例规格' )}}： <span class="detail"> ecs.t5-lc1m1.small (性能约束实例)</span></div>
            <div class="name">{{$t( '镜像ID' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '密钥对名称' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( 'RAM角色' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '集群ID' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '标签' )}}： <span class="detail"><el-button type="text">编辑标签</el-button></span></div>

          </div>
          <div class="base-info">
            <div class="header">{{$t( '配置信息' )}}</div>
            <div class="name">CPU：<span class="detail">i-j6cdhriqana5cxgh4o4s</span></div>
            <div class="name">{{$t( '内存' )}}： <span class="detail">香港可用区 C</span></div>
            <div class="name">{{$t( '实例类型' )}}： <span class="detail">iZj6cdhriqana5cxgh4o4s...</span></div>
            <div class="name">{{$t( '操作系统' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '弹性网卡' )}}： <span class="detail"> ecs.t5-lc1m1.small (性能约束实例)</span></div>
            <div class="name">{{$t( '公网IP' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '弹性公网IP' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '私有IP' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '辅助私网IP' )}}： <span class="detail"></span></div>
            <div class="name">{{$t( '带宽计费方式' )}}： <span class="detail"><el-button type="text">编辑标签</el-button></span></div>
            <div class="name">{{$t( '当前使用带宽' )}}： <span class="detail"><el-button type="text">编辑标签</el-button></span></div>
            <div class="name">{{$t( '专有网络' )}}： <span class="detail"><el-button type="text">编辑标签</el-button></span></div>
            <div class="name">{{$t( '虚拟交换机' )}}： <span class="detail"><el-button type="text">编辑标签</el-button></span></div>

          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-row :gutter="8">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="my-status">
                  <el-row>
                    <el-col :span="6">
                      <div class="box">
                        <img src="/static/img/start.png" class="start" alt="" /> {{$t( '运行中' )}}
                      </div>
                    </el-col>
                    <el-col :span="18">
                      <div class="right-wrap">
                        <ul>
                          <li class="left-name">{{$t( '磁盘' )}}：<span class="span blue">1</span></li>
                          <li class="right-name">{{$t( '磁盘' )}}：<span class="span">-</span></li><br />
                          <li class="left-name">{{$t( '快照' )}}：<span class="span blue">0</span></li>
                          <li class="right-name">{{$t( '弹性网卡' )}}：<span class="span blue">eni-j6c70iusb1222mdxanzr</span></li>

                        </ul>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="fee-wrap">
                    <div class="fee">{{$t( '网络类型' )}}：<span class="need">专有网络</span></div>
                    <div class="fee">{{$t( '付费方式' )}}：<span class="need">包年包月</span></div>
                    <div class="fee">{{$t( '到期时间' )}}：<span class="need">2021年10月25日 23:59 到期</span></div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="right-info">
                <div class="li">
                  <img src="/static/img/safe.jpg" alt="" /> {{$t( '安全状态' )}}
                </div>
              </div>
              <div class="right-info">
                <div class="li">
                  <div class="number">0</div>
                  {{$t( '系统事件' )}}
                </div>
              </div>

            </el-col>
            <el-col :span="4">
              <div class="right-info">
                <div class="li green">
                  <img src="/static/img/status.jpg" alt="" /> {{$t( '无异常' )}}
                </div>
              </div>
              <div class="right-info">
                <div class="li">
                  <div class="number">0</div>
                  {{$t( '潜在风险安全组' )}}
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="chart-wrap">
            <div class="chart-title clearfix">{{$t( '监控信息' )}}
              <el-date-picker class="time-picker" v-model="value1" type="datetimerange" range-separator="-" :start-placeholder="$t( '开始日期' )" :end-placeholder="$t( '结束日期' )">
              </el-date-picker>
            </div>
            <div class="chart-line-wrap">
              <div class="title-info">CPU</div>
              <div id="J_chartLineBox" class="chart-box"></div>
            </div>
            <div class="chart-line-wrap">
              <div class="title-info">{{$t( '网络（外网）' )}}</div>
              <div id="J_chartLineBox1" class="chart-box"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        value1: [new Date(), new Date()],
        chartLine: null,
        chartLine1: null,
      }
    },
    mounted() {
      this.initChartLine()
      this.initChartLine1()
    },
    activated() {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if(this.chartLine) {
        this.chartLine.resize()
      }
      if(this.chartLine1) {
        this.chartLine1.resize()
      }
    },
    methods: {
       // 折线图
      initChartLine1() {
        var option = {
          'tooltip': {
            'trigger': 'axis'
          },
          legend: {
            orient: "vertical",
            left: "center",
            bottom: "bottom",
            data: [this.$t( "CPU使用率(%)" ), this.$t( "联盟广告" )]
          },
          'grid': {
            'top': '10%',
            'left': '3%',
            'right': '4%',
            'bottom': '12%',
            'containLabel': true
          },
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': ['09:25:00', '09:25:00', '09:25:00', '09:25:00', '09:25:00', '09:25:00', '09:25:00']
          },
          'yAxis': {
            'type': 'value'
          },
          'series': [{
              'name': 'CPU使用率(%)',
              'type': 'line',
              'stack': '总量',
              'data': [120, 132, 101, 134, 90, 230, 210],
              symbol: 'circle', //空心圆变实心圆
              itemStyle: {
                normal: {
                  color: '#3bc0ff', //改变折线点的颜色
                  lineStyle: {
                    color: '#3bc0ff', //改变折线颜色
                  }
                }
              }
            },
            {
              'name': '联盟广告',
              'type': 'line',
              'stack': '总量',
              'data': [220, 182, 191, 234, 290, 330, 310],
              symbol: 'circle', //空心圆变实心圆
              itemStyle: {
                normal: {
                  color: '#f2ac38', //改变折线点的颜色
                  lineStyle: {
                    color: '#f2ac38', //改变折线颜色
                  }
                }
              }
            },
          ]
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox1'))
        this.chartLine.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      },
      // 折线图
      initChartLine() {
        var option = {
          'tooltip': {
            'trigger': 'axis'
          },
          legend: {
            orient: "vertical",
            left: "center",
            bottom: "bottom",
            data: ["CPU使用率(%)", "联盟广告"]
          },
          'grid': {
            'top': '10%',
            'left': '3%',
            'right': '4%',
            'bottom': '12%',
            'containLabel': true
          },
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': ['09:25:00', '09:25:00', '09:25:00', '09:25:00', '09:25:00', '09:25:00', '09:25:00']
          },
          'yAxis': {
            'type': 'value'
          },
          'series': [{
              'name': 'CPU使用率(%)',
              'type': 'line',
              'stack': '总量',
              'data': [120, 132, 101, 134, 90, 230, 210],
              symbol: 'circle', //空心圆变实心圆
              itemStyle: {
                normal: {
                  color: '#3bc0ff', //改变折线点的颜色
                  lineStyle: {
                    color: '#3bc0ff', //改变折线颜色
                  }
                }
              }
            },
            {
              'name': '联盟广告',
              'type': 'line',
              'stack': '总量',
              'data': [220, 182, 191, 234, 290, 330, 310],
              symbol: 'circle', //空心圆变实心圆
              itemStyle: {
                normal: {
                  color: '#f2ac38', //改变折线点的颜色
                  lineStyle: {
                    color: '#f2ac38', //改变折线颜色
                  }
                }
              }
            },
          ]
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
        this.chartLine.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      },
    }
  }
</script>

<style lang="scss">

</style>