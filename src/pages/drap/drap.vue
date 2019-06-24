<template>
    <div class="dropZone" :class="isloading?'loading':''">

    </div>
</template>

<script>
  export default {
    name: 'drap',
    data(){
      return {
        isloading:false
      }
    },
    mounted(){
      let  dropZone = document.querySelector('.dropZone');
      let _this = this
      dropZone.addEventListener("dragenter", function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this.isloading = true
      }, false);

      dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this.isloading = true
      }, false);

      dropZone.addEventListener("dragleave", function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this.isloading = false
      }, false);

      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        e.stopPropagation();


        var df = e.dataTransfer;
        var dropFiles = []; // 存放拖拽的文件对象

        if(df.items !== undefined) {
          // Chrome有items属性，对Chrome的单独处理
          for(var i = 0; i < df.items.length; i++) {
            var item = df.items[i];
            // 用webkitGetAsEntry禁止上传目录
            if(item.kind === "file" && item.webkitGetAsEntry().isFile) {
              var file = item.getAsFile();
              dropFiles.push(file);
            }
          }
        }
        _this.isloading = false
        console.log(dropFiles)
      })
    }

  }
</script>

<style scoped>

  .dropZone{
    width: 1200px;
    height: 600px;
    background-color: #ccc;
  }
  .loading{
    background-color: #07AEFC;
  }
</style>
