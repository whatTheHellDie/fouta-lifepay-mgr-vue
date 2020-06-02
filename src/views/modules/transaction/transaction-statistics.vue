<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList1()" label-width="40px">
      <!--<span style="line-height: 36px;color: #606266;">{{$t( '收支类别' )}}</span>
      <el-form-item>
        <el-select v-model="value" :placeholder="$t( '请选择' )">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item :label="$t( '年月' )">
      <el-date-picker
      v-model="time1"
      type="month"
      :placeholder="$t( '选择年月' )" @change="getDate">
    </el-date-picker>
    </el-form-item>
    <span style="line-height: 36px;color: #606266;">{{$t( '日期时间段' )}}</span>
    <el-form-item>
       <el-date-picker
      v-model="time2"
      type="datetimerange"
      @change="getDetailTime"
      :range-separator="$t( '至' )"
      :start-placeholder="$t( '开始日期' )"
      :end-placeholder="$t( '结束日期' )">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        
        <el-button type="primary" @click="getDataList1()">{{$t( '搜索' )}}</el-button>
      </el-form-item>
    </el-form>
     <div class="total-flow">
      <div class="title">{{$t( '统计汇总' )}}<span class="time" v-if="defaultTime">{{$t( '日期' )}}：{{defaultTime}}</span></div>
      <div class="money"><span class="text">{{$t( '收入金额' )}}</span><span class="color">+ {{income}}</span></div>
      <div class="money"><span class="text">{{$t( '支出金额' )}}</span><span class="color color1">- {{Math.abs(expend)}}</span></div>
      <div class="money he"><span class="text">{{$t( '合计' )}}</span><span class="color" :class="{color1:(income+expend)<0}">{{total}}</span></div>
      <!--<div class="title">{{$t( '统计分析' )}}</div>
      <div class="chart-line-wrap">
              <div id="J_chartLineBox" class="chart-box"></div>
            </div>-->
     </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        defaultTime:"",
        expend:"",
        income:"",
        options: [{
          value: '选项1',
          label: this.$t( '收入' )
        }, {
          value: '选项2',
          label: this.$t( '支出' )
        }],
        value: '',
        value2:"",
        time1:"",
        time2:"",
        dayTime:"",
        detailTime1:"",
        detailTime2:"",
        showPayMethod: false,
        dataForm: {
          applicationName: '',
          projectAccount: ''
        },
      }
    },
    computed:{
      total(){
        var total=(this.expend*10000+this.income*10000)/10000
        return total.toFixed(2)>=0?"+ "+total.toFixed(2):'- '+Math.abs(total.toFixed(2))
      },
      selectedTime(){
        if(this.dayTime||this.detailTime1){
          return true
        }else{
          return false;
        }
      }
    },
    mounted() {
      this.getDataList1()
//    this.initChartLine()
     
    },
    activated() {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
//    if(this.chartLine) {
//      this.chartLine.resize()
//    }
    },
    methods: {
       getDetailTime(){
         this.time1=""
         this.dayTime=""
         var time1;
         var time2;
         if(this.time2){
         time1=this.time2[0];
         time2=this.time2[1];
         }
         if(time1){
        this.detailTime1=new Date(time1).getFullYear()+"-"+((new Date(time1).getMonth()+1)<10?"0"+(new Date(time1).getMonth()+1):(new Date(time1).getMonth()+1))+"-"+
        (new Date(time1).getDate()<10?'0'+new Date(time1).getDate():new Date(time1).getDate())+" "+
        (new Date(time1).getHours()<10?'0'+new Date(time1).getHours():new Date(time1).getHours())+":"+
        (new Date(time1).getMinutes()<10?'0'+new Date(time1).getMinutes():new Date(time1).getMinutes())+":"+
        (new Date(time1).getSeconds()<10?'0'+new Date(time1).getSeconds():new Date(time1).getSeconds())
         this.detailTime2=new Date(time2).getFullYear()+"-"+((new Date(time2).getMonth()+1)<10?"0"+(new Date(time2).getMonth()+1):(new Date(time2).getMonth()+1))+"-"+
        (new Date(time2).getDate()<10?'0'+new Date(time2).getDate():new Date(time2).getDate())+" "+
        (new Date(time2).getHours()<10?'0'+new Date(time2).getHours():new Date(time2).getHours())+":"+
        (new Date(time2).getMinutes()<10?'0'+new Date(time2).getMinutes():new Date(time2).getMinutes())+":"+
        (new Date(time2).getSeconds()<10?'0'+new Date(time2).getSeconds():new Date(time2).getSeconds())
        }else{
          this.detailTime1=""
          this.detailTime2=""
        }
      },
      getDate(){
        this.time2=""
        this.detailTime1=""
        this.detailTime2=""
        if(this.time1){
        this.dayTime=new Date(this.time1).getFullYear()+"-"+((new Date(this.time1).getMonth()+1)<10?"0"+(new Date(this.time1).getMonth()+1):(new Date(this.time1).getMonth()+1))
        }else{
          this.dayTime=""
        }
      },
       // 获取数据列表
      getDataList1() {
        this.$http({
          url: this.$http.adornUrl('/sys/bill/billStatics'),
          method: 'post',
          params: this.$http.adornParams({
            'date': this.dayTime,
            'startTime': this.detailTime1,
            'endTime': this.detailTime2,
          })
        }).then(({
          data
        }) => {
           if(data && data.code === 0) {
              this.income=data.bill.income;          
              this.expend=data.bill.expend;   
              if(this.dayTime){
                this.defaultTime=this.dayTime
              }else if(this.detailTime1){
                this.defaultTime=this.detailTime1+" "+this.$t("至")+" "+this.detailTime2
              }else{
                this.defaultTime=""
              }
          } else {
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
            });
          }
          this.dataListLoading = false
        })
      },
      // 折线图
      initChartLine() {
        var option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        top:'5%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['10-1', '10-6', '10-11', '10-16', '10-21', '10-26', '10-31'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'合计',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, -39000, 330, 220]
        }
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
.chart-box {
      min-height: 400px;
    }
</style>