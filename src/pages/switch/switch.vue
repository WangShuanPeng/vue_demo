<template>
  <ul>
    <li v-for="item in tempData">
      <img :src="item.designTemplateImageUrl" alt="">
    </li>
  </ul>
</template>

<script>
  import templist from './templist.json'
export default {
  name: 'switch',
  data(){
    return {
      tempData: [],

    }
  },
  mounted(){
    this.tempData = templist
  }
}
function _switchLeft () {

}
</script>

<style scoped>

</style>
