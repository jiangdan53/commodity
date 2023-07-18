<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->


    <div class="topics">
        <div class="adcate-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="topics" style="width: 100%">
            <el-table-column fixed prop="id" label="#" width="50" />
            <el-table-column prop="attendCount" label="参与人数" />
            <el-table-column prop="attentionCount" label="关注人数" />
            <el-table-column prop="awardName" label="奖品名称"/>
            <el-table-column prop="attendType" label="参与方式" />
            <el-table-column prop="content" label="话题内容"/>

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
    <el-dialog v-model="dialogFormVisible" title="话题编辑">
        <el-form :model="topic">
            <el-form-item label="参与人数" :label-width="formLabelWidth">
                <el-input v-model="topic.attendCount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="参与方式" :label-width="formLabelWidth">
                <el-input v-model="topic.attendType" autocomplete="off" />
            </el-form-item>
            <el-form-item label="关注人数" :label-width="formLabelWidth">
                <el-input v-model="topic.attentionCount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="奖励名称" :label-width="formLabelWidth">
                <el-input v-model="topic.awardName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="话题内容" :label-width="formLabelWidth">
                <el-input v-model="topic.content" autocomplete="off" />
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
import { adTopicPage, adTopicDelId, adTopicAdd, adTopicEdit } from "../../http/cms-topic";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            topics: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            topic: {
                //参与人数
                "attendCount": "",
                "id": 0,//标志点 0添加 >0 更新
                //关注人数
                "attentionCount": "",
                //奖品名称
                "awardName": '',
                //参与方式
                "attendType": '',
                //话题内容
                "content" : ''
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
            this.topic=cloneDeep(adcate);    
        },
        getAdCatesPage(current) {
            const data = {
                current: current,
                size: 2
            }
            adTopicPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.topics = page.records;
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
            this.topic =  {
                "attendCount": "",
                "id": 0,
                "attentionCount": "",
                "awardName": '',
                "attendType": '',
                "content" : ''
            },
            this.dialogFormVisible = true;
        },
        save() {
            const adcate = this.topic;
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

  

