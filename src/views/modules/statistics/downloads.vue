<template>
  <div class="mod-user">
    <div class="statics-echarts">
        <ul class="ul">
          <li @click="switchChoice(1)" :class="{active:choice===1}">Android</li>
          <li @click="switchChoice(2)" :class="{active:choice!==1}">IOS</li>
        </ul>
      <div v-show="choice===1">
        <div class="title">{{$t( '下载量渠道分布图' )}}</div>
        <div class="p30">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div id="J_chartTotalBox" class="total-box"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="total">
              {{$t( '累计总下载量' )}}：
              <div class="weight">28594486104145</div>
              <div>{{$t( '近30天日均下载量' )}}：<span class="weight">28594654654</span></div>
            </div>

          </el-col>
        </el-row>
        </div>
        <div class="title">{{$t( '下载渠道分布' )}}</div>
        <div class="p30">
        <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
          <!--<el-table-column type="selection" header-align="center" align="center" width="40">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="50" type="index" :index="1" :label="序号">
      </el-table-column>-->
          <el-table-column header-align="center" align="center" :label="$t( '应用市场' )" prop="sex"></el-table-column>
          <el-table-column header-align="center" align="center" :label="$t( '近30天日均下载量' )" prop="birthday"></el-table-column>
          <el-table-column header-align="center" align="center" :label="$t( '累计下载' )" prop="typeOf"></el-table-column>
        </el-table>
        </div>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        <div class="title">{{$t( '下载量趋势' )}}</div>
        <div class="time-choose">
          <span class="total-type">{{$t( '日期' )}}</span>
          <el-button v-for="item,i in timeList" :key="i" :type="timeIndex!==''&&timeIndex==i?'primary':'default'" @click="chooseTime(i)">{{$t( item )}}
            <el-date-picker v-if="i==timeList.length-1" class="picker" v-model="valueNTime" type="datetimerange" :picker-options="pickerOptions" align="right">
            </el-date-picker>
          </el-button>
          <span class="total-type">{{$t( '统计类型' )}}</span>
          <el-button type="primary">{{$t( '每日统计' )}}</el-button>
        </div>
        <div class="chart-line-wrap">
          <div id="J_chartLineBox" class="chart-box"></div>
        </div>
      </div>
         <div class="title">{{$t( '下载量' )}}</div>
      
      <div :style="{display:choice===2?'block':'none'}">
        <div class="chart-line-wrap">
          <div id="J_IOSLineBox" class="chart-box"></div>
        </div>
         <div class="title">{{$t( '下载渠道分布' )}}</div>
        <div class="p30"><el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
          <!--<el-table-column type="selection" header-align="center" align="center" width="40">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="50" type="index" :index="1" :label="序号">
      </el-table-column>-->
          <el-table-column header-align="center" align="center" :label="$t( '应用市场' )" prop="sex"></el-table-column>
          <el-table-column header-align="center" align="center" :label="$t( '近30天日均下载量' )" prop="birthday"></el-table-column>
          <el-table-column header-align="center" align="center" :label="$t( '累计下载' )" prop="typeOf"></el-table-column>
        </el-table></div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        choice:1,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        valueNTime: '',
        timeList: ['近一周', '近一个月', '近三个月', '近一年', '自定义'],
        timeIndex: "",
        options: [{
          value: '选项1',
          label: this.$t('收入')
        }, {
          value: '选项2',
          label: this.$t('支出')
        }],
        value: '',
        value2: "",
        time1: "",
        time2: "",
        showPayMethod: false,
        dataForm: {
          applicationName: '',
          projectAccount: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        chartLine: null,
        chartTotal: null,
        IOSLine: null,
      }
    },
    mounted() {
      this.init()
    },
    activated() {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      this.activeIt()
    },
    methods: {
      activeIt(){
        if(this.chartTotal) {
        this.chartTotal.resize()
      }
      if(this.chartLine) {
        this.chartLine.resize()
      }
      if(this.IOSLine) {
        this.IOSLine.resize()
      }
      },
      init(){
        this.initChartTotal()
      this.initChartLine()
      this.initIOSLine()
      },
      switchChoice(i){
        this.choice=i;
        this.IOSLine=null;
        this.$nextTick(()=>{
          this.init()
          this.activeIt()
        })
        
      },
      // 折线图
      initIOSLine() {
        var option = {
          'tooltip': {
            'trigger': 'axis'
          },
          legend: {
            orient: "vertical",
            left: "center",
            bottom: "bottom",
            data: [this.$t('下载')]
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
              'name': this.$t('下载'),
              'type': 'line',
              'stack': '总量',
              'data': [120, 132, 101, 134, 90, 230, 210],
              symbol: 'circle', //空心圆变实心圆
              itemStyle: {
                normal: {
                  color: '#17b3a3', //改变折线点的颜色
                  lineStyle: {
                    color: '#17b3a3', //改变折线颜色
                  }
                }
              }
            },
            
          ]
        }
        this.IOSLine = echarts.init(document.getElementById('J_IOSLineBox'))
        this.IOSLine.setOption(option)
        window.addEventListener('resize', () => {
          this.IOSLine.resize()
        })
      },
      chooseTime(i) {
        this.timeIndex = i
      },
      initChartTotal() {
        let option = {
          title: {
            text: this.$t('累计下载渠道分布'),
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} <br/>" + this.$t('占比') + ":{d}%({c})"
          },
          legend: {
            left: "center",
            bottom: "bottom",
            data: ['OPPO', 'VIVO', '华为', '小米', '一加']
          },
          series: [{
            name: this.$t('访问来源'),
            type: 'pie',
            radius: ['32%', '70%'],
            data: [{
                value: 335,
                name: 'OPPO'
              }, {
                value: 310,
                name: 'VIVO'
              },
              {
                value: 234,
                name: '华为'
              }, {
                value: 135,
                name: '小米'
              },
              {
                value: 100,
                name: '一加'
              }
            ],

            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function(params) {
                  //自定义颜色
                  var colorList = [
                    '#0074cb', '#00b160', '#ffb02d', '#ff7261', '#54bdff', '#088ee5', '#019e95', '#00138a',
                  ];
                  return colorList[params.dataIndex]
                }
              }
            }
          }]
        };
        this.chartTotal = echarts.init(document.getElementById('J_chartTotalBox'))
        this.chartTotal.setOption(option)
        window.addEventListener('resize', () => {
          this.chartTotal.resize()
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
            data: ['OPPO', 'VIVO', '华为', '小米', '一加']
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
              'name': '一加',
              'type': 'line',
              'stack': '总量',
              'data': [120, 132, 101, 134, 90, 230, 210],
              symbol: 'circle', //空心圆变实心圆
              itemStyle: {
                normal: {
                  color: '#8976ff', //改变折线点的颜色
                  lineStyle: {
                    color: '#8470ff', //改变折线颜色
                  }
                }
              }
            },
            {
              'name': '华为',
              'type': 'line',
              'stack': '总量',
              'data': [220, 182, 191, 234, 290, 330, 310],
              symbol: 'circle', //空心圆变实心圆
              itemStyle: {
                normal: {
                  color: '#bc67f7', //改变折线点的颜色
                  lineStyle: {
                    color: '#bc67f7', //改变折线颜色
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
      // 获取数据列表
      getDataList() {
        return
        this.dataListLoading = true;
        this.bankReceiptVisible = false;
        this.applicationReceiptVisible = false;
        this.$http({
          url: this.$http.adornUrl('/payapplication/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'applicationName': this.dataForm.applicationName,
            'projectAccount': this.dataForm.projectAccount
          })
        }).then(({
          data
        }) => {
          if(data && data.code === 0) {
            var orderCount = data.orderCount;
            var totalCountData = data.totalCount;
            var todayLoginCountData = data.todayLoginCount;
            this.dataList = data.page.list
            for(var i = 0; i < this.dataList.length; i++) {
              var applicationId = this.dataList[i].applicationId;
              var totalCount = totalCountData[applicationId];
              var todayLoginCount = todayLoginCountData[applicationId];
              this.dataList[i].totalCount = totalCount ? totalCount : '0';
              this.dataList[i].todayLoginCount = todayLoginCount ? todayLoginCount : '0';

              var orderData = orderCount[applicationId];
              this.dataList[i].todayRecharge = orderData ? orderData.todayRecharge : '0';
              this.dataList[i].todayWithdraw = orderData ? orderData.todayWithdraw : '0';
            }

            //this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
    }
  }
</script>
<style scoped="scoped">

</style>