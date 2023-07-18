<template>
    <Cart></Cart>
</template>

<script>

import { defineComponent } from "vue"
import Cart from "../../components/Cart.vue";
export default defineComponent({

    data() {
        return{

        }
    },
    methods: {
    },
    components:{
        Cart
    }

});
</script>

<style lang="scss" scoped>
.product {
    display: flex; //弹性布局
    flex-direction: column;
    margin: 20px 10px;

    .name {
        font-size: 16px;
        font-weight: bold;
    }

    .bars {
        display: flex; //嵌套
        justify-content: space-between; //两边对齐
        height: 35px;
        align-items: center; //垂直居中对齐
        margin-top: 10px;


        .price {
            color: red;
        }
    }
}

.total {
    display: flex;
    margin: 20px 10px 0 10px;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}
</style>
