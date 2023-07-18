<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->


    <div class="adCates">
        <div class="adcate-tools">
            <el-button type="warning" @click="selectById">查询</el-button>
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="adCates" style="width: 100%">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="consumePerPoint" label="每消费多少元获取1个点"></el-table-column>
            <el-table-column prop="continueSignDay" label="连续签到天数"></el-table-column>
            <el-table-column prop="continueSignPoint" label="连续签到赠送数量"></el-table-column>
            <el-table-column prop="lowOrderAmount" label="最低获取点数的订单金额"></el-table-column>
            <el-table-column prop="maxPointPerOrder" label="每笔订单最高获取点数"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>

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
    <el-dialog v-model="dialogFormVisible" title="编辑">
        <el-form :model="adCate">
            <!-- <el-form-item label="id" :label-width="formLabelWidth">
                <el-input v-model="adCate.name" autocomplete="off" />
            </el-form-item> -->
            <el-form-item label="每消费多少元获取1个点" :label-width="formLabelWidth">
                <el-input v-model="adCate.consumePerPoint" autocomplete="off" />
            </el-form-item>
            <el-form-item label="连续签到天数" :label-width="formLabelWidth">
                <el-input v-model="adCate.continueSignDay" autocomplete="off" />
            </el-form-item>
            <el-form-item label="连续签到赠送数量" :label-width="formLabelWidth">
                <el-input v-model="adCate.continueSignPoint" autocomplete="off" />
            </el-form-item>
            <el-form-item label="最低获取点数的订单金额" :label-width="formLabelWidth">
                <el-input v-model="adCate.lowOrderAmount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="每笔订单最高获取点数" :label-width="formLabelWidth">
                <el-input v-model="adCate.maxPointPerOrder" autocomplete="off" />
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-input v-model="adCate.type" autocomplete="off" />
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
    <!-- 按id查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="ID查询">
        <el-form :model="adCate">
            <el-form-item label="请输入ID" :label-width="formLabelWidth">
                <el-input v-model="searchText" placeholder="请输入ID" autocomplete="off" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleById = false">Cancel</el-button>
                <el-button type="primary" @click="getById(searchText)">查询
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
import { adCatePage, adCateDelId, adCateAdd, adCateEdit, adCateOne } from "../../http/ums_rule.js";
import { ElMessage } from 'element-plus'
import { cloneDeep, identity } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            rules: [],
            adCates: [],
            searchText: "",
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            dialogFormVisibleById: false,
            adCate: {
                "id": 0,
                "consumePerPoint": 0,
                "continueSignDay": 0,
                "continueSignPoint": 0,
                "lowOrderAmount": 0,
                "maxPointPerOrder": 0,
                "type": 0
                // "isNew": true
            },
            formLabelWidth: 180
        }
    },
    mounted() {
        this.getAdCatesPage(1)
    },
    methods: {
        toEdit(adcate) {
            console.log(adcate);
            this.dialogFormVisible = true;
            this.adCate = cloneDeep(adcate);
        },
        getAdCatesPage(current) {
            const data = {
                current: current,
                size: 5
            }
            adCatePage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.adCates = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getAdCatesPage(current);
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
            adCateDelId(params).then(res => {
                if (res.success) {
                    this.getAdCatesPage(this.page.current)

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
            this.dialogFormVisible = true;
            this.adCate = {
                "consumePerPoint": 0,
                "continueSignDay": 0,
                "continueSignPoint": 0,
                "id": 0,
                "lowOrderAmount": 0,
                "maxPointPerOrder": 0,
                "type": 0
            }
        },
        //one查询
        selectById() {
            this.dialogFormVisibleById = true;
        },
        //按Id查询
        getById(id) {
            this.rules = [];//新建一个数组
            const params = {
                id: id
            }
            adCateOne(params).then(res => {
                this.dialogFormVisibleById = false;
                this.rules.push(res.data.help);
                const adCates = this.rules;
                this.adCates = adCates;
                ElMessage("查询成功！")
            }).catch(err => {
                ElMessage("查询失败，请输入有效的id")
                console.log(err);
            })
        },
        save() {
            const adcate = this.adCate;
            if (adcate.id == 0) {
                adCateAdd(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
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
                adCateEdit(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
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

<style lang="scss" scoped>
body {
    margin: 0;
    padding: 0;
    background-image: url("@/imgs/keli.png");
    background-size: cover;
    opacity: 0.9 !important;
    /* 使用 !important 提高优先级 */
    background-repeat: no-repeat;
}
</style>
