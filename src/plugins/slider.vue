<template>
  <div class="slider" ref="slider" style="width:400px" @click.capture="timeClick($event)">
    <div class="process" :style="{width}"></div>
    <div class="thunk" ref="trunk" :style="{left}">
      <div class="block"></div>
    </div>
  </div>
  <!--<div>-->
    <!--<div class="dragnum dragbox" @mousemove="timeMove($event)" @mouseleave="timeEnd($event)" ref="dragbox">-->
      <!--<div class="progress" @click="timeClick($event)">-->
        <!--<div class="progressbar" :style="{width:distance+'px'}">-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="bardrag" @mousedown="timeDown($event)" @mouseup="timeEnd($event)" :style="{left:distance+'px'}">-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</template>
<script>
  /*
  * min 进度条最小值
  * max 进度条最大值
  * v-model 对当前值进行双向绑定实时显示拖拽进度
  * */
  export default {
    // data (){
    //   return{
    //     pos: {},
    //     startX: null,
    //     locked: false,
    //     distance: 0, //当前位置
    //     endDistance: 0, //上次操作结束位置
    //     dragWidth: 0, //进度条宽度
    //     startNum: 10,
    //     endNum: 50,
    //     nowNum: 10
    //   }
    // },
    // methods: {
    //   mousePos (e) {
    //     var pos = {}
    //     pos.x = e.pageX
    //     this.pos = pos
    //     return pos
    //   },
    //   timeDown (e) { // 当鼠标指针移动到元素上方，并按下鼠标左键时
    //     this.mousePos(e)
    //     this.startX = this.pos.x
    //     this.locked = true
    //     this.endDistance = this.distance
    //     // console.log(this.pos);
    //   },
    //   timeMove (e) { // 当鼠标指针移动到元素上方移动时
    //     if (!this.locked) return
    //     var pos = this.mousePos(e)
    //     var moveX = pos.x - this.startX
    //     if (this.distance >= this.dragWidth) {
    //       this.distance = this.dragWidth - 10
    //     } else {
    //       if ((this.distance <= 0 && moveX < 0) || (this.distance >= this.dragWidth && moveX > 0)) return
    //       this.distance = this.endDistance + moveX
    //       this.countNum(this.distance)
    //     }
    //   },
    //   timeEnd (e) {
    //     this.locked = false
    //   },
    //   timeClick (e) { //点击拖动到指定位置
    //     var x = e.offsetX,
    //       moveX = x - this.distance
    //     this.distance += moveX
    //     this.countNum(this.distance)
    //
    //   },
    //   countNum (num) {
    //     var len = this.endNum - this.startNum
    //     var scale = Math.ceil(this.dragWidth / len)
    //     this.nowNum = this.startNum + Math.ceil(num / scale)
    //   }
    //
    // },
    // mounted () {
    //   this.dragWidth = this.$refs.dragbox.width
    //   console.log(this.dragWidth)
    // },
    props: ['min', 'max', 'value',],
    data () {
      return {
        slider: null,        //滚动条DOM元素
        thunk: null,         //拖拽DOM元素
        per: 0,     //当前值
      }
    },
    // 渲染到页面的时候
    mounted () {
      this.slider = this.$refs.slider
      this.thunk = this.$refs.trunk
      var _this = this
      this.thunk.onmousedown = function (e) {
        var width = parseInt(_this.width)
        var disX = e.clientX
        document.onmousemove = function (e) {
          var newWidth = e.clientX - disX + width
          // 拖拽的时候得到新的百分比
          var scale = newWidth / _this.slider.offsetWidth
          _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min)
          _this.per = Math.max(_this.per, _this.min)
          _this.per = Math.min(_this.per, _this.max)
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
        return false
      }
    },
    computed: {
      scale () {
        return (this.per - this.min) / (this.max - this.min)
      },
      width () {
        if (this.slider) {
          return this.slider.offsetWidth * this.scale + 'px'
        } else {
          return 0 + 'px'
        }
      },
      left () {
        if (this.slider) {
          return this.slider.offsetWidth * this.scale - this.thunk.offsetWidth / 2 + 'px'
        } else {
          return 0 + 'px'
        }
      }
    },
    watch:{
      scale(v){
        console.log(v)
      }
    },
    methods:{
      timeClick(e){
       // this.per = e.offsetX / this.slider.offsetWidth *100
        var scale = e.offsetX / this.slider.offsetWidth
        this.per = Math.ceil((this.max - this.min) * scale + this.min)
        this.per = Math.max(this.per, this.min)
        this.per = Math.min(this.per, this.max)
      },
    },
  }
</script>
<style>
  .slider {
    position: relative;
    margin: 20px 0;
    height: 10px;
    background: #e4e7ed;
    border-radius: 5px;
    cursor: pointer
  }
  .slider .process {
    position: absolute;
    left: 0;
    top: 0;
    width: 112px;
    height: 10px;
    border-radius: 5px;
    background: #409eff
  }
  .slider .thunk {
    position: absolute;
    left: 100px;
    top: -7px;
    width: 20px;
    height: 20px
  }
  .slider .block {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #409eff;
    background: rgba(255, 255, 255, 1);
  }
  .slider .block:hover {
    transform: scale(1.1);
    opacity: .6
  }

  .dragbox {
    width: 200px;
    position: relative;
    height: 4px;
    background-color: #f5f5f5;
    border-radius: 1.5px;
  }

  .progress {
    position: absolute;
    left: 0;
    top: 0;
    background: #a7a7a7;
    height: 4px;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 1.5px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
  }

  .progressbar {
    position: absolute;
    background-color: #337ab7;
    float: left;
    width: 0;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);

  }

  .bardrag {
    position: absolute;
    top: -6px;
    left: 10px;
    display: inline-block;
    height: 13px;
    width: 14px;
    border-radius: 50%;
    background-color: #337ab7;
    border: 1px solid #e1e0de;
    cursor: pointer;
  }

</style>
