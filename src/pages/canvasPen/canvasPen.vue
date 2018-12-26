<template>
    <div id="CanvasPen-content">
      <div class="CanvasPen-left">
        <canvas id="tutorial" width="1500" height="900"></canvas>
      </div>
      <div class="CanvasPen-right">
        <button @click="getCanvasImg">获取图形</button>
        <ul>
          <li v-for="item in imgUrl">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'canvasPen',
    data(){
      return {
        imgUrl: []
      }
    },
    mounted() {
      let el = document.getElementById('tutorial');
      let ctx = el.getContext('2d')
      let isDrawing;

      el.onmousedown = function (e) {
        isDrawing = true
        ctx.lineWidth = 10;
        ctx.lineJoin = ctx.lineCap = 'round'
        ctx.moveTo(e.clientX, e.clientY)
      }
      el.onmousemove = function (e) {
        if (isDrawing) {
          ctx.lineTo(e.clientX, e.clientY)
          ctx.stroke()
        }
      }
      el.onmouseup = function () {
        isDrawing = false;
      }
    },
    methods:{
      getCanvasImg(){
        let image = new Image();
        let el = document.getElementById('tutorial');
        image.src = el.toDataURL("image/png");
        this.imgUrl.push(image.src)
      }
    }
  }
</script>

<style scoped>
  #CanvasPen-content {
    width: 100%;
    height: 100%;
  }
  .CanvasPen-left{
    width: 80%;
    height: 100%;
    float: left;
  }
  .CanvasPen-right{
    width: 20%;
    height: 100%;
    float: left;
  }
  button{
    margin-bottom: 10px;
  }
  li{
    float: left;
    border: 1px solid rgba(0,0,0,0.8);
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  img{
    width: 50px;
    height: 50px;
  }
  #tutorial{
    border: 1px springgreen  solid;
    cursor: Crosshair;
  }
</style>
