<template>
  <div id="flex-content">
    <div id="left"></div>
    <div class="right">
      <button @click="addZrenderText">艺术字</button>
      <input type="text" v-model="zrenderText">
      <button @click="addZrenderMan">小红人</button>
    </div>
  </div>
</template>

<script>
  import zrender from 'zrender'

  export default {
    name: 'flex',
    data () {
      return {
        zrenderText: 'zrender'
      }
    },
    mounted () {
      this.addRandomBubbles()
    },
    methods: {
      addZrenderText () {
        let box = document.getElementById('left')
        let zr = zrender.init(box)
        console.log(zr)
        var w = zr.getWidth();
        var h = zr.getHeight();

        var t1 = new zrender.Text({
          style: {
            text: this.zrenderText,
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fontSize: 200,
            fontFamily: 'Lato',
            fontWeight: 'bolder',
            textFill: '#0ff',
            blend: 'lighten'
          },
          position: [w / 2 + 5, h / 2]
        });
        zr.add(t1);

        var t2 = new zrender.Text({
          style: {
            text: this.zrenderText,
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fontSize: 200,
            fontFamily: 'Lato',
            fontWeight: 'bolder',
            textFill: '#f0f',
            blend: 'lighten'
          },
          position: [w / 2, h / 2]
        });
        zr.add(t2);

        var lines = [];
        for (var i = 0; i < 16; ++i) {
          var line = new zrender.Rect({
            shape: {
              x: w * (Math.random() - 0.3),
              y: h * Math.random(),
              width: w * (Math.random() + 0.3),
              height: Math.random() * 8
            },
            style: {
              fill: ['#ff0', '#f0f', '#0ff', '#00f'][Math.floor(Math.random() * 4)],
              blend: 'lighten',
              opacity: 0
            }
          });
          zr.add(line);
          lines.push(line);
        }

        setInterval(function () {
          if (Math.random() > 0.2) {
            t2.attr('position', [w / 2 + Math.random() * 50, h / 2]);

            for (var i = 0; i < lines.length; ++i) {
              lines[i].attr('shape', {
                x: w * Math.random(),
                y: h * Math.random(),
                width: w * Math.random(),
                height: Math.random() * 8
              });
              lines[i].attr('style', {
                opacity: 1
              });
            }

            setTimeout(function () {
              t2.attr('position', [w / 2, h / 2]);


              for (var i = 0; i < lines.length; ++i) {
                lines[i].attr('style', {
                  opacity: 0
                });
              }
            }, 100);
          }
        }, 500);
      },
      addZrenderMan () {
        let box = document.getElementById('left')
        let zr = zrender.init(box)
        let c1 = new zrender.Circle({
          shape: {
            cx: 150,
            cy: 50,
            r: 35
          },
          style: {
            fill: '#F00',
            stroke: '#F00'

          }
        })
        zr.add(c1)
        let l1 = new zrender.Rect({
          shape: {
            x: 150,
            y: 80,
            width: 5,
            height: 100
          },
          style: {
            fill: '#F00',
            blend: 'lighten',
            radius: 5
          }
        })
        zr.add(l1)

        let l2 = new zrender.Line({
          shape: {
            x1: 150,
            y1: 180,
            x2: 100,
            y2: 230

          },
          style: {
            lineWidth: 5,
            lineCap: 'round',
            stroke: '#f01'
          }

        })
        l2.animate('shape', true)
          .when(500, {
            x2: 200
          })
          .when(1000, {
            x2: 100
          })
          .start()
        zr.add(l2)
        let l3 = new zrender.Line({
          shape: {
            x1: 150,
            y1: 180,
            x2: 200,
            y2: 230

          },
          style: {
            lineWidth: 5,
            lineCap: 'round',
            stroke: '#f02'
          }
        })
        l3.animate('shape', true)
          .when(500, {
            x2: 100
          })
          .when(1000, {
            x2: 200
          })
          .start()
        zr.add(l3)
        let l4 = new zrender.Line({
          shape: {
            x1: 150,
            y1: 100,
            x2: 100,
            y2: 150

          },
          style: {
            lineWidth: 5,
            lineCap: 'round',
            stroke: '#f03'
          }
        })
        l4.animate('shape', true)
          .when(500, {
            x2: 200
          })
          .when(1000, {
            x2: 100
          })
          .start()
        zr.add(l4)
        let l5 = new zrender.Line({
          shape: {
            x1: 150,
            y1: 100,
            x2: 200,
            y2: 150

          },
          style: {
            lineWidth: 5,
            lineCap: 'round',
            stroke: '#f04'
          }
        })
        l5.animate('shape', true)
          .when(500, {
            x2: 100
          })
          .when(1000, {
            x2: 200
          })
          .start()
        zr.add(l5)
      },
      addRandomBubbles () {
        let box = document.getElementById('left')
        let zr = zrender.init(box)

        let w = zr.getWidth()
        let h = zr.getHeight()
        let r = 30
        let c1 = new zrender.Circle({
          shape: {
            cx: r,
            cy: h / 2,
            r: r
          },
          position: [
            (w * 0.6 - r * 2) * Math.random() + r + w * 0.2,
            (h * 0.6 - r * 2) * Math.random() + r + h * 0.2
          ],
          style: {
            fill: 'transparent',
            stroke: '#FF6EBE'
          },
          draggable: true
        }).on('click', function () {

        })
        zr.add(c1)
        setInterval(function () {
          if (Math.random() > 0.2) {
            c1.attr('position', [Math.floor(Math.random() * (w - 1)) + 1,Math.floor(Math.random() * (h - 1)) + 1])
          }

        }, 500)

      }
    }
  }
</script>

<style scoped>
  #flex-content {
    width: 100%;
    height: 100%;
  }

  #left {
    width: 80%;
    height: 100%;
    /*background-color: rgb(51, 51, 51);*/
    float: left;
  }

  .right {
    float: left;
    width: 20%;
    height: 100%;
    background-color: #6b6b6b;
  }

</style>
