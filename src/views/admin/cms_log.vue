<template>
	<div class="root">
		<el-input v-model="searchText" placeholder="请输入搜索关键字" clearable @clear="clearSearch" @keyup.enter="performSearch"
			style="margin-bottom: 20px;"></el-input>

		<el-table :data="paginatedData" :header-cell-style="{
			background: '#eef1f6',
			color: '#606266'
		}" borde>

			<el-table-column prop="basePath" label="basePath"></el-table-column>
			<el-table-column prop="description" label="description"></el-table-column>
			<el-table-column prop="id" label="id"></el-table-column>
			<el-table-column prop="ip" label="ip"></el-table-column>
			<el-table-column prop="method" label="method"></el-table-column>
			<el-table-column prop="parameter" label="parameter"></el-table-column>
			<el-table-column prop="result" label="result"></el-table-column>
			<el-table-column prop="spendTime" label="spendTime"></el-table-column>
			<el-table-column prop="startTime" label="startTime"></el-table-column>
			<el-table-column prop="uri" label="uri"></el-table-column>
			<el-table-column prop="url" label="url"></el-table-column>
			<el-table-column prop="username" label="username"></el-table-column>

			<el-table-column width="150rpx" label="操作">
				<template #default="{ row }">
					<el-button v-if="row.isNew" size="mini" class="custom-button" type="success" circle
						@click="Insert(row)">
						<el-icon>
							<Position />
						</el-icon>
					</el-button>

					<el-button v-else class="custom-button" size="mini" type="warning" circle @click="Alter(row)">
						<el-icon>
							<Position />
						</el-icon>
					</el-button>

					<el-button type="primary" size="mini" circle @click="openEditDialog(row)">
						<el-icon>
							<EditPen />
						</el-icon>
					</el-button>
					<el-button v-if="row.isNew" size="mini" type="danger" circle @click="delND(row)">
						<el-icon>
							<Delete />
						</el-icon>
					</el-button>
					<el-button v-else type="danger" size="mini" circle @click="Del(row)">
						<el-icon>
							<Delete />
						</el-icon>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination :current-page="currentPage" :page-size="pageSize" :total="filteredtableData.length"
			@current-change="handlePageChange">
		</el-pagination>






		<el-dialog class="form" v-model="editDialogVisible" @close="editDialogVisible = false">
			<el-form>
				<el-form-item label="id">
					<el-input v-model="editItem.id" disabled></el-input>
				</el-form-item>

				<el-form-item label="basePath">
					<el-input v-model="editItem.basePath"></el-input>
				</el-form-item>

				<el-form-item label="description">
					<el-input v-model="editItem.description"></el-input>
				</el-form-item>

				<el-form-item label="ip">
					<el-input v-model="editItem.ip"></el-input>
				</el-form-item>

				<el-form-item label="method">
					<el-input v-model="editItem.method"></el-input>
				</el-form-item>

				<el-form-item label="parameter">
					<el-input v-model="editItem.parameter"></el-input>
				</el-form-item>

				<el-form-item label="result">
					<el-input v-model="editItem.result"></el-input>
				</el-form-item>

				<el-form-item label="spendTime">
					<el-input v-model="editItem.spendTime"></el-input>
				</el-form-item>

				<el-form-item label="startTime">
					<el-input v-model="editItem.startTime"></el-input>
				</el-form-item>

				<el-form-item label="uri">
					<el-input v-model="editItem.uri"></el-input>
				</el-form-item>

				<el-form-item label="url">
					<el-input v-model="editItem.url"></el-input>
				</el-form-item>

				<el-form-item label="username">
					<el-input v-model="editItem.username"></el-input>
				</el-form-item>


			</el-form>

			<div slot="footer">
				<el-button @click="editDialogVisible = false">取消</el-button>

				<el-button type="primary" @click="saveEdit">保存</el-button>
			</div>
		</el-dialog>
		<el-button type="primary" circle size="large" @click="addAPI" style="margin-top: 20px;margin-left: 50%;">
			<el-icon>
				<CirclePlusFilled />
			</el-icon>
		</el-button>
	</div>
</template>
<script>
import api from '@/http/cms_log.js'
import {
	ElMessage,
	ElMessageBox,
	roleTypes
} from 'element-plus';


export default {
	data() {
		return {
			json: {
				current: 1,
				size: 99
			},

			searchText: '',
			currentPage: 1, // 当前页码
			pageSize: 6, // 每页显示的数据条数
			total: 0,
			tableData: [],
			editDialogVisible: false,
			editItem: {},
			selectedRow: null

			// 其他的 data 属性
		}
	},
	computed: {
		paginatedData() {
			const startIndex = (this.currentPage - 1) * this.pageSize;
			const endIndex = startIndex + this.pageSize;
			return this.filteredtableData.slice(startIndex, endIndex);
		},
		filteredtableData() {
			if (this.searchText) {
				return this.tableData.filter(item => {
					return String(item.id).includes(String(this.searchText));
				});
			} else {
				return this.tableData;
			}
		}
	},
	methods: {
		openEditDialog(row) {
			this.editItem = {
				...row
			}; // 创建一个副本以防止直接修改原始数据
			this.editDialogVisible = true;
		},
		handlePageChange(currentPage) {
			this.currentPage = currentPage;
		},


		saveEdit() {
			console.log(this.editItem);
			ElMessageBox.confirm('确定修改吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const index = this.tableData.findIndex(item => item.id === this.editItem.id);
					if (index !== -1) {
						// 替换原有的数据
						this.tableData.splice(index, 1, this.editItem);
					} else {
						// 添加编辑后的数据
						this.tableData.push(this.editItem);
					}
					this.editDialogVisible = false;
					ElMessage.success('修改成功！');
					this.editItem = {}; // 将编辑项重置为空对象
				})
				.catch(() => {
					// 取消保存操作
					ElMessage.info('修改取消！');

				});
		},


		fetchData() {
			api.Page(this.json)
				.then(response => {
					this.tableData = response.data.records;
					console.log(response);
					ElMessage.success('刷新成功！');
				})
				.catch(error => {
					ElMessage.error('刷新失败，请检查网络！');

					console.error('Error fetching data:', error);
				});
		},

		Insert(row) {
			api.Add(row)
				.then((response) => {
					delete row.isNew
					ElMessage.success('插入数据成功！');

				})
				.catch((error) => {
					ElMessage.error('插入数据失败！');

					console.error('保存修改失败:', error);
				});
		},
		Alter(row) {
			api.Edit(row)
				.then((response) => {
					// 修改保存成功，可以进行一些操作，例如提示用户保存成功或更新本地数据
					console.log('修改保存成功:', response.data);
					ElMessage.success('修改数据成功！');

					// 重新获取数据，更新tableData
					// 完成保存后，关闭修改框并重置编辑项
				})
				.catch((error) => {
					ElMessage.error('修改数据失败！');
					console.error('保存修改失败:', error);
					// 处理保存失败的情况
				});
		},

		Del(row) {
			ElMessageBox.confirm('确定要删除吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				api.Del(row.id)
					.then(response => {
						// 在这里执行删除成功的操作，例如重新获取数据等
						const index = this.tableData.findIndex(api => api.id === row.id);
						if (index !== -1) {
							this.tableData.splice(index, 1); // 从数据源中删除API对象
						}
						console.log('删除成功:', response.data);
						ElMessage.success('删除成功！');

					})
					.catch(error => {
						ElMessage.error(response.msg);

						console.error('删除失败:', error);
						// 处理删除失败的情况
					});
			}).catch(() => {
				// 取消删除操作
			});
		},
		delND(row) {
			// 在这里处理删除逻辑，可以在确认后从数据源中删除API对象或向服务器发送删除请求
			// 这里使用 Element Plus 的 ElMessageBox 弹窗组件来确认删除操作
			ElMessageBox.confirm('确定要删除吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					// 用户点击了确定按钮，执行删除操作
					const index = this.tableData.findIndex(api => api.id === row.id);
					if (index !== -1) {
						this.tableData.splice(index, 1); // 从数据源中删除API对象
					}
					ElMessage.success('删除成功！');

				})

				.catch(() => {
					ElMessage.error('删除失败！');

					// 用户点击了取消按钮，取消删除操作
					console.log('取消删除 API', row);
				});
		},

		// 可以添加其他方法来实现创建和查看功能
		addAPI() {
			ElMessage.success("添加数据ing");
			const newAPI = {
				"basePath": "",
				"description": "",
				"id": 0,
				"ip": "",
				"method": "",
				"parameter": {},
				"result": {},
				"spendTime": 0,
				"startTime": 0,
				"uri": "",
				"url": "",
				"username": "",
				"isNew":true
			}
			this.tableData.push(newAPI);
			const lastPage = Math.ceil(this.tableData.length / this.pageSize);
			this.handlePageChange(lastPage);
		},

	},
	created() {
		this.fetchData()
	}
}
</script>

<style >

body {
  margin: 0;
  padding: 0;
  background-image: url("@/imgs/keli.png");
  background-size: cover;
  opacity: 0.9 !important; /* 使用 !important 提高优先级 */
  background-repeat: no-repeat;
}
</style>