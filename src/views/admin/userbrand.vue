<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->
    <meta name="referrer" content="no-referrer"/>
    <h1>首页热销品牌</h1>
    <div class="adCates">
        <el-table :data="adCates" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="50" />
            <el-table-column prop="brandId" label="品牌id" />
            <el-table-column prop="brandName" label="品牌名称" />
            <el-table-column prop="recommendStatus" label="推荐状态"/>
            <el-table-column prop="sort" label="排序"/>
        </el-table>
         <el-pagination
           small background layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" /> 
    </div>
    <el-dialog v-model="dialogFormVisible" title="广告编辑">
        <el-form :model="adCate">
            <el-form-item label="品牌id" :label-width="formLabelWidth">
                <el-input v-model="adCate.brandId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="品牌名称" :label-width="formLabelWidth">
                <el-input v-model="adCate.brandName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="推荐状态" :label-width="formLabelWidth">
                <el-input v-model="adCate.recommendStatus" autocomplete="off" />
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="adCate.sort" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
            </span>
        </template>
    </el-dialog>
  
    
  
  </template>
  
  
  <script>
  import {  defineComponent } from "vue"
  import {brandadTaskAdd,brandadTaskDelId,brandadTaskPage,brandadTaskEdit,brandcouponOne} from "../../http/userbrand";
  import { ElMessage } from 'element-plus'
  import { cloneDeep } from 'lodash-es'
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
            dialogFormVisibleById :true,
            adCate: {
                "brandId": 0,
                "brandName": "",
                "id": 0,
                "recommendStatus": 0,
                "sort": 0
            },
            formLabelWidth: 100,
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
            brandadTaskPage(data).then(res => {
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
            //如果只有一条数据，删除数据之后如何处理？
            //人机交互
            console.log(id)
            const params = {
                id: id
            }
            brandadTaskDelId(params).then(res => {
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
                "brandId": 0,
                "brandName": "",
                "id": 0,
                "recommendStatus": 0,
                "sort": 0
            },
            this.dialogFormVisible = true;
        },
  
        selectById() {
            this.dialogFormVisibleById = true;
        },
        // 按id查询
        getById(id) {
            this.coupons = [];//新建一个数组
            const params = {
                id: id
            }
            brandcouponOne(params).then(res => {
                this.dialogFormVisibleById = false;
                this.coupons.push(res.data.help);//在这个新数组里加入查到的信息
                const adCates = this.coupons;//将新数组赋值
                this.adCates = adCates;//显示
                ElMessage("品牌id查询成功")
            }).catch(err => {
                ElMessage("品牌id查询失败")
                console.log(err);
            })
        },
  
  
  
  
  
        save() {
            const adcate = this.adCate;
            if (adcate.id == 0) {
                brandadTaskAdd(adcate).then(res => {
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
                brandadTaskEdit(adcate).then(res => {
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