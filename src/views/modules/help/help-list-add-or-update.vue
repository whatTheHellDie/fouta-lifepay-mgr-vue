<template>
   <el-dialog :title="!dataForm.id ? '新增' : '修改'" v-loading.fullscreen.lock="fullscreenLoading" :close-on-click-modal="false" :visible.sync="visible" top="5vh" custom-class="wew" width="80%">
    <div>
  <div class="mod-demo-ueditor">
<el-form ref="dataForm"  :rules="dataRules" :model="dataForm" label-width="80px">
  
  <el-form-item :label="$t( '标题' )" prop="title">
    <el-input v-model="dataForm.title" :placeholder="$t( '请输入标题' )"></el-input>
  </el-form-item>
  <el-form-item :label="$t( '分类' )" prop="classifyId">
    <el-select v-model="dataForm.classifyId" :placeholder="$t('请选择')">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      
  </el-form-item>
  <el-form-item :label="$t( '内容' )" prop="content">
    <editor v-model="dataForm.content" :init="editorInit"></editor>
  </el-form-item>
  <el-form-item :label="$t( '语言' )" prop="language">
    <el-radio-group v-model="dataForm.language">
              <el-radio :label="'fr_FR'">Français</el-radio>
              <el-radio :label="'en_US'">English</el-radio>
              <el-radio :label="'zh_CN'">中文</el-radio>
            </el-radio-group>
  </el-form-item>
  <el-form-item >
      
      
  </el-form-item>
</el-form>

  </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t( '取消' )}}</el-button>
      <el-button type="primary" @click="update">{{$t( '确定' )}}</el-button>
    </span>
    </el-dialog>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/link'
import 'tinymce/plugins/preview'
  export default {
    data() {
      return {
        fullscreenLoading:false,
        visible:false,
        dataForm:{
          id:"",
          title:"",
          content:"",
          language:"",
          classifyId:""
        },
        options:[],
        dataRules: {
          title: [
            { required: true, message: this.$t( '标题不能为空' ), trigger: 'blur' }
          ],
          content: [
            { required: true, message: this.$t( '内容不能为空' ), trigger: 'change' }
          ],
          language: [
            { required: true, message: this.$t( '语言不能为空' ), trigger: 'blur' }
          ],
        },
//       editorInit: {
//      language_url: '/static/tinymce/langs/zh_CN.js',
//      language: 'zh_CN',
////      skin_url: '/static/tinymce/skins/lightgray',
//      base_url: '/static/tinymce/',
//      height: 300,
//      plugins: 'lists image media table textcolor wordcount contextmenu link preview',
//      toolbar: 'undo redo |  formatselect | bold italic | textcolor forecolor |  alignleft aligncenter alignright alignjustify | fontselect fontsizeselect backcolor link | bullist numlist outdent indent | lists image media table | preview removeformat',
//      branding: false,
//      menubar: false,
//      //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
//      //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
//      images_upload_handler: (blobInfo, success, failure) => {
//        const img = 'data:image/jpeg;base64,' + blobInfo.base64()
//        success(img)
//      }
//    },
       myValue: ""
      }
    },
    computed:{
      editorInit(){
        var lang=this.$getLang()
        switch(lang){
          case 'zh-cn':lang='zh_CN';break;
          case 'fr':lang='fr_FR';break;
          case 'en':lang=undefined;
        }
        return {
        language_url: `/static/tinymce/langs/${lang}.js`,
        language: lang,
//      skin_url: '/static/tinymce/skins/lightgray',
        base_url: '/static/tinymce/',
        height: 300,
        plugins: 'lists image media table textcolor wordcount contextmenu link preview',
        fontsize_formats: "10px 12px 14px 18px 20px 22px 24px 36px",
        toolbar: 'undo redo |  formatselect | bold italic | textcolor forecolor |  alignleft aligncenter alignright alignjustify | fontselect fontsizeselect backcolor link | bullist numlist outdent indent | lists image media table | preview removeformat',
        branding: false,
        menubar: false,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      }
      }
    },
    components:{
      Editor
    },
//  activated(){
//    this.init()
//  },
//  deactivated(){
//tinymce.remove()
//},
destroyed() {
      tinymce.remove()
    },
    watch: {
      visible(val) {
        if(!val) {
          tinymce.remove()
          this.$parent.addOrUpdateVisible = false;
          this.$parent.getDataList()
        }
      }
    },
    methods: {
      update(){
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            var head=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title></title><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /><style type="text/css">img {max-width: 100% !important;}body {background: #eeeff3;margin: 0;}.rich-text-box{margin: 20px;background: #fff;border-radius: 5px;padding: 0 20px;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);}.rich-text-title{display:flex;padding: 30px 20px;margin: 0 -20px;border-bottom: 2px solid #ececec;font-size: 28px;color: #2c2c2c;}.rich-text-content{padding: 10px 0;}</style></head>
<body><div class="rich-text-box"><div class="rich-text-title">${this.dataForm.title}</div><div class="rich-text-content">`
            var foot=`</div></div></body></html>`
            this.fullscreenLoading=true
            this.$http({
            url: this.$http.adornUrl(`/sys/help/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              id:this.dataForm.id?this.dataForm.id:undefined,
              title:this.dataForm.title,
              content:head+this.dataForm.content+foot,
              language:this.dataForm.language,
              classifyId:this.dataForm.classifyId,
            })
          }).then(({data}) => {
            this.fullscreenLoading=false
            if (data && data.code === 0) {
              this.visible=false;
            } else {
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
            });
          }
          })
        }
        });
      },
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
          this.$http({
            url: this.$http.adornUrl(`/sys/help/getClassify`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              data.classify.forEach((item,i)=>{
                data.classify[i].label=this.$t(item.label)
              })
              this.options=data.classify
            } else {
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
            });
          }
          })
        if (!this.dataForm.id) {
          
        }else{
          this.$http({
            url: this.$http.adornUrl(`/sys/help/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.title=data.help.title
              var content=data.help.content;
              var first=content.indexOf(`rich-text-content">`)+19;
              var end=content.indexOf('</div></div></body></html>');
              data.help.content=content.slice(first,end)
              this.dataForm.content=data.help.content
              this.dataForm.language=data.help.language
              this.dataForm.classifyId=data.help.classifyId
            } else {
            this.$alert(data.msg, this.$t( '提示' ), {
              confirmButtonText: this.$t( '确定' ),
            });
          }
          })
        }
      },
      dataFormSubmit(){
        
      }
    }
  }
</script>

<style lang="scss">
</style>