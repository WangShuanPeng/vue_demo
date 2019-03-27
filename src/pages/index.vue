<template>
    <div>跳转到
    <router-link to='flex'>zrender</router-link>
    <router-link to='canvas'>zrender</router-link>
      <slider :min=0 :max=100 v-model="per"></slider>
    </div>
</template>

<script>
  import slider from '../plugins/slider.vue'
export default {
  data() {
    return {
      per:0
    }
  },
  components:{
    slider
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
