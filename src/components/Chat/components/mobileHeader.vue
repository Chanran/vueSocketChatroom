<template>
  <header class="mobile-header">
    <a href="javascript:void(0)" class="menubtn"  @click="clickMenu"></a>
    <slot name="title"></slot>
  </header>
</template>
<style scoped lang="less">
  .mobile-header{
    min-height: 50px;
    /*height: 10%;*/
    background-color: #2E3238;
    box-sizing: border-box;
    padding: 0 10px;
    text-align: center;
    position: relative;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 50px;
    display: none;
    .menubtn{
      position: absolute;
      width: 24px;
      height: 24px;
      background: url("../../../../static/images/menu.png") no-repeat;
      left: 10px;
      top: 50%;
      margin-top: -12px;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        content: '',
        isActive: false
      };
    },
    methods: {
      clickMenu(){
        this.$emit('triggerSidebar');
      }
    }
  };
</script>
