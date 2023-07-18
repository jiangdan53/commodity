
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
  <div class="adCates">
      <div class="adcate-tools">
          <el-button type="primary" @click="toAdd">添加</el-button>
          <el-button type="warning" color="#FFD2D2" @click="selectById">查询</el-button>
      </div>
      <el-table :data="adCates" style="width: 100%">
          <el-table-column fixed prop="id" label="id" width="50" />
          <el-table-column prop="name" label="广告名" />
          <el-table-column prop="type" label="轮播位置" />
          <el-table-column prop="pic" label="pic">
            <template v-slot:default="adCate">
                <el-image :src="adCate.row.pic"  width="50" hight="50"/>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间"/>
          <el-table-column prop="endTime" label="结束时间"/>
          <el-table-column prop="clickCount" label="点击数"/>
          <el-table-column prop="orderCount" label="下单数"/>
          <el-table-column prop="url" label="链接地址"/>
          <el-table-column prop="note" label="备注"/>
          <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                  <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                  <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
       <el-pagination
         small background layout="prev, pager, next" :page-size="page.size" :total="page.total"
          @current-change="currentchange" /> 
  </div>
  <el-dialog v-model="dialogFormVisible" title="广告编辑">
      <el-form :model="adCate">
          <el-form-item label="广告名称" :label-width="formLabelWidth">
              <el-input v-model="adCate.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="轮播位置" :label-width="formLabelWidth">
              <el-input v-model="adCate.type" autocomplete="off" />
          </el-form-item>
          <el-form-item label="pic" :label-width="formLabelWidth">
              <el-input v-model="adCate.pic" autocomplete="off" />
          </el-form-item>
          <el-form-item label="点击数" :label-width="formLabelWidth">
              <el-input v-model="adCate.clickCount" autocomplete="off" />
          </el-form-item>
          <el-form-item label="下单数" :label-width="formLabelWidth">
              <el-input v-model="adCate.orderCount" autocomplete="off" />
          </el-form-item>
          <el-form-item label="链接地址" :label-width="formLabelWidth">
              <el-input v-model="adCate.url" autocomplete="off" />
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="adCate.note" autocomplete="off" />
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
  <el-dialog v-model="dialogFormVisibleById" title="查询">
      <el-form :model="adCate">
          <el-form-item label="请输入广告id" :label-width="formLabelWidth">
              <el-input v-model="searchText" placeholder="按广告id查询，请输入广告id" autocomplete="off" />
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
import {  defineComponent } from "vue"
import {adTaskPage,adTaskDelId,adTaskEdit,couponOne,adTaskAdd} from "../../http/smsHomeAdvertise";
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
  data() {
      return {
          searchText: "",
          coupons: [],
          adCates: [],
          imageurl:"",
          page: {
              total: 0,
              current: 1,
              size: 10
          },
          dialogFormVisible: false,
          dialogFormVisibleById :true,
          adCate: {
            "clickCount": 0,
            "endTime": "",
            "id": 0,
            "name": "",
            "note": "",
            "orderCount": 0,
            "pic": "",
            "sort": 0,
            "startTime": "",
            "status": 0,
            "type": 0,
            "url": "",
          },
          formLabelWidth: 100,
          created(){
            this.imageurl=pic
          }
              
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
          adTaskPage(data).then(res => {
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
          adTaskDelId(params).then(res => {
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
            "clickCount": 0,
            "endTime": "",
            "id": 0,
            "name": "",
            "note": "",
            "orderCount": 0,
            "pic": "",
            "sort": 0,
            "startTime": "",
            "status": 0,
            "type": 0,
            "url": ""
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
          couponOne(params).then(res => {
              this.dialogFormVisibleById = false;
              this.coupons.push(res.data.help);//在这个新数组里加入查到的信息
              const adCates = this.coupons;//将新数组赋值
              this.adCates = adCates;//显示
              ElMessage("会员id查询成功")
          }).catch(err => {
              ElMessage("会员id查询失败")
              console.log(err);
          })
      },





      save() {
          const adcate = this.adCate;
          if (adcate.id == 0) {
              adTaskAdd(adcate).then(res => {
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
              adTaskEdit(adcate).then(res => {
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



