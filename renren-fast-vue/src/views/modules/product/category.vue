<template>
  <div>
    test
  </div>
</template>
<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      getMenus(){
        this.$http({
          url:this.$http.adornUrl('/product/category/list/tree'),
          method:'get'
        }).then(response=>{
          console.log(response)
        })
      }
    },
    computed: {},
    watch: {},
    created() {
        this.getMenus()
    }
  }
</script>
<style scoped>
</style>
