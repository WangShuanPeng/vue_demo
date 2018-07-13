<template>
  <el-cascader
  expand-trigger="hover"
      :options="optionslist"
      :props="props"
      slot-scope="scope"
      @change="handleChange"
      change-on-select
       v-model="selectedOptions"
      >
    </el-cascader>
</template>

<script>
export default {
  props: {
    type: {
      type: [String, Number],
      default: 2
    }
  },
 async created() {
    const {data: resData} = await this.$http.get(`categories?type=${this.type}`)
    const {data} = resData
    this.optionslist = data
  },
  data () {
    return {
       optionslist: [],
      // selectedOptions: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      selectedOptions: []
    }
  },
  methods: {
    handleChange () {
      // console.log(this.selectedOptions)
      // 外部可以使用这个获取 的数组
      this.$emit('changecate',this.selectedOptions)
    }
  }
}
</script>

<style>

</style>
