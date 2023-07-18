<template>
    <!-- 购物车的实现
        1 商品的展示 数量多，分页，自动加载
        2 价格的计算
        H5 弹性布局设计页面,移动网页
        ？
        1.计数器添加时合计的计算
        2.全选 合计的计算
        3. 分页，自动加载
    -->
    <div class="cart">购物车</div>

    <div class="products">
        <div class="product" v-for="item in products" :key="item.id">
            <div class="name">
                <el-checkbox :label="item.name" size="small" @change="selectProducts(item.id, $event)" />
            </div>
            <div class="bars">
                <span class="price">￥{{ item.price }}</span>
                <span class="count"><el-input-number :min="min" v-model="item.count" size="small" /></span>
            </div>
        </div>
        <div class="total">
            <span>合计:￥{{ total }}</span><button>购买</button>
        </div>
    </div>
</template>

<script>

import { defineComponent } from "vue"
export default defineComponent({

    data() {
        return {
            //响应式变量
            products: [
                { id: 1001, name: "海尔立式热水器", price: 1849, count: 1 },
                { id: 1002, name: "Vue核心技术解析", price: 43, count: 1 },
            ],
            total: 0,
            min:1
        }


    },
    methods: {
        selectProducts(id, event) {
            //console.log(id,event)
            if (event) {
                //被选中
                this.products.forEach((p) => {
                    if (p.id === id) {
                        this.total += p.price * p.count
                    }

                })

            }
            else {
                //被取消
                this.products.forEach((p) => {
                    if (p.id === id) {
                        this.total -= p.price * p.count
                    }

                })
            }
        }
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
