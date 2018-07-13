<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="添加商品" class="miaobao"></my-breadcrumb>
        <el-alert
        title="添加商品信息"
        type="info"
        center  class="alertmessage"
        show-icon>
      </el-alert>
        <!-- 步骤条 -->
        <el-steps :active="active" finish-status="success" align-center class="buzhou">
          <el-step title="基本信息"></el-step>
          <!-- <el-step title="商品参数"></el-step> -->
          <!-- <el-step title="商品属性"></el-step> -->
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
        </el-steps>
      <!-- 导航栏 -->
      <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="left">
        <el-tab-pane label="基本信息" name="1">
            <el-form ref="form" :model="form" label-width="80px" style="width:600px">
              <el-form-item label="商品名称">
                <el-input v-model="form.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格">
                <el-input v-model="form.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量">
                <el-input v-model="form.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量">
               <el-input v-model="form.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <Categorycasder type="3" @changecate="handlechangecate"></Categorycasder>
              </el-form-item>
               <!-- <el-form-item>
                  <el-button type="primary" @click="handelAddGood">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item> -->
            </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="商品参数" name="2"></el-tab-pane> -->
        <!-- <el-tab-pane label="商品属性" name="3"></el-tab-pane> -->
        <el-tab-pane label="商品图片" name="2">

        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload/"
          auto-upload :headers="headerstoken"
          :on-success="handelsuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="handlebefore"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="3">
          <el-row>
            <el-col :span="4"><el-button type="primary" @click="handelAddGood">立即创建</el-button></el-col>
          </el-row>

          <quill-editor v-model="form.goods_introduce"
                ref="myQuillEditor" style="margin-top:10px;height:300px;"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
           </quill-editor>
        </el-tab-pane>
      </el-tabs>

   </el-card>
</template>

<script>
import Categorycasder from '@/components/Categorycasder'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
const token = sessionStorage.getItem('token')
export default {
    data () {
      return {
        active: 0,
        activeName: "1",
        form: {
          goods_name: '',
          goods_price: '',
          goods_weight: '',
          goods_number: '',
          goods_cat: '',
          goods_introduce: '',
          pics: []
        },
        fileList: [],
        headerstoken: {Authorization:token}
      }
    },
    methods: {
      // next() {
      //   if (this.active++ > 4) this.active = 0
      //   if (this.activeName++ > 5) this.activeName = 1
      // },
       handleClick(tab, event) {
        console.log(tab, event)
        // if (this.active++ > 2) this.active = 0
        // if (this.activeName++ > 3) this.activeName = 1
      },
      handlechangecate (data) {
        this.form.goods_cat = data.join(',')
      },

      async handelsuccess (esponse, file, fileList) {
        console.log(file)
       const {data, meta: {status, msg}} = file.response
      //  console.log(data)
      this.form.pics.pic = data.tmp_path
      if (status === 200 ) {
        this.$message.success(msg)
        console.log(this.form.pics)
      } else {
        this.$message.error(msg)
      }

      },
      async handelAddGood () {
        const res = await this.$http.post('goods',this.form)
        const {data, meta} = res.data

        if (meta.status === 400) {
          this.$message.error(meta.msg)
        } else if (meta.status === 201) {
          this.$message.success(meta.msg)
          // this.$router.push({name:'goods'})
          console.log(res)
        }
      },
      // 富文本编辑器方法
      onEditorBlur () {
        console.log('onEditorBlur')
       },
      onEditorFocus () {
         console.log('onEditorFocus')
      },
      onEditorReady () {
        console.log('onEditorReady')
       },
      // 文件上传的方法
      handleRemove(file, fileList) {
        console.log(file, fileList)

      },
      handlePreview(file) {
        console.log(file)
      },
      handlebefore () {
        // const token = sessionStorage.getItem('token')
        // console.log(token)
      }
    },
    components: {
    Categorycasder,
    quillEditor
  }
}
</script>

<style>
.box-card{
   height: 100%;
   overflow: auto;
}
.miaobao {
  margin: 10px 0  10px 0 ;
}
.alertmessage{
  margin-bottom: 15px;
}
.buzhou {
  margin-bottom: 20px;
}
</style>
