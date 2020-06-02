<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()"  label-width="80px">
      <el-form-item :label="$t( '商家名称' )">
        <el-input v-model="dataForm.name" :placeholder="$t( '商家名称' )" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  @click="getDataList()">{{$t( '搜索' )}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="isAuth('sys:application:save')" @click="addOrUpdateHandle()">{{$t( '添加' )}}</el-button>
        <el-button v-if="isAuth('sys:application:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">{{$t( '批量删除' )}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" @selection-change="selectionChangeHandle" border v-loading="dataListLoading"  style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="80" type="index" :index="1" :label="$t( '序号' )">
      </el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '商家名称' )"  prop="businessName">
        <template slot-scope="scope">
          <div @click="viewerHandle(scope.row.id)" class="user-hover">{{scope.row.businessName}}</div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '第三方应用名称' )"  prop="name"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '应用编号' )" width="160"  prop="applicationNo">
        <template slot-scope="scope">
          <div class="nowrap"><div class="copy-nowrap" :title="scope.row.applicationNo">{{scope.row.applicationNo}}</div><el-button type="text" class="btn" :data-clipboard-text="scope.row.applicationNo" @click="copy">{{$t( '复制' )}}</el-button></div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '应用key' )" width="160"  prop="appKey">
        <template slot-scope="scope">
          <div class="nowrap"><div class="copy-nowrap" :title="scope.row.appKey">{{scope.row.appKey}}</div><el-button type="text" class="btn" :data-clipboard-text="scope.row.appKey" @click="copy">{{$t( '复制' )}}</el-button></div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '应用secret' )" width="160"  prop="appSecret">
         <template slot-scope="scope">
          <div class="nowrap"><div class="copy-nowrap" :title="scope.row.appSecret">{{scope.row.appSecret}}</div><el-button type="text" class="btn" :data-clipboard-text="scope.row.appSecret" @click="copy">{{$t( '复制' )}}</el-button></div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '负责人' )"  prop="corporateName"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '联系电话' )"  prop="contactNumber"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '手机号码' )"  prop="phone"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '绑定手机号' )"  prop="account"></el-table-column>
      
      
      <!--<el-table-column header-align="center" align="center" :label="$t( '证件类型' )"  prop="idType"></el-table-column>
      <el-table-column header-align="center" align="center" :label="$t( '证件号' )"  prop="idNumber"></el-table-column>-->
      <el-table-column fixed="right" header-align="center" align="center" :label="$t( '操作' )">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:application:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{$t( '修改' )}}</el-button>
          <el-button v-if="isAuth('sys:application:delete')" type="text" size="small" @click="deleteHandle(scope.row.id,scope.row.name)">{{$t( '删除' )}}</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" :label="$t( '排列顺序' )"  prop="account">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sort" @blur="changeStatus(scope.row.id,scope.row.sort,undefined)"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" :label="$t( '是否开通' )">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===1"  type="text" size="small" @click="changeStatus(scope.row.id,undefined,0)">{{$t( '开通' )}}</el-button>
          <div v-if="scope.row.status===0" class="close-it-btn"><el-button @click="changeStatus(scope.row.id,undefined,1)" type="text" size="small">{{$t( '关闭' )}}</el-button></div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <viewer v-if="viewerVisible" ref="viewer" @refreshDataList="getDataList"></viewer>
  </div>
</template>
<script>
  import Clipboard from 'clipboard';  
  import AddOrUpdate from './add-or-update'
  import viewer from './viewer'
  export default {
    data() {
      return {
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
        showInfoVisible: false,
        addSmsnumVisible: false,
        addOrUpdateVisible: false,
        viewerVisible:false,
        dataListSelections: [],
      }
    },
    activated() {
      this.getDataList()
    },
    deactivated() {
    this.addOrUpdateVisible=false
    },
    components: {
      AddOrUpdate,
      viewer
    },
    methods: {
      copy() {  
          var clipboard = new Clipboard('.btn')  
          clipboard.on('success', e => {  
            this.$message({
          message: this.$t('复制成功'),
          type: 'success'
        });

                  // 释放内存  
                  clipboard.destroy()  
                })  
                clipboard.on('error', e => {  
                  // 不支持复制  
                  this.$alert(this.$t('该浏览器不支持自动复制')+','+this.$t('应用编号')+"："+e.text,this.$t('提示'),{confirmButtonText: this.$t('确定')});
                  // 释放内存  
                  clipboard.destroy()  
                })  
        },
      changeStatus(id,sort,status){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
         
          this.$http({
            url: this.$http.adornUrl(`/sys/application/updateStatus`),
            method: 'post',
            data: this.$http.adornData({
              id,
              sort,
              status
            })
          }).then(({
            data
          }) => {
            loading.close();
            if(data && data.code === 0) {
              this.getDataList()
            } else {
              this.$alert(data.msg, this.$t('提示'), {
                confirmButtonText: this.$t('确定'),
              });
            }
          })
      },
      viewerHandle(id) {
        this.viewerVisible = true
        this.$nextTick(() => {
          this.$refs.viewer.init(id)
        })
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      toDetail(){
        this.$router.push({name:'user-detail'})
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/sys/application/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'name': this.dataForm.name,
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 删除
      deleteHandle (id, userName) {
        var userIds = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        var userNames = userName ? [userName] : this.dataListSelections.map(item => {
          return item.name
        })
        this.$confirm(this.$t( 'messages.template1',[userNames.join(','),id ? this.$t( '删除' ) : this.$t( '批量删除' )] ), this.$t( '提示' ), {
          confirmButtonText: this.$t( '确定' ),
          cancelButtonText: this.$t( '取消' ),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/application/delete'),
            method: 'post',
            data: this.$http.adornData(userIds, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: this.$t( '操作成功' ),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
            });
          }
          })
        }).catch(() => {})
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
<style scoped="scoped" lang="scss">
  .close-it-btn{
    .el-button--text{color: #000;}
  }
  .copy-nowrap{width:100px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;display: inline-block;vertical-align: top;}
  .nowrap{white-space: nowrap;
  .btn{padding: 0;}}
</style>
