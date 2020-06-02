<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()"  :label-width="labelWidth">
      <el-form-item :label="$t( '区域' )">
        <el-input v-model="dataForm.phone" :placeholder="$t( '区域' )" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t( '审批状态' )">
        <el-input v-model="dataForm.name" :placeholder="$t( '姓名' )" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList()">{{$t( '搜索' )}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading"  style="width: 100%;">
      <!--<el-table-column type="selection" header-align="center" align="center" width="40">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="50" type="index" :index="1" :label="序号">
      </el-table-column>-->
      <el-table-column prop="projectAccount" header-align="center" align="center" :label="$t( '用户账号' )">
        <template slot-scope="scope">
          <span class="user-hover" @click="toDetail(scope.row.id)">{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="projectAccount" header-align="center" align="center" :label="$t( '申请内容' )">
        <template slot-scope="scope">
          <span class="user-hover" @click="toDetail(scope.row.id)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
       
      <el-table-column header-align="center" align="center" :label="$t( '申请时间' )"  prop="sex"></el-table-column>
      <el-table-column prop="status" fixed="right" header-align="center" align="center" width="100px"  :label="$t( '冻结' )">
        <template slot-scope="scope">
          <div v-if="isAuth('sys:users:update')">
          <el-button type="text" @click="freeze(scope.row.id,1)" v-if="scope.row.status=='未冻结'">{{$t( '冻结' )}}</el-button> 
          <el-button type="text" @click="freeze(scope.row.id,0)" v-else>{{$t( '解冻' )}}</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" fixed="right" header-align="center" align="center" width="100px"  :label="$t( '操作' )">
         <template slot-scope="scope">
          <div v-if="isAuth('sys:users:update')">
          <el-button type="text" @click="freeze(scope.row.id,1)" v-if="scope.row.status=='未冻结'">{{$t( '冻结' )}}</el-button> 
          <el-button type="text" @click="freeze(scope.row.id,0)" v-else>{{$t( '解冻' )}}</el-button>
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
        showPayMethod: false,
        dataForm: {
          phone:'',
          name:'',
          applicationName: '',
          projectAccount: ''
        },
        vertifyOptions: [{
          value: '',
          label: this.$t('全部')
        },{
          value: 0,
          label: this.$t('通过')
        }, {
          value: 1,
          label: this.$t('未通过')
        }, ],
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
    computed: {
      labelWidth(){
        switch(window.localStorage.language){
          case 'zh-cn':return '40px';
          case 'en':return '80px'
        }
      }
    },
    methods: {
      freeze(id,status){
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
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
            });
          }
        })
      },
      toDetail(id){
        if(!this.isAuth('sys:users:list')){return;}
        this.$router.push({path:'user-detail',query:{id:id}})
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
            'name': this.dataForm.name
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
