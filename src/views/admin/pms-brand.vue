<template>
    
    <!-- el-table显示数据,分页 -->
    
    <div class="brands">
        <div class="brand-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="brands" style="width: 100%">
            <el-table-column fixed prop="id" width="150" />
            <el-table-column prop="name" label="品牌名称" width="120" />
            <el-table-column prop="first_letter" label="首字母" width="120" />
            <el-table-column prop="sort" label="排序" width="120" />
            <el-table-column prop="factory_status" label="是否为品牌制造商" width="120" />
            <el-table-column prop="show_status" label="show_status" width="120" />
            <el-table-column prop="product_count" label="产品数量" width="120" />
            <el-table-column fixed="product_comment_count" label="产品评论数量" width="120"/>
            <el-table-column prop="logo" label="品牌logo" width="120" />
            <el-table-column prop="big_pic" label="专区大图" width="120" />
            <el-table-column prop="brand_story" label="品牌故事" width="120" >
               
            

                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size"  :total="page.total" @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="品牌类型编辑">
    <el-form :model="brand">
      <el-form-item label="品牌名称" :label-width="formLabelWidth">
        <el-input v-model="brand.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="首字母" :label-width="formLabelWidth">
        <el-input v-model="brand.first_letter" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="brand.sort" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否为品牌制造商" :label-width="formLabelWidth">
        <el-input v-model="brand.factory_status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="show_status" :label-width="formLabelWidth">
        <el-input v-model="brand.show_status" autocomplete="off" />
    </el-form-item>
    <el-form-item label="产品数量" :label-width="formLabelWidth">
        <el-input v-model="brand.product_count" autocomplete="off" />
    </el-form-item>
    <el-form-item label="产品评论数量" :label-width="formLabelWidth">
        <el-input v-model="brand.product_comment_count" autocomplete="off" />
    </el-form-item>
    <el-form-item label="品牌logo" :label-width="formLabelWidth">
        <el-input v-model="brand.logo" autocomplete="off" />
    </el-form-item> 
    <el-form-item label="专区大图" :label-width="formLabelWidth">
        <el-input v-model="brand.big_pic" autocomplete="off" />
    </el-form-item>
    <el-form-item label="品牌故事" :label-width="formLabelWidth">
        <el-input v-model="brand.brand_story" autocomplete="off" />
    </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { brandPage,brandDelId,brandAdd,brandEdit } from '../../http/pms-brand';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data(){
        return{
            brands:[],
            page:{
                total:0,
                current:1,
                size:10
            },
            dialogFormVisible:false,
            brand:{
                "id":"",
                "name":"",
                "first_letter":"",
                "sort":"",
                "factory_status":"",
                "show_status":"",
                "product_count":"",
                "product_comment_count":"",
                "logo" :"",
                "big_pic":"",
                "brand_story":"",
            },
            formLabelWidth:80
        }
    },
    mounted(){
        this.getbrandsPage(1)
    },
    methods:{
        toEdit(brand){
            console.log(brand)
            this.dialogFormVisible=true;
            this.brand=cloneDeep(brand);
        },
        getbrandsPage(current){
            const data={
                current:current,
                size:2
            }

            brandPage(data).then(res=>{
                console.log(res);
                const page=res.data.page;
                this.brands=page.records;
                this.page=page;
            }).catch(err=>{
                console.log(err);
            })
        },
        currentchange(current){
            // console.log(current);
            this.getbrandsPage(current);
            this.page.current=current;//数据更新到目前显示的页面
        },
        del(id){
            if (confirm("是否删除") == true) 
                console.log(id);
            console.log(id);
            const params = {
                id:id
        }
         brandDelId(params).then(res=>{
            if(res.success){
                this.getbrandsPage(this.page.current)
            }else{
                console.log(res.msg);
                return false
            }
            }).catch(err=>{
                
            })
        },
        toAdd(){
            this.dialogFormVisible=true;
            this.brand={
                "id":"",
                "name":"",
                "first_letter":"",
                "sort":"",
                "factory_status":"",
                "show_status":"",
                "product_count":"",
                "product_comment_count":"",
                "logo" :"",
                "big_pic":"",
                "brand_story":"",
            }
        },
        save(){
            const brand=this.brand
            if (brand.id==0) {
                brandAdd(brand).then(res=>{
            if (res.success) {
                this.dialogFormVisible=false
                this.getbrandsPage(this.page.current)
                ElMessage(res.msg)
            }else{
                ElMessage(res.msg)
                return false
            }
        }).catch(err=>{
            ElMessage('网络错误联系管理员')
        })
            }
            else{
                brandEdit(brand).then(res=>{
            if (res.success) {
                this.dialogFormVisible=false
                this.getbrandsPage(this.page.current)
                ElMessage(res.msg)
            }else{
                ElMessage(res.msg)
                return false
            }

            }).catch(err=>{
                ElMessage('网络错误联系管理员')
            })
            }
        }
    }
});
</script>
<style lang = "scss" scoped></style>