<template>
    <el-aside>
        <el-menu default-active="1"  :collapse="isCollapse" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <Platform />
                    </el-icon>
                    <span>首页热点模块</span>
                </template>
                <el-menu-item-group title="管理员">
                    <el-menu-item index="/smsHomeAdvertise">首页广告</el-menu-item>
                    <el-menu-item index="/sms-home-brand">首页热销品牌</el-menu-item>
                    <el-menu-item index="/sms-home-new-product">首页促销商品</el-menu-item>
                    <el-menu-item index="/sms-home-recommend-product">首页新品</el-menu-item>
                    <el-menu-item index="/sms-home-recommend-subject">首页推荐主题</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="用户">
                    <el-menu-item index="/smsview">查看首页广告</el-menu-item>
                    <el-menu-item index="/userbrand">查看首页热销品牌</el-menu-item>
                    <el-menu-item index="/userproduct">查看首页促销商品</el-menu-item>
                    <el-menu-item index="/usernew">查看首页新品</el-menu-item>
                    <el-menu-item index="/usersubject">查看首页推荐主题</el-menu-item>
                </el-menu-item-group>
                
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script>
import { defineComponent } from "vue"
import {
    Document,
    Menu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
export default defineComponent({ 
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
    },
    components: {
        Document,
        Menu,
        Location,
        Setting,
    }

});
</script>

<style lang="scss" scoped>
.el-menu{
    height: calc(100vh - 20px) !important;
}
</style>
