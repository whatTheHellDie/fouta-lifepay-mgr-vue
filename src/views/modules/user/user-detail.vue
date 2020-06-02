<template>
  <div class="user-detail-info">
    <div>
      <div class="base-info">
        <div class="title">{{$t( '基础信息' )}}</div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">{{$t( '姓名' )}}：{{users.name}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{$t( '性别' )}}：{{users.sex!==null?(users.sex===0?$t('男'):$t('女')):""}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{$t( '出生日期' )}}：{{users.birthday}}</div>
          </el-col>
         
          <el-col :span="6">
            <div class="grid-content bg-purple">{{$t( '证件类型' )}}：{{users.createTime}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{$t( '证件号码' )}}：{{users.createTime}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">{{$t( '国籍' )}}：{{users.area}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{$t( '手机号码' )}}：{{users.phone}}</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{$t( '家庭住址' )}}：{{users.phone}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{$t( '公司名称' )}}：{{users.phone}}</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{$t( '照片' )}}：<div class="inb"><img :src="users.frontPicture" class="img" :alt="$t( '证件照片' )" /><br />
        <br /><img :src="users.backPicture" class="img" :alt="$t( '证件照片' )" /></div></div>
          </el-col>
        </el-row>
        <el-col :span="12">
            <div class="grid-content bg-purple">{{$t( '健康状态' )}}：
              <el-select v-model="dataForm.status" :placeholder="$t('请选择')">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{$t( '健康问卷' )}}：
              <el-select v-model="dataForm.status" :placeholder="$t('请选择')">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
            </div>
          </el-col>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id:"",
        users:{},
        titleList: [this.$t( "基础信息" ), this.$t( '用户银行卡' ), this.$t( '用户交易记录' )],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataList: [],
        pageIndex1: 1,
        pageSize1: 10,
        totalPage1: 0,
        dataListLoading1: false,
        dataList1: [],
      }
    },
    deactivated(){
      this.$closeWindow('user-detail')
    },
    activated(){
      this.id=this.$route.query.id
      this.getData()
      this.getDataList()
    },
    methods: {
      getDataList() {
        this.dataListLoading1 = true;
        this.$http({
          url: this.$http.adornUrl('/sys/users/getBill'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex1,
            'limit': this.pageSize1,
            'uid': this.id,
          })
        }).then(({
          data
        }) => {
          if(data && data.code === 0) {
            this.dataList1 = data.bills.list
            this.totalPage1 = data.bills.totalCount
            
          } else {
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
            });
          }
          this.dataListLoading1 = false
        })
      },
       // 获取数据列表
      getData() {
        this.$http({
          url: this.$http.adornUrl('/sys/users/getInfo'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'uid': this.id,
          })
        }).then(({
          data
        }) => {
          if(data && data.code === 0) {
            this.users=data.users;
            this.dataList=data.bankCards.list;
            this.totalPage = data.bankCards.totalCount
          } else {
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
            });
          }
        })
      },
      
      // 每页数
      sizeChangeHandle1(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle1(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getData()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getData()
      },
    }
  }
</script>
<style scoped="scoped" lang="scss">

</style>