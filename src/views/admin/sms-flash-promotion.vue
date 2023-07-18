<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->


    <div class="promotion">
        <div class="promotion">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="promotions" style="width: 100%">
            <el-table-column fixed prop="id" width="50" />
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="endDate" label="结束日期" width="120" />
            <el-table-column prop="startDate" label="开始日期" width="120" />
            <el-table-column prop="status" label="上下线状态" width="120" />
            <el-table-column prop="title" label="秒杀时间段名称" width="120" />

            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="表单插入">
        <el-form :model="promotion">
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="promotion.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="结束日期" :label-width="formLabelWidth">
                <el-input v-model="promotion.endDate" autocomplete="off" />
            </el-form-item>
            <el-form-item label="开始日期" :label-width="formLabelWidth">
                <el-input v-model="promotion.startDate" autocomplete="off" />
            </el-form-item>
            <el-form-item label="上下线状态" :label-width="formLabelWidth">
                <el-input v-model="promotion.status" autocomplete="off" />
            </el-form-item>
            <el-form-item label="秒杀时间段名称" :label-width="formLabelWidth">
                <el-input v-model="promotion.title" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
import { promotionPage, promotionDelId, promotionAdd, promotionEdit } from "../../http/sms-flash-promotion";
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            promotions: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            promotion: {
                "createTime": "",
                "endDate": "",
                "id": 0,
                "startDate": "",
                "status": 0,
                "title": ""
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getpromotionPage(1)
    },
    methods: {
        toEdit(category) {
            console.log(category);
            this.dialogFormVisible = true;
            this.category = cloneDeep(category);
        },
        getpromotionPage(current) {
            const data = {
                current: current,
                size: 2
            }
            promotionPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.promotions = res.data.page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.promotion = {
                "createTime": "",
                "endDate": "",
                "id": 0,
                "startDate": "",
                "status": 0,
                "title": ""
            },
            this.getpromotionPage(current);
            this.page.current = current;//数据更新目前显示的页面


        },
        del(id) {
            //删除数据
            //模拟删除，服务器进行处理 
            //要别人反悔机会
            // 如果只有一条数据，删除数据之后如何处理？
            //人机交互
            console.log(id)
            const params = {
                id: id
            }
            promotionDelId(params).then(res => {
                if (res.success) {
                    this.getpromotionPage(this.page.current)

                }
                else {
                    console.log(res.msg)
                    return false
                }


            }).catch(err => {

            })
        },
        toAdd() {
            //到添加的页面
            this.promotion= {
                "createTime": "",
                "endDate": "",
                "id": 0,
                "startDate": "",
                "status": 0,
                "title": ""
            },
                this.dialogFormVisible = true;
        },
        save() {
            const promotion = this.promotion;
            if (promotion.id == 0) {
                promotionAdd(promotion).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getpromotionPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else {
                promotionEdit(promotion).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getpromotionPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }

        }

    }

});
</script>

<style lang="scss" scoped></style>
