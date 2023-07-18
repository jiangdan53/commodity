<template>
  <User @customEvent="customEvent" @customEvent1="customEvent1" :salesclerks="salesclerks">
  <template #[header]>
    头部信息
  </template>
  用户列表{{ id }}
  </User>
</template>

<script>
import { defineComponent } from "vue"
import User from "../../components/User.vue";
export default defineComponent({
  props:['id'],
  data(){
    return {
      salesclerks: [
          { id: 1, name: '黄药师', prefession: '店长', shop: '桃花岛分店' },
          { id: 2, name: '梅超风', prefession: '出纳', shop: '桃花岛分店' },
          { id: 3, name: '黄蓉', prefession: '导购', shop: '桃花岛分店' },
          { id: 4, name: '郭靖', prefession: '导购', shop: '桃花岛分店' },
          { id: 5, name: '郭芙', prefession: '导购', shop: '桃花岛分店' },
          { id: 6, name: '郭襄', prefession: '库管', shop: '桃花岛分店' },
        ],
        header:'header1'
    }
  },
  mounted(){
    const {title,Auth}=this.$route.meta;
    console.log(title,Auth) 
  },

  components: {
    //局部注册
    // key:value
    // User:User
    User
  },
  methods:{
    customEvent(){
      console.log('customEvent')
    },
    customEvent1(id){
      console.log('customEvent1',id)
    }
  }

});
</script>

<style lang="scss" scoped></style>
