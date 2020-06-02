<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    mounted(){
      document.title=this.$t('Lifepay-Africa后台管理系统')
    }
  }
</script>
