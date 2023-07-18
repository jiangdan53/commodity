<template>

    <router-link to="/smsHomeAdvertise">    
    <!-- 在路由里面加入你的，然后to的值改成你的 -->
    <aside></aside>
    <main></main>
    </router-link>
  </template>
  <script>
  import Aside from '@/layout/admin/aside.vue'
  import Main from '@/layout/admin/main.vue'
  import { defineComponent } from "vue"
  export default defineComponent({
      components: {
          Aside,
          Main
      }
  
  });
  </script>
  
  <style lang="scss" scoped>
  *{
      padding: 0 !important;
      margin: 0 !important;
  }
  
  </style>
  