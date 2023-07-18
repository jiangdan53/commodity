<template>
    <!-- el-table显示数据,分页 -->

    <div class="coupon">


        <div class="coupon-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <el-button type="warning" @click="selectById">按优惠券ID查询数据</el-button>
        </div>
        <!-- 表单显示部分 -->
        <el-table :data="coupon" style="width: 100%">
            <el-table-column fixed prop="id" width="150" />
                        <el-table-column prop="type" label="优惠券类型" width="120" />
                        <el-table-column prop="name" label="优惠券名称" width="120" />
                        <el-table-column prop="platform" label="使用平台" width="120" />
                        <el-table-column prop="count" label="数量" width="120" />
                        <el-table-column prop="amount" label="金额" width="120" />
                        <el-table-column prop="perLimit" label="每人限领张数" width="120" />
                        <el-table-column prop="minPoint" label="使用门槛" width="120" />
                        <el-table-column prop="startTime" label="开始时间" width="120" />
                        <el-table-column prop="endTime" label="结束时间" width="120" />
                        <el-table-column prop="useType" label="使用类型" width="120" />
                        <el-table-column prop="node" label="备注" width="120" />
                        <el-table-column prop="publishCount" label="发行数量" width="120" />
                        <el-table-column prop="useCount" label="已使用数量" width="120" />
                        <el-table-column prop="receiveCount" label="领取数量" width="120" />
                        <el-table-column prop="enableTime" label="可以领取的日期" width="120" />
                        <el-table-column prop="code" label="优惠码" width="120" />
                        <el-table-column prop="memberLevel" label="可领取的会员类型" width="120" />
                        <el-table-column prop="platform" label="使用平台" width="120" />
                        <el-table-column fixed="right" label="功能管理" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <!-- 添加按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisible" title="优惠券编辑">
        <el-form :model="adCoupon">
            <el-form-item label="优惠券类型" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.type" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="优惠券名称" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.name" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="使用平台" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.platform" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="数量" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.count" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="金额" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.amount" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="每人限领张数" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.perLimit" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="使用门槛" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.minPoint" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.startTime" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="结束时间" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.endTime" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="使用类型" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.useType" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="备注" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.node" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="发行数量" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.publishCount" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="已使用数量" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.useCount" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="领取数量" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.receiveCount" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="可以领取的日期" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.enableTime" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="优惠码" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.code" autocomplete="off" />
                            </el-form-item>
                        <el-form-item label="可领取的会员类型" :label-width="formLabelWidth">
                                <el-input v-model="adCoupon.memberLevel" autocomplete="off" />
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

    <!-- 按id查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="优惠券查询">
        <el-form :model="adCoupon">
            <el-form-item label="请输入优惠券ID" :label-width="formLabelWidth">
                <el-input v-model="searchText" placeholder="按优惠券ID查询，请输入优惠券ID" autocomplete="off" />
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
import { defineComponent } from 'vue';
import { couponPage, couponDelId, couponAdd, couponEdit, couponOne } from '../../http/sms-coupon';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            searchText: "",
            coupon: [],
            coupons: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            dialogFormVisibleById: false,
            adCoupon: {
                "amount": 0,
                "code": "",
                "count": 0,
                "enableTime": "",
                "endTime": "",
                "id": 0,
                "memberLevel": 0,
                "minPoint": 0,
                "name": "",
                "note": "",
                "perLimit": 0,
                "platform": 0,
                "publishCount": 0,
                "receiveCount": 0,
                "startTime": "",
                "type": 0,
                "useCount": 0,
                "useType": 0
            },
            formLabelWidth: 150,
        }
    },
    mounted() {
        this.getCouponPage(1)

    },
    methods: {
        toEdit(adcoupon) {
            this.dialogFormVisible = true;
            this.adCoupon = cloneDeep(adcoupon);
        },
        // 按page展示
        getCouponPage(current) {
            const data = {
                current: current,
                size: 5
            }
            couponPage(data).then(res => {
                const page = res.data.page;
                this.coupon = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
        },
        currentchange(current) {
            // console.log(current);
            this.getCouponPage(current);
            this.page.current = current;//数据更新到目前显示的页面
        },
        //删除
        del(id) {
            if (confirm("是否删除") == true) {
                console.log(id);
                const params = {
                    id: id
                }

                couponDelId(params).then(res => {
                    if (res.success) {
                        this.getCouponPage(this.page.current)
                    } else {
                        console.log(res.msg);
                        return false
                    }
                }).catch(err => {
                    ElMessage('删除失败')
                })
            }
        },
        toAdd() {
            this.dialogFormVisible = true;
            this.adCoupon = {
                "amount": 0,
                "code": "",
                "count": 0,
                "enableTime": "2013-02-01T00:00:00.000+00:00",
                "endTime": "2013-02-01T00:00:00.00",
                "id": 0,//标志点0 添加>0 更新
                "memberLevel": "",
                "minPoint": "",
                "name": "",
                "note": "",
                "perLimit": 0,
                "platform": "",
                "publishCount": 0,
                "receiveCount": 0,
                "startTime": "2013-02-01T00:00:00.000+00:00",
                "type": 0,
                "useCount": 0,
                "useType": 0
            }
        },
        selectById() {
            this.dialogFormVisibleById = true;
        },
        // 按优惠券ID查询优惠券
        getById(id) {
            this.coupons = [];//新建一个数组
            const params = {
                id: id
            }
            couponOne(params).then(res => {
                this.dialogFormVisibleById = false;
                this.coupons.push(res.data.help);//在这个新数组里加入查到的信息
                const coupon = this.coupons;//将新数组赋值
                this.coupon = coupon;//显示
                ElMessage("查询成功")
            }).catch(err => {
                ElMessage("查询失败，没有该优惠券")
                console.log(err);
            })
        },
        save() {
            const adcoupon = this.adCoupon
            if (adcoupon.id == 0) {
                couponAdd(adcoupon).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getCouponPage(this.page.current)
                        ElMessage(res.msg)
                    } else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络添加错误联系管理员')
                })
            }
            else {
                couponEdit(adcoupon).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getCouponPage(this.page.current)
                        ElMessage(res.msg)
                    } else {
                        ElMessage(res.msg)
                        return false
                    }

                }).catch(err => {
                    ElMessage('网络编辑错误联系管理员')
                })
            }
        }
    }
});
</script>
<style lang = "scss" scoped></style>