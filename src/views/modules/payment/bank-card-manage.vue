<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()"  label-width="40px">
      <span class="label-search">{{$t( '姓名' )}}</span>
      <el-form-item>
        <el-input v-model="dataForm.username" :placeholder="$t( '账号' )" clearable></el-input>
      </el-form-item>
      <span class="label-search">{{$t( '公司' )}}</span>
      <el-form-item>
        <el-input v-model="dataForm.realName" :placeholder="$t( '姓名' )" clearable></el-input>
      </el-form-item>
      <span class="label-search">{{$t( '银行名称' )}}</span>
      <el-form-item>
        <el-button type="primary" @click="getDataList()">{{$t( '搜索' )}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading"  style="width: 100%;">
      <!--<el-table-column type="selection" header-align="center" align="center" width="40">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="50" type="index" :index="1" :label="序号">
      </el-table-column>-->
      <el-table-column header-align="center" align="center" :label="$t( '姓名' )"  prop="realName"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '性别' )"  prop="username"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '身份证号码' )"  prop="name"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '手机号码' )"  prop="account"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '家庭住址' )"  prop="account"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '出入地址' )"  prop="account"></el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        showPayMethod: false,
        typesOptions:[{
          value: '',
          label: this.$t('全部')
        },{
          value: 0,
          label: this.$t('储蓄卡')
        },{
          value: 1,
          label: this.$t('信用卡')
        },],
        dataForm: {
          username: '',
          realName: '',
          name:"",
          types:""
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
    this.addOrUpdateVisible=false
    this.showInfoVisible=false
    this.addSmsnumVisible=false
    this.showPayMethod=false
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/sys/bankcard/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'username': this.dataForm.username,
            'realName': this.dataForm.realName,
            'name':this.dataForm.name,
            'types':this.dataForm.types
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
