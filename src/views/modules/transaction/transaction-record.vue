<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()"  label-width="40px">
      <span class="label-search">{{$t( '账号' )}}</span>
      <el-form-item >
        <el-input v-model="dataForm.userphone" :placeholder="$t( '账号' )" clearable></el-input>
      </el-form-item>
      <span class="label-search">{{$t( '姓名' )}}</span>
      <el-form-item>
        <el-input v-model="dataForm.username" :placeholder="$t( '姓名' )" clearable></el-input>
      </el-form-item>
      <span class="label-search">{{$t( '收支类别' )}}</span>
      <el-form-item>
         <el-select v-model="dataForm.budgetType" :placeholder="$t( '请选择' )">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList()">{{$t( '搜索' )}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading"  style="width: 100%;">
      <el-table-column header-align="center" align="center" :label="$t( '账号' )"  prop="userPhone"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '姓名' )"  prop="username"></el-table-column>
      
      <el-table-column prop="address" header-align="center" align="center" :label="$t( '收支类别' )">
          <template slot-scope="scope">
        <el-tag type="primary" v-if="scope.row.budgetType==0">{{$t( '收入' )}}</el-tag>
        <el-tag type="warning" v-if="scope.row.budgetType==1">{{$t( '支出' )}}</el-tag>
      </template>
       </el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '日期' )"  prop="createTime"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '金额' )"  prop="amount"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '订单名称' )"  prop="title"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '订单类型' )"  prop="classify">
        <template slot-scope="scope">
          <div v-if="scope.row.classify==0">{{$t( '其它' )}}</div>
          <div v-if="scope.row.classify==1">{{$t( '转账' )}}</div>
          <div v-if="scope.row.classify==2">{{$t( '网购' )}}</div>
          <div v-if="scope.row.classify==3">{{$t( '线下消费' )}}</div>
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
          value: '',
          label: this.$t( '全部' )
        },{
          value: '0',
          label: this.$t( '收入' )
        }, {
          value: '1',
          label: this.$t( '支出' )
        }],
        showPayMethod: false,
        dataForm: {
          username: '',
          userphone: '',
          budgetType:""
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
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/sys/bill/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'username': this.dataForm.username,
            'userPhone': this.dataForm.userphone,
            'budgetType': this.dataForm.budgetType,
          })
        }).then(({
          data
        }) => {
           if(data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            
          } else {
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
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
</style>
