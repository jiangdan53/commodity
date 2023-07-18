<template>
    
  <meta name="referrer" content="no-referrer"/>
  <h1>首页广告</h1>
  <div id="banner">
    <el-carousel indicator-position="outside" arrow="always">
      <el-carousel-item v-for="item in adCates" :key="item">
       <div class="img-wrapper">
       <el-image class="img-style" :src="item.pic" />
    </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


  
<script>
import {adTaskPagel,adTaskDelIdl,adTaskEditl,couponOnel,adTaskAddl, } from "../../http/smsview";
import { cloneDeep } from 'lodash-es'
import {  defineComponent } from "vue"
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
            "sort": 1,
            "startTime": "",
            "status": 0,
            "type": 0,
            "url": "",
            "brandId": 0,
            "brandName": "",
            "id": 0,
            "recommendStatus": 0,

          },
          formLabelWidth: 100,

              
      }
  },
  mounted() {
      this.getAdCatesPage(1)
  },
  methods: {
      biaojuchongzhi(){
        this.$router.push(
            {
                name:"biaojuchongzhi",
                params:{pic:this.adCate.pic}
            }
        )
      },
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
          adTaskPagel(data).then(res => {
              console.log(res);
              const page = res.data.page;
              this.adCates = page.records;
              this.page = page;
          }).catch(err => {
              console.log(err);
          })
          adTaskPagel(data).then(res => {
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
          adTaskDelIdl(params).then(res => {
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

      selectByIdl() {
          this.dialogFormVisibleById = true;
      },
      // 按id查询
      getByIdl(id) {
          this.coupons = [];//新建一个数组
          const params = {
              id: id
          }
          couponOnel(params).then(res => {
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
              adTaskAddl(adcate).then(res => {
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
              adTaskEditl(adcate).then(res => {
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
  
<style>
.el-carousel__item el-image {
    width: auto; /* 宽度自适应 */
  height: auto; /* 高度自适应 */
  max-width: 100%;
  max-height: 100%;

}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.img-style {
    width: auto; /* 宽度自适应 */
  height: auto; /* 高度自适应 */
  max-width: 100%;
  max-height: 100%;
}
.img-wrapper {
  display: flex;
  justify-content: center; /* 在水平方向上居中 */
  align-items: center; /* 在垂直方向上居中 */
  height: 400px; /* 容器的高度 */
}
</style>