<template>
    <el-main>
        <el-menu :default-active="1"  class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <el-menu-item index="0">
                <el-icon  :size="60" @click="collapse(icon)">
                    <component :is="icon" />
                </el-icon>
            </el-menu-item>
            <div class="flex-grow" />
            <el-sub-menu index="1">
                <template #title>管理员</template>
            </el-sub-menu>
        </el-menu>
        <RouterView :key="key"></RouterView>
    </el-main>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
    data() {
        return {
            icon:"Expand",
            src: '../../../src/assets/logo.png',
        }
    },
    computed: {
        key() {
            return this.$route.path
            
        },
        
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },
        collapse(icon){
            if(icon=='Expand'){
                this.icon="Fold"
                this.isCollapse=true;
            }
            else{
                this.icon=='Fold'
                this.isCollapse=false
            }

        }
    }

});
</script>

<style lang="scss" scoped>
.el-main {
    padding: 0 !important;
}

.flex-grow {
    flex-grow: 1;
}
</style>
