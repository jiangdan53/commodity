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
            <el-button type="success" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="adCates" style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="50" />
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="chargeType" label="计费类型" />
            <el-table-column prop="firstWeight" label="首重" />
            <el-table-column prop="firstFee" label="首费"/>
            <el-table-column prop="continueWeight" label="续重重量" />
            <el-table-column prop="continmeFee" label="续重费用"/>
            <el-table-column prop="dest" label="目的地"/>

            <el-table-column fixed="right" label="操作" width="250">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
                    <el-button type="warning" size="small" @click="selectById">查找</el-button>
                    <!-- <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button> -->
                    <!-- <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button> -->

                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="计费编辑">
        <el-form :model="adCate">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="adCate.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="计费类型" :label-width="formLabelWidth">
                <el-input v-model="adCate.chargeType" autocomplete="off" />
            </el-form-item>
            <el-form-item label="首重" :label-width="formLabelWidth">
                <el-input v-model="adCate.firstWeight" autocomplete="off" />
            </el-form-item>
            <el-form-item label="首费" :label-width="formLabelWidth">
                <el-input v-model="adCate.firstFee" autocomplete="off" />
            </el-form-item>
            <el-form-item label="续重重量" :label-width="formLabelWidth">
                <el-input v-model="adCate.continueWeight" autocomplete="off" />
            </el-form-item>
            <el-form-item label="续重费用" :label-width="formLabelWidth">
                <el-input v-model="adCate.continmeFee" autocomplete="off" />
            </el-form-item>
            <el-form-item label="目的地" :label-width="formLabelWidth">
                <el-input v-model="adCate.dest" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 按id查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="查询">
        <el-form :model="adCate">
            <el-form-item label="请输入ID" :label-width="formLabelWidth">
                <el-input v-model="searchText" placeholder="按ID查询，请输入ID" autocomplete="off" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleById = false">取消</el-button>
                <el-button type="primary" @click="getById(searchText)">查询
                </el-button>
            </span>
        </template>
    </el-dialog>



</template>

<script>
import { defineComponent } from "vue"
import { adTopicPage, adTopicDelId, adTopicAdd, adTopicEdit,couponOne} from "../../http/pmsFeight";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            searchText: "",
            coupons: [],
            adCates: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            dialogFormVisibleById:false,
            adCate: {
             
                "chargeType": 0,
                "continmeFee": 0,
                "continueWeight": 0,
                "dest": "",
                "firstFee": 0,
                "firstWeight": 0,
                "id": 0,
                "name": ""
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getAdCatesPage(1)
    },
    methods: {
        toEdit(adcate) {
            console.log(adcate);
            this.dialogFormVisible=true;
            this.adCate=cloneDeep(adcate);    
        },
        getAdCatesPage(current) {
            const data = {
                current: current,
                size: 5
            }
            adTopicPage(data).then(res => {
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
            adTopicDelId(params).then(res => {
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
            this.adCate =  { 
                "chargeType": 0,
                "continmeFee": 0,
                "continueWeight": 0,
                "dest": "",
                "firstFee": 0,
                "firstWeight": 0,
                "id": 0,
                "name": ""
            },
            this.dialogFormVisible = true;
        },

        selectById() {
            this.dialogFormVisibleById = true;
        },
        getById(id) {
            this.coupons = [];//新建一个数组
            const params = {
                id: id
            }
            couponOne(params).then(res => {
                this.dialogFormVisibleById = false;
                this.coupons.push(res.data.help);//在这个新数组里加入查到的信息
                const adCates = this.coupons;//将新数组赋值
                this.adCates = adCates;//显示
                ElMessage("查询成功")
            }).catch(err => {
                ElMessage("查询失败")
                console.log(err);
            })
        },



        save() {
            const adcate = this.adCate;
            if (adcate.id == 0) {
                adTopicAdd(adcate).then(res => {
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
            else{
                adTopicEdit(adcate).then(res => {
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

<style lang="scss" scoped></style>

  

