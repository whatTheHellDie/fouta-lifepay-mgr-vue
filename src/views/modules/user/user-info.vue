<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" :label-width="labelWidth">
      <span class="label-search">{{$t( '账号' )}}</span>
      <el-form-item>
        <el-input v-model="dataForm.phone" :placeholder="$t( '账号' )" clearable></el-input>
      </el-form-item>
      <span class="label-search">{{$t( '姓名' )}}</span>
      <el-form-item>
        <el-input v-model="dataForm.name" :placeholder="$t( '姓名' )" clearable></el-input>
      </el-form-item>
<!--<div class="inb">
      <span class="label-search">{{$t( '排序字段' )}}</span>
     
      <el-select v-model="dataForm.sidx" :placeholder="$t('请选择')">
        <el-option v-for="item in sidxOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      </div>-->
      <div class="inb">
      <span class="label-search">{{$t( '实名状态' )}}</span>
      <el-select v-model="dataForm.isIdAuth" :placeholder="$t('请选择')">
        <el-option v-for="item in vertifyOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div class="inb">
      <span class="label-search">{{$t( '冻结状态' )}}</span>
      <el-select v-model="dataForm.status" :placeholder="$t('请选择')">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div class="inb">
      <span class="label-search">{{$t( '注册时间段' )}}</span>
      <el-date-picker v-model="time2" type="daterange" @change="getDetailTime" :range-separator="$t( '至' )" :start-placeholder="$t( '开始日期' )" :end-placeholder="$t( '结束日期' )"></el-date-picker>
      </div>
      <div class="inb">
        <span class="label-search">{{$t( '累计转账收入(最小值)' )}}</span>
        <el-form-item>
          <el-input v-model="dataForm.minIncome" type="number" :placeholder="$t( '累计转账收入(最小值)' )"></el-input>
        </el-form-item>
        </div>
        <div class="inb">
        <span class="label-search">{{$t( '累计转账收入(最大值)' )}}</span>
        <el-form-item>
          <el-input v-model="dataForm.maxIncome" type="number" :placeholder="$t( '累计转账收入(最大值)' )"></el-input>
        </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="getDataList()">{{$t( '搜索' )}}</el-button>
        </el-form-item>
        <div class="inb">
        <span class="label-search">{{$t( '隐藏列' )}}</span>
        <el-select v-model="value2" multiple collapse-tags :placeholder="$t('请选择')">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        </div>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" @sort-change="sortChange"  style="width: 100%;">
      <!--<el-table-column type="selection" header-align="center" align="center" width="40">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="50" type="index" :index="1" :label="序号">
      </el-table-column>-->
      <el-table-column prop="projectAccount" header-align="center" v-if="columnArray[0]" align="center" :label="$t( '姓名' )">
        <template slot-scope="scope">
          <span class="user-hover" @click="toDetail(scope.row.id)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="projectAccount" header-align="center" v-if="columnArray[1]" align="center" :label="$t( '账号' )">
        <template slot-scope="scope">
          <span class="user-hover" @click="toDetail(scope.row.id)">{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[2]" :label="$t( '性别' )" prop="sex"></el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[3]" :label="$t( '出生日期' )" prop="birthday"></el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[4]" :label="$t( '实名认证' )" prop="isIdAuth">
        <template slot-scope="scope">
          <div>
            <el-tag type="warning" v-if="scope.row.isIdAuth===0">{{$t('未实名')}}</el-tag>
            <el-tag type="success" v-if="scope.row.isIdAuth===1">{{$t('已实名')}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[4]" :label="$t( '身份证件' )" prop="typeOf">
        <template slot-scope="scope">
          <div>
            <div v-if="scope.row.typeOf===0">{{$t('身份证')}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[5]" :label="$t( '证件号码' )" prop="number"></el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[8]" :label="$t( '累计转账收入' )" @sort-method="sortMethod(1)" :sort-orders="['descending','ascending','descending']" width="130" sortable="custom" prop="income"></el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[9]" :label="$t( '累计转账支出' )" width="130" sortable="custom" :sort-orders="['descending','ascending','descending']" prop="spending"></el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[9]" :label="$t( '注册时间' )" sortable="custom" prop="createTime" :sort-orders="['descending','ascending','descending']"></el-table-column>
      <el-table-column header-align="center" align="center" v-if="columnArray[10]" :label="$t( '银行卡数量' )" prop="bankCardCount"></el-table-column>
      <el-table-column prop="status" fixed="right" header-align="center" v-if="columnArray[6]" align="center" width="100px" :label="$t( '冻结' )">
        <template slot-scope="scope">
          <div v-if="isAuth('sys:users:update')">
            <el-button type="text" @click="freeze(scope.row.id,1)" v-if="scope.row.status==0">{{$t( '冻结' )}}</el-button>
            <el-button type="text" @click="freeze(scope.row.id,0)" v-else>{{$t( '解冻' )}}</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" fixed="right" header-align="center" v-if="columnArray[7]" align="center" width="100px" :label="$t( '操作' )">
        <template slot-scope="scope">
          <div v-if="isAuth('sys:users:list')">
            <el-button type="text" @click="toDetail(scope.row.id)">{{$t( '查看' )}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: 'all',
          label: this.$t('全部')
        },
        {
          value: 0,
          label: this.$t('姓名')
        }, {
          value: 1,
          label: this.$t('账号')
        }, {
          value: 2,
          label: this.$t('性别')
        }, {
          value: 3,
          label: this.$t('出生日期')
        }, {
          value: 4,
          label: this.$t('身份证件')
        }, {
          value: 5,
          label: this.$t('证件号码')
        }, {
          value: 8,
          label: this.$t('累计转账收入')
        }, {
          value: 9,
          label: this.$t('累计转账支出')
        }, {
          value: 10,
          label: this.$t('银行卡数量')
        }, {
          value: 11,
          label: this.$t('证件有效期')
        }, {
          value: 6,
          label: this.$t('冻结')
        }, {
          value: 7,
          label: this.$t('操作')
        }],
        value2: [],
        vertifyOptions: [{
          value: '',
          label: this.$t('全部')
        },{
          value: 0,
          label: this.$t('未实名')
        }, {
          value: 1,
          label: this.$t('已实名')
        }, ],
        sidxOptions: [{
          value: '',
          label: this.$t('全部')
        },{
          value: 'income',
          label: this.$t('累计转账收入')
        }, {
          value: 'spending',
          label: this.$t('累计转账支出')
        }, {
          value: 'createTime',
          label: this.$t('注册时间')
        }, ],
        statusOptions:[{
          value: '',
          label: this.$t('全部')
        },{
          value: 0,
          label: this.$t('未冻结')
        }, {
          value: 1,
          label: this.$t('已冻结')
        } ],
        time2: [],
        columnArray: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, ],
        showPayMethod: false,
        dataForm: {
          phone: '',
          name: '',
          applicationName: '',
          projectAccount: '',
          order: 'asc',
          sidx: '',
          startTime: '',
          endTime: '',
          status: '0',
          minIncome: '',
          maxIncome: '',
          isIdAuth:""
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        showInfoVisible: false,
        addSmsnumVisible: false,
        addOrUpdateVisible: false,
        bankReceiptVisible: false,
        applicationReceiptVisible: false,
      }
    },
    activated() {
      this.getDataList()
    },
    deactivated() {
      this.addOrUpdateVisible = false
      this.showInfoVisible = false
      this.addSmsnumVisible = false
      this.showPayMethod = false
    },
    computed: {
      labelWidth() {
        switch(window.localStorage.language) {
          case 'zh-cn':
            return '40px';
          case 'en':
            return '80px'
        }
      }
    },
    watch: {
      value2(val,oldVal) {
        this.value2.forEach((item, i) => {
          if(item=="all"&&i!=0){
            this.value2=["all"]
            return;
          }
          if(oldVal[0]=="all"&&val[0]!="all"){
            this.value2=[]
          }
        })
        if(val[0]=="all"){
          this.columnArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
          return ;
        }
        this.columnArray = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
        this.value2.forEach((item, i) => {
          this.columnArray[item] = false;
        })
      }
    },
    methods: {
      sortMethod(number1){
        alert(number1)
      },
      sortChange(column, key, order){
        console.log(column.prop)
        console.log(column.order)
        this.dataForm.sidx=column.prop
        if(!column.order){
          this.dataForm.order=""
        }else if(column.order=="ascending"){
          this.dataForm.order="asc"
        }else if(column.order=="descending"){
          this.dataForm.order="desc"
        }
        this.getDataList()
      },
      getDetailTime(){
         var time1;
         var time2;
         if(this.time2){
         time1=this.time2[0];
         time2=this.time2[1];
         }
         if(time1){
        this.dataForm.startTime=new Date(time1).getFullYear()+"-"+((new Date(time1).getMonth()+1)<10?"0"+(new Date(time1).getMonth()+1):(new Date(time1).getMonth()+1))+"-"+
        (new Date(time1).getDate()<10?'0'+new Date(time1).getDate():new Date(time1).getDate())
//      +" "+
//      (new Date(time1).getHours()<10?'0'+new Date(time1).getHours():new Date(time1).getHours())+":"+
//      (new Date(time1).getMinutes()<10?'0'+new Date(time1).getMinutes():new Date(time1).getMinutes())+":"+
//      (new Date(time1).getSeconds()<10?'0'+new Date(time1).getSeconds():new Date(time1).getSeconds())
         this.dataForm.endTime=new Date(time2).getFullYear()+"-"+((new Date(time2).getMonth()+1)<10?"0"+(new Date(time2).getMonth()+1):(new Date(time2).getMonth()+1))+"-"+
        (new Date(time2).getDate()<10?'0'+new Date(time2).getDate():new Date(time2).getDate())
//      +" "+
//      (new Date(time2).getHours()<10?'0'+new Date(time2).getHours():new Date(time2).getHours())+":"+
//      (new Date(time2).getMinutes()<10?'0'+new Date(time2).getMinutes():new Date(time2).getMinutes())+":"+
//      (new Date(time2).getSeconds()<10?'0'+new Date(time2).getSeconds():new Date(time2).getSeconds())
        }else{
          this.dataForm.startTime=""
          this.dataForm.endTime=""
        }
      },
      freeze(id, status) {
        this.$http({
          url: this.$http.adornUrl('/sys/users/update'),
          method: 'post',
          data: this.$http.adornData({
            'id': id,
            'status': status,
          })
        }).then(({
          data
        }) => {
          if(data && data.code === 0) {
            this.getDataList()
          } else {
            this.$alert(data.msg, this.$t('提示'), {
              confirmButtonText: this.$t('确定'),
            });
          }
        })
      },
      toDetail(id) {
        if(!this.isAuth('sys:users:list')) {
          return;
        }
        this.$router.push({
          path: 'user-detail',
          query: {
            id: id
          }
        })
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;
        this.bankReceiptVisible = false;
        this.applicationReceiptVisible = false;
        this.$http({
          url: this.$http.adornUrl('/sys/users/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'phone': this.dataForm.phone,
            'name': this.dataForm.name,
            'order': this.dataForm.order,
            'sidx': this.dataForm.sidx,
            'startTime': this.dataForm.startTime,
            'endTime': this.dataForm.endTime,
            'status': this.dataForm.status,
            'minIncome': this.dataForm.minIncome,
            'maxIncome': this.dataForm.maxIncome,
            'isIdAuth': this.dataForm.isIdAuth,
            
          })
        }).then(({
          data
        }) => {
          if(data && data.code === 0) {
            data.page.list.forEach((item, i) => {
              data.page.list[i].sex = item.sex === 0 ? this.$t("男") : this.$t("女")
            })
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount

          } else {
            this.$alert(data.msg, this.$t('提示'), {
              confirmButtonText: this.$t('确定'),
            });
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
<style>
.el-form--inline .el-select{margin-bottom: 20px;}
</style>