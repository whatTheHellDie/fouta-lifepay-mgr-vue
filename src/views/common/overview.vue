<template>
  <div class="mod-user" style="background: #11123a;">
    <div class="statics-echarts">
      <div class="ul-wrap">
        <ul class="ul clearfix">
          <li class="time-choose" style="width: 575px;">
            <el-button v-for="item,i in timeList" :key="i" class="active" :class="{active:timeIndex===i}" @click="chooseTime(i)">{{$t( item )}}
              <!--<el-date-picker v-if="i==timeList.length-1" class="picker" v-model="valueNTime" type="datetimerange" :picker-options="pickerOptions" align="right">
          </el-date-picker>-->
            </el-button>

          </li>
          <li>
            <div class="top-bg"><img src="/static/img/overview/top-bg.png" alt="" class="img" /><img src="/static/img/overview/name-en.png" alt="" class="text" /></div>
          </li>
          <li class="time-choose">
            <el-button class="btn" @click="$router.push({name:'login'})" style="font-size: 14px;">Lifepay-Africa</el-button>
          </li>
          <li class="time-choose">
            <el-button class="btn" @click="toServer">Sever</el-button>
          </li>
        </ul>
      </div>
      <div class="big-bg">
        <div class="chart-item">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="app-title title-left">{{$t( "实时交易汇总" )}}
                  <div class="time-choose time-choose1" style="margin-right: 83px;">
                    <el-button @click="chooseTime(i)" class="active">{{$t( "24h" )}}</el-button>
                    <el-button @click="chooseTime(i)">{{$t( "Android" )}} </el-button>

                  </div>
                </div>

                <div id="J_progressTotalBox" class="total-box" style="min-height: 340px;margin: -40px 0;"></div>
                <div id="J_biTotalBox" class="total-box" style="min-height: 275px;    margin: -59px 0 136px;"></div>

              </div>
            </el-col>
            <el-col :span="8">
              <div id="incomeTotal" class="total-box" style="min-height: 540px;margin-top: 40px;"></div>
            </el-col>
            <el-col :span="8">
              <div class="app-title title-right">{{$t( "交易峰值" )}}
                <div class="time-choose time-choose1" style="margin-right: 83px;">
                  <el-button @click="chooseTime(i)" class="active">{{$t( "24h" )}} </el-button>
                  <el-button @click="chooseTime(i)">{{$t( "Android" )}} </el-button>
                </div>
              </div>

              <div id="expandTotal" class="total-box" style="min-height: 520px;margin-top: 50px;"></div>

            </el-col>
          </el-row>
        </div>
        <div class="chart-item" style="position: absolute;top: 621px;left: 0px;padding: 0px 47px;width: 100%;height: 346px;overflow: hidden;">
          <el-row>

            <el-col :span="12">
              <div class="app-title title-left" style="width: 860px;">{{$t( "支付场景" )}}
                <div class="time-choose time-choose1" style="margin-right: 83px;">
                  <el-button @click="chooseTime(i)" class="active">{{$t( "24h" )}} </el-button>
                  <el-button @click="chooseTime(i)">{{$t( "Android" )}} </el-button>
                </div>
              </div>
              <el-row>
                <el-col :span="12">
                  <div id="J_chartLineBox" class="chart-box" style="min-height: 300px;"></div>
                </el-col>
                <el-col :span="12">
                  <div id="J_chartLineBox2" class="chart-box" style="min-height: 300px;"></div>
                </el-col>
              </el-row>

              <div class="chart-line-wrap">

              </div>
            </el-col>
            <el-col :span="12">
              <div class="clearfix">
                <div class="app-title title-right" style="width: 860px;">{{$t( "下载量" )}}
                  <div class="time-choose time-choose1" style="margin-right: 83px;">
                    <el-button @click="chooseTime(i)" class="active">{{$t( "24h" )}} </el-button>
                    <el-button @click="chooseTime(i)">{{$t( "Android" )}} </el-button>
                  </div>
                </div>
              </div>
              <div id="J_chartTotalBox" class="total-box" style="min-height: 300px;"></div>
            </el-col>
            <el-col style="display: none;" :span="8">

              <el-table :data="dataList" :row-class-name="tableRowClassName" height="260" v-loading="dataListLoading" style="width: 100%;">
                <!--<el-table-column type="selection" header-align="center" align="center" width="40">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="50" type="index" :index="1" :label="序号">
      </el-table-column>-->
                <el-table-column header-align="center" align="center" :label="$t( '场景名称' )" prop="name"></el-table-column>
                <!--<el-table-column header-align="center" align="center" :label="$t( '平台' )" prop="birthday"></el-table-column>-->
                <el-table-column header-align="center" align="center" :label="$t( '累计' )" prop="total"></el-table-column>
                <el-table-column header-align="center" align="center" :label="$t( '今日(新建/活跃用户)' )" prop="add">
                </el-table-column>
                <el-table-column header-align="center" align="center" :label="$t( '昨日(新建/活跃用户)' )" prop="lastAdd">
                </el-table-column>
              </el-table>
              <!--<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>-->
            </el-col>
          </el-row>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
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
        timeList: ['总览'],
        timeIndex: "",
        options: [{
          value: '选项1',
          label: this.$t('24h')
        }, {
          value: '选项2',
          label: this.$t('一周')
        }, {
          value: '选项2',
          label: this.$t('一个月')
        }, {
          value: '选项2',
          label: this.$t('一年')
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
        dataList: [{
            name: this.$t("公交"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("手机充值"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("燃气"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("水费"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("电费"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("网费"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("火车费"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("客车费"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("飞机费"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("餐饮"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("旅游景点"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
          {
            name: this.$t("酒店"),
            total: "69952",
            add: 83,
            lastAdd: 91
          },
        ],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        chartLine: null,
        chartLine2: null,
        chartTotal: null,
        IOSLine: null,
        incomeTotal: null,
        expandTotal: null,
        progressTotal: null,
        biTotal: null
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
      setVal(val){
        var valLength=parseInt(val).toString().split('').length
        if(valLength>=4&&valLength<7){
          return (val/1000).toFixed(1)+'k'
        }else if(valLength>=7&&valLength<10){
          return (val/1000000).toFixed(1)+'m'
        }else if(valLength>=10){
          return (val/1000000000).toFixed(1)+'b'
        }else{
          return val
        }
      },
      toServer() {
        window.open("https://fortcloud.safedog.cn/passport/login.html ", "_blank")
      },
      tableRowClassName({
        row,
        rowIndex
      }) {
        if(rowIndex % 2 === 0) {
          return 'light-row';
        }
        return '';
      },
      activeIt() {
        if(this.biTotal) {
          this.biTotal.resize()
        }
        if(this.progressTotal) {
          this.progressTotal.resize()
        }
        if(this.expandTotal) {
          this.expandTotal.resize()
        }
        if(this.incomeTotal) {
          this.incomeTotal.resize()
        }
        if(this.chartTotal) {
          this.chartTotal.resize()
        }
        if(this.chartLine2) {
          this.chartLine2.resize()
        }
        if(this.chartLine) {
          this.chartLine.resize()
        }
        if(this.IOSLine) {
          this.IOSLine.resize()
        }
      },
      init() {
        setTimeout(() => {
          this.initBiTotal()
          this.initProgressTotal()
          this.initExpandTotal()
          this.initIncomeTotal()

          this.initChartTotal()
          this.initChartLine2()
          this.initChartLine()
          //      this.initIOSLine()
        }, 1000)
      },
      switchChoice(i) {
        this.$nextTick(() => {
          this.init()
          this.activeIt()
        })

      },

      // 折线图
      initIOSLine() {
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            show: false,
            x: 'left',
            data: ['视频广告', '百度', '谷歌', '必应', '其他']
          },
          series: [

            {
               avoidLabelOverlap: true,
              name: '访问来源',
              type: 'pie',
              radius: ['30%', '55%'],
              labelLine: {
                normal: {
                  length: 20,
                  length2: 70,
                  lineStyle: {
                    color: '#333'
                  }
                }

              },
              label: {
                normal: {
                  formatter: '{b|{b}}{a|{d}%}\n\n',
                  borderWidth: 20,
                  borderRadius: 4,
                  padding: [0, -70],
                  rich: {
                    a: {
                      color: '#333',
                      fontSize: 12,
                      lineHeight: 20
                    },
                    b: {
                      fontSize: 12,
                      lineHeight: 20,
                      color: '#333'
                    }
                  }
                }
              },
              data: [{
                value: 135,
                name: '视频广告'
              }, {
                value: 1048,
                name: '百度'
              }, {
                value: 251,
                name: '谷歌'
              }, {
                value: 147,
                name: '必应'
              }, {
                value: 102,
                name: '其他'
              }]
            }
          ]

        };
        this.IOSLine = echarts.init(document.getElementById('J_IOSLineBox'))
        this.IOSLine.setOption(option)
        window.addEventListener('resize', () => {
          this.IOSLine.resize()
        })
      },
      chooseTime(i) {
        this.timeIndex = i
      },
      initBiTotal() {

        var datas = [{
            value: 2154,
            name: this.$t('已完成')
          }, {
            value: 1000,
            name: this.$t('进行中')
          },
          {
            value: 3000,
            name: this.$t('已取消')
          }, {
            value: 2000,
            name: this.$t('退款中')
          },
          {
            value: 100,
            name: this.$t('已退款')
          }
        ];
        var total = 0; //考生总数量
                  datas.forEach(function(value, index, array) {
                    total += value.value;
                  });
        var rich = {
          yellow: {
            color: "#ffc72b",
            fontSize: 16 ,
            padding: [5, 4],
            align: 'center'
          },
          total: {
            color: "#ffc72b",
            fontSize: 16 ,
            align: 'center',
          },
          white: {
            color: "#fff",
            align: 'center',
            fontSize: 14 ,
          },
          blue: {
            color: '#49dff0',
            fontSize: 12,
            align: 'center',
            padding: [5, 0]
            
          },
          hr: {
            borderColor: '#0b5263',
            width: '100%',
            borderWidth: 1,
            height: 0,
          }
        };

        var option = {
          grid: {
            left: '50%',
            top: "80%",
            containLabel: true
          },
          series: [{
            name: '在线数量',
            type: 'pie',
            radius: ['32%', '60%'],
            hoverAnimation: true,
            color: ['#0cb3ff', '#ff5050', '#3f98fd', '#ffff02', '#fd9d73'],
            label: {
              normal: {
                textStyle: {
                  fontSize: 12 
                },
                formatter: (params, ticket, callback)=> {
                  
                  var percent = 0; //考生占比
                  percent = ((params.value / total) * 100).toFixed(1);
                  return '{white|' + params.name + '}{yellow|' + this.setVal(params.value) + '}{blue|(' + percent + '%)}';
                },
                rich: rich
              },
            },
            labelLine: {
              normal: {
                length: 30 ,
                length2: 20,
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            data: datas
          }]
        };
        this.biTotal = echarts.init(document.getElementById('J_biTotalBox'))
        this.biTotal.setOption(option)
        window.addEventListener('resize', () => {
          this.biTotal.resize()
        })
        setInterval(()=>{
        total=0;
        datas[0].value=datas[0].value+parseInt(Math.random()*100);
        datas[1].value=datas[1].value+parseInt(Math.random()*10);
        datas[2].value=datas[2].value+parseInt(Math.random()*2);
        datas[3].value=datas[3].value+parseInt(Math.random()*5);
        datas[4].value=datas[4].value+parseInt(Math.random()*2);
        datas.forEach((item,i)=>{
          total+=Number(datas[i].value)
        })
         option.series[0].labelLine.data=datas
        this.biTotal.setOption(option,{
    notMerge: true,
    lazyUpdate: true,
    silent: true
})
        },2000)
        
      },
      initProgressTotal() {
        
        var valdata = [1000, 200, 1, 1, 1]
        var total=0;
        valdata.forEach((item)=>{
          total+=Number(item)
        })
        var data = [45, 5, 20, 10, 20]
        valdata.forEach((item,i)=>{
          data[i]=((item/total)*100).toFixed(1)
        })
        var titlename = [this.$t('已完成'), this.$t('进行中'), this.$t('已取消'), this.$t('退款中'), this.$t('已退款')];
        var myColor = ['#0096ff', '#0096ff', '#0096ff', '#0096ff', '#0096ff'];
        var option = {
          grid:{left:"13%"},
          xAxis: {
            show: false
          },
          yAxis: [{
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#a1d8ff',
              formatter: function(value, index) {
                return [
                  // '{lg|' + (index + 1) + '}' +
                  '{title|' + value + '} '
                ].join('\n')
              },
              rich: {
                lg: {
                  backgroundColor: '#339911',
                  color: '#a1d8ff',
                  //borderRadius: 15,
                  // padding: 5,
                  align: 'center',
                  width: 15,
                  height: 15
                },
              }
            },

          }, {
            show: false,
            inverse: true,
            data: valdata,
            axisLabel: {
              textStyle: {
                fontSize: 16,
                color: '#a1d8ff',
              },
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },

          }],
          series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: data,
            barWidth: 18,
            itemStyle: {
              normal: {
                //barBorderRadius: 30,
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num]
                },
              }
            },
            label: {
              normal: {
                show: true,
                position: ["90%", -20],
                formatter:(params)=> {
                  var num = valdata.length;
                  return '{white|' + this.setVal(valdata[params.dataIndex % num]) + '}' + " (" + params.data + "%)"
                },
                rich: {
                  white: {
                    color: '#fff',
                    fontSize: 16,
                    //borderRadius: 15,
                    // padding: 5,
                  },
                }
              }
            },
          },{
            name: '框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [100, 100, 100, 100, 100],
            barWidth: 24,
            animation:false,
            itemStyle: {
              normal: {
                color: 'none',
                borderColor: '#00c1de',
                borderWidth: 1,
                //barBorderRadius: 15,
              }
            }
          }, ]
        };
        this.progressTotal = echarts.init(document.getElementById('J_progressTotalBox'))
        this.progressTotal.setOption(option)
        window.addEventListener('resize', () => {
          this.progressTotal.resize()
        })
        setInterval(()=>{
        var total=0;
        valdata[0]=valdata[0]+parseInt(Math.random()*100);
        valdata[1]=valdata[1]+parseInt(Math.random()*10);
        valdata[2]=valdata[2]+parseInt(Math.random()*2);
        valdata[3]=valdata[3]+parseInt(Math.random()*5);
        valdata[4]=valdata[4]+parseInt(Math.random()*2);
        valdata.forEach((item,i)=>{
          total+=Number(valdata[i])
        })
        var data = []
        valdata.forEach((item,i)=>{
          data[i]=((item/total)*100).toFixed(1)
        })
        option.yAxis[1].data=valdata;
         option.series[0].data=data
        
//       option.series[0].label.normal.formatter=(params)=> {
//                var num = valdata.length;
//                return '{white|' + valdata[params.dataIndex % num] + '}' + " (" + params.data + "%)"
//              }
        this.progressTotal.setOption(option,{
    notMerge: true,
    lazyUpdate: true,
    silent: true
})
        },2000)
      },
      initExpandTotal() {
        var androidData=[3214, 3435, 3980, 3572, 3820, 3630, 3421,3285, 3468, 3911, 3515, 3824, 3618, 3434,2148, 3435, 3980, 3572, 3820, 3630, 3421,3911, 3515, 1000]
            var iosData=[3285, 3468, 3911, 3515, 3824, 3618, 4364,2148, 3435, 3980, 3572, 3820, 3630, 3421,3820, 3630, 3421.3285, 3468, 3911, 3515, 3824, 3618, 3436,1200]
            var time=[]
            var hour=new Date().getHours();
            console.log(hour)
            for(var i=0;i<24;i++){
              var need=hour+1+i
              if(need>23){
                need=need-24
              }
              time.push(need+":00")
            }
        var option = {
          // backgroundColor: '#0B2D9A',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          legend: {
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['Android', 'IOS', ],
            right: '4%',
            bottom: 0,
            textStyle: {
              fontSize: 12,
              color: '#ccc'
            }
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            top: "10%",
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#DDD'
              }
            },
            data: time
          }],
          yAxis: [{
            type: 'value',
            name: this.$t('交易额'),
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#DDD'
              }
            },
            axisLabel: {
              margin: 5,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DDD'
              }
            }
          }],
          series: [{
            name: 'Android',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(16,97,204, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(17,235,210, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {

                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(16,97,204,1)'
                }, {
                  offset: 1,
                  color: 'rgba(17,235,210,1)'
                }])
              },
              emphasis: {
                color: 'rgb(0,196,132)',
                borderColor: 'rgba(0,196,132,0.2)',
                extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                borderWidth: 10,

              },
            },
            data: androidData
          }, {
            name: 'IOS',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(205,52,42, 0.5)'
                }, {
                  offset: 0.8,
                  color: 'rgba(235,235,21, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              },
            },
            itemStyle: {
              normal: {

                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(205,52,42,1)'
                }, {
                  offset: 1,
                  color: 'rgba(235,235,21,1)'
                }])
              },
              emphasis: {
                color: 'rgb(99,250,235)',
                borderColor: 'rgba(99,250,235,0.2)',
                extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                borderWidth: 10
              }
            },
            data: iosData
          }]
        };
        this.expandTotal = echarts.init(document.getElementById('expandTotal'))
        this.expandTotal.setOption(option)
        window.addEventListener('resize', () => {
          this.expandTotal.resize()
        })
        setInterval(()=>{
        androidData[23]=androidData[23]+parseInt(Math.random()*1000)
        iosData[23]=iosData[23]+parseInt(Math.random()*1000)
        option.series[0].data=androidData
        option.series[1].data=iosData
        this.expandTotal.setOption(option,{
    notMerge: true,
    lazyUpdate: true,
    silent: true
})
        },25000)
        var index = 0; //播放所在下标
         setInterval(()=> {
          this.expandTotal.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          });
          index++;
          if(index > time.length) {
            index = 0;
          }
        }, 1000);
      },
      initIncomeTotal() {
        var android=122
        var ios=311
        let option = {
          //  backgroundColor:'#000',
          graphic: [
            /*最外层圆线*/
            {
              type: 'circle',
              left: 'center',
              top: 'middle',
              shape: {
                r: 270
              },
              style: {
                fill: '#15204e'
              }
            },
          ],
          series: [{
              name: '统计',
              type: 'gauge',
              radius: '68%', //图表尺寸
              center: ['50%', '50%'],
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  shadowBlur: 0,
                  color: [
                    [0.05, '#3ca0ff'],
                    [0.10, '#3ca0ff'],
                    [0.15, '#85b6da'],
                    [0.20, '#75b0ca'],
                    [0.25, '#89b5ac'],
                    [0.30, '#b7c280'],
                    [0.35, '#d1c951'],
                    [0.40, '#d5c450'],
                    [0.45, '#ebc530'],
                    [0.50, '#ebc530'],
                    [0.55, '#ebc530'],
                    [0.60, '#ebc530'],
                    [0.65, '#ebc530'],
                    [0.70, '#ebc530'],
                    [0.75, '#ebc530'],
                    [0.80, '#f5d238'],
                    [0.85, '#e0cd4f'],
                    [0.90, '#d4ca5c'],
                    [0.95, '#c6c66a'],
                    [1, '#b7c17b']
                  ]
                }
              },
              axisTick: {
                show: true,
                lineStyle: {
                  color: 'auto',
                  width: 2
                },
                length: -20,
                splitNumber: 5
              },
              splitLine: {
                show: true,
                length: -30,
                lineStyle: {
                  color: 'auto',
                  width: 2
                }
              },
              axisLabel: {
                show: false
              },
              pointer: { //仪表盘指针
                show: false,
              },
              detail: {
                offsetCenter: [0, '70%'], // x, y，单位px
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: '#9fceff',
                  fontSize: 17,
                },
                formatter: (params)=>{
                  return 'Android：'+this.setVal(params)
                }
              },
              title: {
                show: true,
                offsetCenter: [0, '90%'], // x, y，单位px
                textStyle: {
                  color: '#9fceff',
                  fontSize: 17
                }
              },
              data: [{
                name: "IOS: "+this.setVal(ios),
                value: android
              }]
            },
            {
              type: 'gauge',
              radius: '60%',
              center: ['50%', '50%'],

              splitNumber: 0, //刻度数量
              startAngle: 225,
              endAngle: -45,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 25,
                  color: [
                    [
                      0.9, new echarts.graphic.LinearGradient(
                        0, 0, 1, 0, [{
                            offset: 0,
                            color: '#3ca0ff'
                          },
                          {
                            offset: 1,
                            color: '#ffd52e'
                          }
                        ]
                      )
                    ],
                    [
                      1, '#14306f'
                    ]
                  ]
                }
              },

              //分隔线样式。
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              pointer: {
                show: false
              },
              title: {
                show: true,
                offsetCenter: [0, '-15%'], // x, y，单位px
                textStyle: {
                  color: '#fff',
                  fontSize: 51
                }
              },
              //仪表盘详情，用于显示数据。
              detail: {
                show: true,
                offsetCenter: [0, '26%'],
                color: '#fff',
                formatter: (params)=> {
                  return this.$t('交易量')
                },
                textStyle: {
                  fontSize: 21,
                  backgroundColor: "#1b225b",
                  borderRadius: 10,
                  padding: [6, 10],
                  color: "#2acaff",
                  borderWidth: 1,
                  borderColor: "#2acaff"
                }
              },
              data: [{
                name: this.setVal(Number(android+ios)),
              }]
            }
          ]
        };
        this.incomeTotal = echarts.init(document.getElementById('incomeTotal'))
        this.incomeTotal.setOption(option)
        window.addEventListener('resize', () => {
          this.incomeTotal.resize()
        })
        setInterval(()=>{
        var total=0;
        android=android+parseInt(Math.random()*200)
        ios=ios+parseInt(Math.random()*200)
        option.series[0].detail.formatter=()=>{
          return 'Android：'+this.setVal(android);
        }
         option.series[0].data[0].name="IOS: "+this.setVal(ios)
         option.series[1].data[0].name=this.setVal(ios+android)
//       option.series[1].data[0].value=android
        this.incomeTotal.setOption(option,{
    notMerge: true,
    lazyUpdate: true,
    silent: true
})
        },2000)
        

      },
      initChartTotal() {
        var time=[]
            var hour=new Date().getHours();
            console.log(hour)
            for(var i=0;i<24;i++){
              var need=hour+1+i
              if(need>23){
                need=need-24
              }
              time.push(need+":00")
            }
        var option = {
          //  backgroundColor: '#0E204A',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(255,255,255,0)' // 0% 处的颜色
                  }, {
                    offset: 0.5,
                    color: 'rgba(255,255,255,1)' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
            },

          },
          grid: {
            top: '2%',
            left: '10%',
            right: '1.5%',
            bottom: '25%',
            // containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.4)'
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                color: '#d1e6eb',
                margin: 15,
              },
            },
            axisTick: {
              show: false,
            },
            data: time,
          }],
          yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            // splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)'
              }
            },
            // axisLine: {
            //     show: false,
            // },
            axisLabel: {
              // show: false,
              // margin: 20,
              textStyle: {
                color: '#d1e6eb',

              },
            },
            axisTick: {
              show: false,
            },
          }],
          series: [{
            name: '注册总量',
            type: 'line',
            // smooth: true, //是否平滑曲线显示
            //      symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: "#53fdfe", // 线条颜色
              },
              borderColor: '#f0f'
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(255,255,255,1)",
              }
            },
            tooltip: {
              show: false
            },
            areaStyle: { //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,150,239,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,253,252,0)'
                  }
                ], false),
                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: [150, 200, 259, 360, 378, 450, 450,150, 200, 2590, 360, 378, 4500, 450,150, 200, 259, 360, 378, 450, 450,378, 450, 450]
          }]
        };
        this.chartTotal = echarts.init(document.getElementById('J_chartTotalBox'))
        this.chartTotal.setOption(option)
        window.addEventListener('resize', () => {
          this.chartTotal.resize()
        })
      },
      initChartLine2() {
        var titlename = [this.$t('客车票'), this.$t('飞机票'), this.$t('餐饮'), this.$t('旅游'), this.$t('酒店'), this.$t('更多')];
        var barData = [25250, 4600, 5500, 6500, 8500, 22500];
        var lineData = [59521, 18092, 24045, 32808, 36097, 44715];
        var option = {
          //图标位置
          grid: {
            top: '10',
            left: '21%',
            right: "12%"
          },
          legend: {
            data: [this.$t('支付笔数'), this.$t('支付金额')],
            textStyle: {
              color: '#ebebff'
            },
            bottom: '30',
            right: "10%"
          },
          xAxis: {
            show: false
          },
          yAxis: [{
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333',
              formatter: (value, index) => {
                return [
                  '{title|' + value + '} '
                ].join('\n')
              },
              rich: {

                title: {
                  color: '#fff',
                  borderRadius: 5,
                  padding: 5,
                }
              }
            },
          }],
          series: [{
              name: '支付金额',
              type: 'bar',
              yAxisIndex: 0,
              data: lineData,
              barWidth: 10,
              z: -12,
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#fff',
                    fontSize: '16',
                  }
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 20,
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [{
                        offset: 0,
                        color: '#ff4e50'
                      },
                      {
                        offset: 1,
                        color: '#f9d423'
                      }
                    ]
                  ),
                  // 渐变色
                  // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  // offset: 0,
                  // color: 'rgba(0,255,0)'
                  // }, {
                  // offset: 1,
                  // color: 'rgb(215 ,255,0)'
                  // }]),

                }
              },

            },
            {
              name: '支付笔数',
              type: 'bar',
              yAxisIndex: 0,
              data: barData,

              barWidth: 10,
              barGap: "-100%",
              label: {
                normal: {
                  show: true,
                  position: ["90%", -20],
                  textStyle: {
                    color: '#fff',
                    fontSize: '16',
                  }
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 20,
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [{
                        offset: 0,
                        color: '#f5d100'
                      },
                      // {offset: 0.2, color: 'rgba(156,107,211,0.3)'},
                      {
                        offset: 1,
                        color: '#50cc7f'
                      }
                    ]
                  ),
                  // 渐变色
                  // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  // offset: 0,
                  // color: 'rgba(0,255,0)'
                  // }, {
                  // offset: 1,
                  // color: 'rgb(215 ,255,0)'
                  // }]),

                }
              },

            },
          ]
        };
        this.chartLine2 = echarts.init(document.getElementById('J_chartLineBox2'))
        this.chartLine2.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine2.resize()
        })
      },
      // 折线图
      initChartLine() {
        var titlename = [this.$t('公交'), this.$t('手机充值'), this.$t('燃气'), this.$t('水费'), this.$t('电费'), this.$t('网费'), this.$t('火车票')];
        var barData = [4600, 5500, 7500, 8500, 12500, 21500, 23200];
        var lineData = [18092, 24045, 32808, 36097, 44715, 50415, 56061];
        var option = {
          //图标位置
          grid: {
            top: '10',
            left: '21%',
            right: "12%"
          },
          //  legend: {
          //      data: ['支付笔数', '支付金额'],
          //      textStyle: {
          //          color: '#ebebff'
          //      },
          //      bottom:'2',
          //      right:"10%"
          //  },
          xAxis: {
            show: false
          },
          yAxis: [{
            show: true,
            data: titlename,
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333',
              formatter: (value, index) => {
                return [
                  '{title|' + value + '} '
                ].join('\n')
              },
              rich: {

                title: {
                  color: '#fff',
                  borderRadius: 5,
                  padding: 5,
                }
              }
            },
          }],
          series: [{
              name: '支付金额',
              type: 'bar',
              yAxisIndex: 0,
              data: lineData,
              barWidth: 10,
              z: -12,
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#fff',
                    fontSize: '16',
                  }
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 20,
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [{
                        offset: 0,
                        color: '#ff4e50'
                      },
                      {
                        offset: 1,
                        color: '#f9d423'
                      }
                    ]
                  ),
                  // 渐变色
                  // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  // offset: 0,
                  // color: 'rgba(0,255,0)'
                  // }, {
                  // offset: 1,
                  // color: 'rgb(215 ,255,0)'
                  // }]),

                }
              },

            },
            {
              name: '支付笔数',
              type: 'bar',
              yAxisIndex: 0,
              data: barData,

              barWidth: 10,
              barGap: "-100%",
              label: {
                normal: {
                  show: true,
                  position: ["90%", -20],
                  textStyle: {
                    color: '#fff',
                    fontSize: '16',
                  }
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 20,
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [{
                        offset: 0,
                        color: '#f5d100'
                      },
                      // {offset: 0.2, color: 'rgba(156,107,211,0.3)'},
                      {
                        offset: 1,
                        color: '#50cc7f'
                      }
                    ]
                  ),
                  // 渐变色
                  // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  // offset: 0,
                  // color: 'rgba(0,255,0)'
                  // }, {
                  // offset: 1,
                  // color: 'rgb(215 ,255,0)'
                  // }]),

                }
              },

            },
          ]
        };
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