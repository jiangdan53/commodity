<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->


    <div class="receive">
        <div class="receive">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="receives" style="width: 100%">
            <el-table-column fixed prop="id" width="50" />
            <el-table-column prop="city" label="城市" width="120" />
            <el-table-column prop="defaultStatus" label="是否为默认" width="120" />
            <el-table-column prop="detailAddress" label="详细地址(街道)" width="120" />
            <el-table-column prop="name" label="收货人名称" width="120" />
            <el-table-column prop="postCode" label="邮政编码" width="120" />
            <el-table-column prop="province" label="省份/直辖市" width="120" />
            <el-table-column prop="region" label="区" width="120" />

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
        <el-form :model="receive">
            <el-form-item label="城市" :label-width="formLabelWidth">
                <el-input v-model="receive.city" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否为默认" :label-width="formLabelWidth">
                <el-input v-model="receive.defaultStatus" autocomplete="off" />
            </el-form-item>
            <el-form-item label="详细地址(街道)" :label-width="formLabelWidth">
                <el-input v-model="receive.detailAddress" autocomplete="off" />
            </el-form-item>
            <el-form-item label="收货人名称" :label-width="formLabelWidth">
                <el-input v-model="receive.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮政编码" :label-width="formLabelWidth">
                <el-input v-model="receive.postCode" autocomplete="off" />
            </el-form-item>
            <el-form-item label="省份/直辖市" :label-width="formLabelWidth">
                <el-input v-model="receive.province" autocomplete="off" />
            </el-form-item>
            <el-form-item label="区" :label-width="formLabelWidth">
                <el-input v-model="receive.region" autocomplete="off" />
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
import { receivePage, receiveDelId, receiveAdd, receiveEdit } from "../../http/ums-member-receive-address";
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            receives: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            receive: {
                "city": "",
                "defaultStatus": 0,
                "detailAddress": "",
                "id": 0,
                "memberId": 0,
                "name": "",
                "phoneNumber": "",
                "postCode": "",
                "province": "",
                "region": ""
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getreceivePage(1)
    },
    methods: {
        toEdit(category) {
            console.log(category);
            this.dialogFormVisible = true;
            this.category = cloneDeep(category);
        },
        getreceivePage(current) {
            const data = {
                current: current,
                size: 2
            }
            receivePage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.receives = res.data.page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.receive = {
                "createTime": "",
                "endDate": "",
                "id": 0,
                "startDate": "",
                "status": 0,
                "title": ""
            },
                this.getreceivePage(current);
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
            receiveDelId(params).then(res => {
                if (res.success) {
                    this.getreceivePage(this.page.current)

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
            this.receive = {
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
            const receive = this.receive;
            if (receive.id == 0) {
                receiveAdd(receive).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getreceivePage(this.page.current)
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
                receiveEdit(receive).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getreceivePage(this.page.current)
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
