<template>
  <el-dialog :title="!dataForm.id ? $t( '新增商家信息' ) : $t( '修改商家信息' )" v-loading.fullscreen.lock="fullscreenLoading" width="80%" :close-on-click-modal="false" :visible.sync="visible" top="5vh" custom-class="wew">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" :label-width="labelWidth">

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t( '商家名称' )" prop="businessName" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.businessName" :placeholder="$t( '商家名称' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '第三方应用名称' )" prop="name" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.name" :placeholder="$t( '第三方应用名称' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '负责人' )" prop="corporateName" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.corporateName" :placeholder="$t( '负责人' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '联系电话' )" prop="contactNumber" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.contactNumber" :placeholder="$t( '联系电话' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '手机号' )" prop="phone" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.phone" :placeholder="$t( '手机号' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t( '详细地址' )" prop="address" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.address" :placeholder="$t( '详细地址' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '电子邮箱' )" prop="email" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.email" :placeholder="$t( '电子邮箱' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '证件类型' )" prop="idType" :class="{ 'is-required': true }">
            <el-select v-model="dataForm.idType" :placeholder="$t( '证件类型' )">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '证件号码' )" prop="idNumber" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.idNumber" :placeholder="$t( '证件号码' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '绑定账号' )" prop="account" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.account" :placeholder="$t( '绑定账号' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '证件正面' )" prop="idPhotoOne" :class="{ 'is-required': true }">
            <div class="id-card">
              <img class="add-img" v-if="dataForm.idPhotoOne" :src="dataForm.idPhotoOne" />
              <div v-else class="add" src="/static/img/ic_add_icon@2x.png"></div>
              <input @change='add_img($event,"idPhotoOne")' accept="image/*;capture=camera" type="file" id="saveImage">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '证件背面' )" prop="idPhotoTwo" :class="{ 'is-required': true }">
            <div class="id-card">
              <img class="add-img" v-if="dataForm.idPhotoTwo" :src="dataForm.idPhotoTwo" />
              <div v-else class="add" src=""></div>
              <input @change='add_img($event,"idPhotoTwo")' accept="image/*;capture=camera" type="file" id="saveImage">
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '营业执照号码' )" prop="licenseNumber" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.licenseNumber" :placeholder="$t( '营业执照号码' )"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t( '许可证照片' )">
            <div class="id-card" v-for="item,i in licensePhoto">
              <img class="add-img" v-if="licensePhoto[i]" :src="licensePhoto[i]" />
              <div v-else class="add" src=""></div>
              <input @change='add_img1($event,"licensePhoto",undefined,undefined,i)' accept="image/*;capture=camera" type="file" id="saveImage">
              <img src="/static/img/del.png" v-if="licensePhoto[i]" :alt="$t( '删除' )" @click="del(i)" :title="$t( '删除' )" class="del" />
            </div>
            <div class="el-form-item__error" v-if="licensePhotoError" style="position:relative; ">{{$t( '许可证照片不能为空' )}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="add-license-btn">
            <el-button type="primary" size="mini" @click="addLicense">{{$t( '添加' )}}</el-button>
            <el-button type="danger" @click="delLicense" size="mini">{{$t( '删除' )}}</el-button>
          </div>
        </el-col>
        <el-col :span="24">
          <el-form-item label="logo" prop="logo" :class="{ 'is-required': true }">
            <div class="id-card">
              <img class="add-img logo" v-if="dataForm.logo" :src="dataForm.logo" />
              <div v-else class="add logo" src=""></div>
              <input @change='add_img($event,"logo",80,80)' class="logo" accept="image/*;capture=camera" type="file" id="saveImage">
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item :label="$t( '授权URL' )" prop="authUrl" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.authUrl" :placeholder="$t( '授权URL' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">

          <el-form-item class="force-word" :label="$t( '授权域名/IP' )">
            <div class="domainName" v-for="item,i in domainName">
              <el-input v-model="domainName[i]" :placeholder="$t( '授权域名/IP' )"></el-input>
            </div>
            <div class="el-form-item__error" v-if="domainNameError" style="position:relative; ">{{$t( '授权域名/IP不能为空' )}}</div>
            <div style="color: #666;font-size: 12px;">{{$t( 'http://或https://会被自动优化' )}}</div>
            <el-button type="primary" size="mini" @click="addDomainName">{{$t( '添加' )}} </el-button>
            <el-button type="danger" @click="delDomainName" size="mini">{{$t( '删除' )}}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t( '备注' )" prop="remark">
            <el-input v-model="dataForm.remark" :placeholder="$t( '备注' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="force-word" :label="$t( '是否允许信用卡' )" prop="creditCardStatus" :class="{ 'is-required': true }">
            <el-radio-group v-model="dataForm.creditCardStatus">
              <el-radio :label="0">{{$t( '是' )}}</el-radio>
              <el-radio :label="1">{{$t( '否' )}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '信用卡费率' )" prop="creditCardRate" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.creditCardRate" min="1" type="number" :placeholder="$t( '信用卡费率' )"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="12">
          <el-form-item class="force-word" :label="$t( '信用卡支付最小金额' )" prop="creditCardMin" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.creditCardMin" min="1" type="number" :disabled="dataForm.creditCardStatus!==0" :placeholder="$t( '信用卡支付最小金额' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="force-word" :label="$t( '信用卡支付最大金额' )" prop="creditCardMax" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.creditCardMax" min="1" type="number" :disabled="dataForm.creditCardStatus!==0" :placeholder="$t( '信用卡支付最大金额' )"></el-input>
          </el-form-item>
        </el-col>-->
        <!--<el-col :span="12">
          <el-form-item class="force-word" :label="$t( '是否允许借记卡' )" prop="debitCardStatus" :class="{ 'is-required': true }">
            <el-radio-group v-model="dataForm.debitCardStatus">
              <el-radio :label="0">{{$t( '是' )}}</el-radio>
              <el-radio :label="1">{{$t( '否' )}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>-->
        <el-col :span="12">
          <el-form-item :label="$t( '借记卡费率' )" prop="debitCardRate" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.debitCardRate" min="1" type="number" :placeholder="$t( '借记卡费率' )"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="12">
          <el-form-item class="force-word" :label="$t( '借记卡支付最小金额' )" prop="debitCardMin" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.debitCardMin" min="1" type="number" :disabled="dataForm.debitCardStatus!==0" :placeholder="$t( '借记卡支付最小金额' )"></el-input>
          </el-form-item>
        </el-col>-->
        <!--<el-col :span="12">
          <el-form-item class="force-word" :label="$t( '借记卡支付最大金额' )" prop="debitCardMax" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.debitCardMax" min="1" type="number" :disabled="dataForm.debitCardStatus!==0" :placeholder="$t( '借记卡支付最大金额' )"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="12">
          <el-form-item class="force-word" :label="$t( '应用是否可支付' )" prop="appCanPayStatus" :class="{ 'is-required': true }">
            <el-radio-group v-model="dataForm.appCanPayStatus">
              <el-radio :label="0">{{$t( '是' )}}</el-radio>
              <el-radio :label="1">{{$t( '否' )}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="force-word" :label="$t( '单笔消费最大额度' )" prop="singleConsumeMax" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.singleConsumeMax" min="1" type="number" :placeholder="$t( '单笔消费最大额度' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="force-word" :label="$t( '总消费最大额度' )" prop="totalConsumeMax" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.totalConsumeMax" min="1" type="number" :placeholder="$t( '总消费最大额度' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="force-word" :label="$t( '是否允许分账' )" prop="separateAccountsStatus" :class="{ 'is-required': true }">
            <el-radio-group v-model="dataForm.separateAccountsStatus">
              <el-radio :label="0">{{$t( '是' )}}</el-radio>
              <el-radio :label="1">{{$t( '否' )}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="force-word" :label="$t( '每日token限制倍数' )" prop="tokenLimitDay" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.tokenLimitDay" min="1" type="number" :placeholder="$t( '每日token限制倍数' )"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="force-word" :label="$t( '每日openid限制次数' )" prop="openidLimitDay" :class="{ 'is-required': true }">
            <el-input v-model="dataForm.openidLimitDay" min="1" type="number"  :placeholder="$t( '每日openid限制次数' )"></el-input>
            
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t( '应用类型' )" prop="applicationType" :class="{ 'is-required': true }">
            <el-radio-group v-model="dataForm.applicationType">
              <el-radio :label="0">H5</el-radio>
              <el-radio :label="1">app</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t( '取消' )}}</el-button>
      <el-button type="primary" @click="update">{{$t( '确定' )}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      var _self=this
      var validateCreditCardRate = (rule, value, callback) => {
        if(this.dataForm.creditCardStatus === 0) {
          if(Number(value)<0||Number(value)>1) {
            callback(new Error(this.$t(`输入值应大于0并不大于1`)));
          }
        }
        callback();
      };
      var validateDebitCardRate = (rule, value, callback) => {
        if(this.dataForm.debitCardStatus === 0) {
          if(Number(value)<0||Number(value)>1) {
            callback(new Error(this.$t(`输入值应大于0并不大于1`)));
          }
        }
        callback();
      };
      
      var validateCreditFee = (rule, value, callback) => {
        if(this.dataForm.creditCardStatus === 0) {
          if(value == "") {
            callback(new Error(this.$t(`选择"是"之后该项不能为空不能为空`)));
          }
        }
        callback();
      };
      var validateDebitFee = (rule, value, callback) => {
        if(this.dataForm.debitCardStatus === 0) {
          if(value == "") {
            callback(new Error(this.$t(`选择"是"之后该项不能为空不能为空`)));
          }
        }
        callback();
      };
      return {
        labelWidth:'148px',
        fullscreenLoading:false,
        options: [],
        visible: false,
        id: "",
        domainNameError:false,
        licensePhotoError:false,
        domainName: [""],
        licensePhoto: [""],
        dataForm: {
          account: "",
          name: "",
          corporateName: "",
          contactNumber: "",
          phone: "",
          address: "",
          email: "",
          idType: "",
          idNumber: "",
          remark: "",
          idPhotoOne: "",
          idPhotoTwo: "",
          logo: "",
          authUrl: "",
          creditCardRate: "",
//        creditCardMin: "",
//        creditCardMax: "",
          creditCardStatus: "",
          debitCardRate: "",
//        debitCardMin: "",
//        debitCardMax: "",
//        debitCardStatus: "",
          applicationType: "",
          separateAccountsStatus: "",
          licenseNumber: "",
          businessName: "",
          appCanPayStatus:"",
          singleConsumeMax:"",
          totalConsumeMax:"",
        },
        receivePicUrl: "",
        value1: "",
        dataRule: {
          account: [{
            required: true,
            message: this.$t('绑定账号不能为空'),
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: this.$t('第三方应用名称不能为空'),
            trigger: 'blur'
          }],
          corporateName: [{
            required: true,
            message: this.$t('负责人不能为空'),
            trigger: 'blur'
          }],
          contactNumber: [{
            required: true,
            message: this.$t('联系电话不能为空'),
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: this.$t('手机号不能为空'),
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: this.$t('详细地址不能为空'),
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: this.$t('电子邮箱不能为空'),
            trigger: 'blur'
          }],
          idType: [{
            required: true,
            message: this.$t('证件类型不能为空'),
            trigger: 'blur'
          }],
          idNumber: [{
            required: true,
            message: this.$t('证件号码不能为空'),
            trigger: 'blur'
          }],
          idPhotoOne: [{
            required: true,
            message: this.$t('请上传证件正面'),
            trigger: 'blur'
          }],
          idPhotoTwo: [{
            required: true,
            message: this.$t('请上传证件背面'),
            trigger: 'blur'
          }],
          logo: [{
            required: true,
            message: this.$t('logo不能为空'),
            trigger: 'blur'
          }],
          authUrl: [{
            required: true,
            message: this.$t('授权url不能为空'),
            trigger: 'blur'
          }],
          businessName: [{
            required: true,
            message: this.$t('商家名称不能为空'),
            trigger: 'blur'
          }],
          licenseNumber: [{
            required: true,
            message: this.$t('营业执照号码不能为空'),
            trigger: 'blur'
          }],
          creditCardStatus: [{
            required: true,
            message: this.$t('请选择是否允许信用卡'),
            trigger: 'blur'
          }],
//        debitCardStatus: [{
//          required: true,
//          message: this.$t('请选择是否允许借记卡'),
//          trigger: 'blur'
//        }],
          creditCardRate: [{
            validator: validateCreditFee,
            trigger: 'blur'
          },{
            validator: validateCreditCardRate,
            trigger: 'blur'
          }
          ],
//        creditCardMin: [{
//          validator: validateCreditFee,
//          trigger: 'blur'
//        }],
//        creditCardMax: [{
//          validator: validateCreditFee,
//          trigger: 'blur'
//        }],
          debitCardRate: [{
            validator: validateDebitFee,
            trigger: 'blur'
          },{
            validator: validateDebitCardRate,
            trigger: 'blur'
          }],
//        debitCardMin: [{
//          validator: validateDebitFee,
//          trigger: 'blur'
//        }],
//        debitCardMax: [{
//          validator: validateDebitFee,
//          trigger: 'blur'
//        }],
          separateAccountsStatus: [{
            required: true,
            message: this.$t('是否允许分账不能为空'),
            trigger: 'blur'
          }],
          applicationType: [{
            required: true,
            message: this.$t('应用类型不能为空'),
            trigger: 'blur'
          }],
          tokenLimitDay: [{
            required: true,
            message: this.$t('每日token限制倍数不能为空'),
            trigger: 'blur'
          }],
          openidLimitDay: [{
            required: true,
            message: this.$t('每日openid限制次数'),
            trigger: 'blur'
          }],
          appCanPayStatus:[{
            required: true,
            message: this.$t( 'messages.template3',[this.$t('应用是否可支付')] ),
            trigger: 'blur'
          }],
          singleConsumeMax:[{
            required: true,
            message: this.$t( 'messages.template3',[this.$t('单笔消费最大额度')] ),
            trigger: 'blur'
          }],
          totalConsumeMax:[{
            required: true,
            message: this.$t( 'messages.template3',[this.$t('总消费最大额度')] ),
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      authUrl() {
        return this.dataForm.authUrl
      },
    },
    mounted(){
      switch(window.localStorage.language){
        
          case 'zh-cn':this.labelWidth='148px';break;
          case 'en':this.labelWidth='148px';break;
        }
      this.$forceUpdate()
    },
    watch: {
       domainName(val){
         val.forEach((item,i)=>{
           if(item.match("https://")||item.match("http://")){
          this.domainName[i]=this.domainName[i].replace("https://","")
          this.domainName[i]=this.domainName[i].replace("http://","")
        }
         })
        
        },
    },
    methods: {
      del(index){
          this.licensePhoto.splice(index,1)
          if(index==0&&this.licensePhoto.length<1){
            this.licensePhoto.push("")
          }
      },
      delLicense() {
        if(this.licensePhoto.length>1){
          this.licensePhoto.pop()
        }
      },
      addLicense() {
        this.licensePhoto.push("")
      },
      delDomainName() {
        if(this.domainName.length>1){
          this.domainName.pop()
        }
      },
      addDomainName() {
        this.domainName.push("")
      },
      update() {
        
        this.$refs['dataForm'].validate((valid) => {
          if(!this.licensePhoto[0]){
              this.licensePhotoError=true
              return;
            }else{
              this.licensePhotoError=false
            }
            if(!this.domainName[0]){
              this.domainNameError=true
              return;
            }else{
              this.domainNameError=false
            }
          if(valid) {
            this.fullscreenLoading = true;
            var dataForm = this.dataForm
//          dataForm.domainName = JSON.stringify(dataForm.domainName)
//          dataForm.licensePhoto = JSON.stringify(dataForm.licensePhoto)
            
            this.$http({
              url: this.$http.adornUrl(`/sys/application/${!this.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                id: this.id ? this.id : undefined,
                ...dataForm,
                domainName:JSON.stringify(this.domainName),
                licensePhoto:JSON.stringify(this.licensePhoto),
              })
            }).then(({
              data
            }) => {
              
              this.fullscreenLoading = false;
              if(data && data.code === 0) {
                this.$parent.getDataList()
                this.visible = false
              } else {
                this.$alert(data.msg, this.$t('提示'), {
                  confirmButtonText: this.$t('确定'),
                });
              }
            })
          }
        });

      },
      init(id) {
        this.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.domainName=[""]
          this.licensePhoto=[""]
          this.$refs['dataForm'].resetFields()
        })
        this.$http({
          url: this.$http.adornUrl(`/sys/application/getIdType`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({
          data
        }) => {
          if(data && data.code === 0) {
            data.idType.forEach((item,i)=>{
              data.idType[i].label=this.$t(item.label)
            })
            this.options = data.idType;
          } else {
            this.$alert(data.msg, this.$t('提示'), {
              confirmButtonText: this.$t('确定'),
            });
          }
        })
        if(this.id) {
          this.$http({
            url: this.$http.adornUrl(`/sys/application/info/${this.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({
            data
          }) => {
            if(data && data.code === 0) {
              this.domainName = JSON.parse(data.application.domainName)
              this.licensePhoto = JSON.parse(data.application.licensePhoto)
              this.dataForm = data.application;
            } else {
              this.$alert(data.msg, this.$t('提示'), {
                confirmButtonText: this.$t('确定'),
              });
            }
          })
        }
      },
      add_img1(event, name, width, height, index) {
        var reader = new FileReader();
        var AllowImgFileSize = 500 * 1024; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var file = event.target.files[0]
        var imgUrlBase64;
        if(file) {
          //将文件以Data URL形式读入页面
          imgUrlBase64 = reader.readAsDataURL(file);
          reader.onload = (e) => {
            //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
            if(AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
              this.$alert(this.$t('上传失败，请上传不大于500k的图片!'), this.$t('提示'), {
                  confirmButtonText: this.$t('确定'),
                });
              return;
            }
            this.canvasDataURL(reader.result, {
              quality: 0.6,
              type: file.type,
              width,
              height
            }, (base64Codes) => {
              if(index !== undefined) {
                var data = this[name]
                data[index] = base64Codes
                this[name] = data;
                this.$forceUpdate()
              } else {
                this[name] = base64Codes;
              }
            })
          }
        }

      },
      // 上传图片
      add_img(event, name, width, height, index) {
        var reader = new FileReader();
        var AllowImgFileSize = 500 * 1024; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var file = event.target.files[0]
        var imgUrlBase64;
        if(file) {
          //将文件以Data URL形式读入页面
          imgUrlBase64 = reader.readAsDataURL(file);
          reader.onload = (e) => {
            //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
            if(AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
             this.$alert(this.$t('上传失败，请上传不大于500k的图片!'), this.$t('提示'), {
                  confirmButtonText: this.$t('确定'),
                });
              return;
            }
            this.canvasDataURL(reader.result, {
              quality: 0.6,
              type: file.type,
              width,
              height
            }, (base64Codes) => {
              if(index !== undefined) {
                var data = this.dataForm[name]
                data[index] = base64Codes
                this.dataForm[name] = data;
                this.$forceUpdate()
              } else {
                this.dataForm[name] = base64Codes;
              }
            })
          }
        }

      },
      canvasDataURL(path, obj, callback) {
        var img = new Image();
        img.src = path;
        img.onload = function() {
          var that = this;
          // 默认按比例压缩
          var w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          var quality = 1; // 默认图片质量为0.7
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL(obj.type, quality);
          // 回调函数返回base64的值
          callback(base64);
        }
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .id-card {
    position: relative;
    margin-bottom: 10px;
    .del{position: absolute;right: 5px;top: 5px;width: 24px;cursor: pointer;opacity: 0.8;}
    .add {
      width: 100%;
      height: 200px;
      background-image: url(/static/img/ic_add_icon@2x.png);
      background-repeat: no-repeat;
      background-color: #f0f0f0;
      background-position: center center;
    }
    .add-img {
      max-width: 100%;
    }
    input {
      appearance: none;
      position: absolute;
      width: 100%;
      height: 200px;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
    .logo {
      width: 80px;
      height: 80px;
    }
  }
  
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  
  .domainName {
    margin-bottom: 10px;
  }
  
  .add-license-btn {
    height: 200px;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
</style>