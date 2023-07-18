<template>
  <el-table :data="records" style="width: 100%">
    <el-table-column fixed prop="id" label="id" width="150" />
    <el-table-column prop="name" label="name" width="120" />
    <el-table-column prop="icon" label="icon" width="120" />
    <el-table-column prop="subjectCount" label="subjectCount" width="120" />
    <el-table-column prop="showStatus" label="showStatus" width="120" />
    <el-table-column prop="sort" label="sort" width="120" />

    <el-table-column fixed="right" label="Operations" width="600">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="remove(scope.row)">remove</el-button>
        <el-button link type="primary" size="small" @click="Edit(scope.row)">updata</el-button>
      </template>
    </el-table-column>

  </el-table>

  <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button>

  <div class="demo-pagination-block">
    <div class="demonstration">Jump to</div>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize3"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper"
      :total="totaldata"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @click="jumper"
    />
  </div>


  <!---->
  <el-dialog v-model="centerDialogVisible" title="添加数据" width="30%" center>
    <span>id:<el-input v-model="input.id" placeholder="Please input" /></span>
    <span>Name:<el-input v-model="input.name" placeholder="Please input" /></span>
    <span>icon:<el-input v-model="input.icon" placeholder="Please input" /></span>
    <span>subjectCount:<el-input v-model="input.subjectCount" placeholder="Please input" /></span>
    <span>showStatus:<el-input v-model="input.showStatus" placeholder="Please input" /></span>
    <span>sort:<el-input v-model="input.sort" placeholder="Please input" /></span>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import axios from "axios";
export default defineComponent({
  setup(){
  },
  data() {
      return {
        save:true,
        page:1,
        totaldata:10,
        centerDialogVisible:false,
        records: [],
        input:{
            "id": 0,
            "name": "",
            "icon": "",
            "subjectCount": "",
            "showStatus": "",
            "sort": ""
        },

      }
  },
  methods: {
    //分页
    getpage(current_a,size_a){
        const that=this; 
        axios({
            method: 'post',
            url: 'http://mall.qzimp.cn/mall/cms-subject-category/page',
            data:{
                current:current_a,
                size:size_a
            }
        }).then(function (response) {
            that.records = response.data.data.page.records
            that.totaldata = response.data.data.page.total
        }) 
    },
    //单个
    getone(index){
        const that=this; 
        axios({
            method: 'get',
            url: 'http://mall.qzimp.cn/mall/cms-subject-category/one/'+index,
        }).then(function (response) {
          that.input = response.data.data.help
        })
    },
    //删除
    deleteone(index){
        axios({
            method: 'get',
            url: 'http://mall.qzimp.cn/mall/cms-subject-category/del/'+index,
        }).then(function (response) {
            ElMessage({showClose: true,message: 'Oops, this is a error message.',type: 'error',})
        }) 
    },
    //修改
    update(index){
      axios({
            method: 'post',
            url: 'http://mall.qzimp.cn/mall/cms-subject-category/edit',
            data:{
                "icon": this.input.icon,
                "id": this.input.id,
                "name": this.input.name,
                "showStatus": this.input.showStatus,
                "sort": this.input.sort,
                "subjectCount": this.input.subjectCount
            }
        }).then(function (response) {
            if (response.data.success) {
                ElMessage({message: '修改成功',type: 'success',})
            }else{
                ElMessage.error('修改失败')
            }
        })
    },
    //添加
    addone(){
        console.log(this.input);
        axios({
            method: 'post',
            url: 'http://mall.qzimp.cn/mall/cms-subject-category/add',
            data:{
                "icon": this.input.icon,
                "id": this.input.id,
                "name": this.input.name,
                "showStatus": this.input.showStatus,
                "sort": this.input.sort,
                "subjectCount": this.input.subjectCount
            }
        }).then(function (response) {
            if (response.data.success) {
                ElMessage({message: '添加成功',type: 'success',})
            }else{
                ElMessage.error('添加失败')
            }
        })
    },
    //面板--------------------------------------------------------------------
    onAddItem(){
        this.centerDialogVisible = !this.centerDialogVisible
    },
    //确认后添加数据
    confirm(){
      if (this.save) {
        this.addone();
        
      }else{
        this.update();
        this.save = true;
      }
      this.centerDialogVisible = false
      this.Dataclearing();
      this.jumper()
    },
    //数据清空
    Dataclearing(){
        this.input = {
            "id": 0,
            "name": "",
            "icon": "",
            "subjectCount": "",
            "showStatus": "",
            "sort": ""
        };
    },
    //取消
    cancel(){
        this.centerDialogVisible = false;
        this.Dataclearing();
    },
    //分页数据
    jumper(){
       this.getpage(this.page,10);
       this.getpage(this.page,10);
    },
    //面板删除
    remove(data){
        this.deleteone(data.id);
        this.jumper()
    },
    //面板修改
    Edit(data){
      this.input = data
      this.save = false;
      this.centerDialogVisible = !this.centerDialogVisible
    }
  },
  mounted(){
    this.getpage(this.page,10);
  }
});
</script>
<style></style>