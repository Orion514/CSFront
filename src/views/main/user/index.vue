<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <div class="layout-container-form-handle">
<!--        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>-->
        <el-popconfirm title="批量删除" @confirm="handleDel(chooseData)">
          <template #reference>
            <el-button type="danger" icon="el-icon-delete" :disabled="chooseData.length === 0">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="layout-container-form-search">
        <el-input v-model="query.input" placeholder="请输入关键词进行检索" @change="getTableData(true)"></el-input>
        <el-button type="primary" icon="el-icon-search" class="search-btn" @click="getTableData(true)">搜索</el-button>
      </div>
    </div>
    <div class="layout-container-table">
      <Table
          ref="table"
          v-model:page="page"
          v-loading="loading"
          :showIndex="true"
          :showSelection="true"
          :data="tableData"
          @getTableData="getTableData"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'role', order: 'ascending' }"
      >
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="role" label="角色" align="center" column-key="role"
                         filterable
                         :filters="[{ text: '管理员', value: 'admin' }, { text: '普通用户', value: 'user' }]"
                         :filter-method="classfy"
                         filter-placement="bottom-end"
          >


          <template #default = {row}>
            <el-tag :type = 'handleType(row.role)' >{{row.role}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right" width="200">
          <template #default="scope">
            <el-button type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="删除" @confirm="handleDel([scope.row])">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { getData, del } from '@/api/table'
import Layer from './layer.vue'
import { ElMessage } from 'element-plus'
import { roleData} from "./enum";
import {getUserList} from "../../../api/user";

export default defineComponent({
  name: 'crudTable',
  components: {
    Table,
    Layer
  },
  setup() {
    // 存储搜索用的数据
    const query = reactive({
      input: ''
    })
    // 弹窗控制器
    const layer = reactive({
      show: false,
      title: '新增',
      showButton: true
    })
    // 分页参数, 供table使用
    const page = reactive({
      index: 1,
      size: 20,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const chooseData = ref([])

    function handleType(a) {
      if (a === 'admin') return 'warning'
      if (a === 'user') return 'primary'
    }

    const handleSelectionChange = (val) => {
      chooseData.value = val
    }

    const classfy = (value, row) => {
      return row.role === value
    }

    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        ...query
      }
      getUserList(params)
          .then(res => {
            let data = res.data.list
            if (Array.isArray(data)) {
              data.forEach(d => {
                const select = roleData.find(select => select.value === d.choose)
                select ? d.chooseName = select.label : d.chooseName = d.choose
              })
            }
            tableData.value = res.data.list
            page.total = Number(res.data.pager.total)
          })
          .catch(error => {
            tableData.value = []
            page.index = 1
            page.total = 0
          })
          .finally(() => {
            loading.value = false
          })
    }
    // 删除功能
    const handleDel = (data) => {
      let params = {
        ids: data.map((e)=> {
          return e.id
        }).join(',')
      }
      del(params)
          .then(res => {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getTableData(tableData.value.length === 1 ? true : false)
          })
    }
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = '新增数据'
      layer.show = true
      delete layer.row
    }
    // 编辑弹窗功能
    const handleEdit = (row) => {
      layer.title = '编辑数据'
      layer.row = row
      layer.show = true
    }
    getTableData(true)
    return {
      query,
      tableData,
      chooseData,
      loading,
      page,
      layer,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleDel,
      getTableData,
      handleType,
      classfy
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
