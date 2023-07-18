<template>
    <div class="common-layout">
        <el-container>
            <Aside></Aside>
            <Main></Main>
        </el-container>
    </div>
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
