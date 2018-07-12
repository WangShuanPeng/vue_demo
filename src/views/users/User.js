export default {
  data () {
    return {
      list: [],
      loading: true,
      handleUser: false,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        time: ''
      },
       rules: {
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ]
      },
      handelEditlist: false,
      editlist: {
      },
      total: 0,
      pagesize: 5,
      currentPage: 1,
      idval: '',
      RoleformLabelWidth: '120px',
      handeleRoleDialog: false,
      Roleform: {},
      roleList: []
    }
  },
  created () {
    this.locadata()
  },
  methods: {
    handleSizeChange (val) {
      // size发生变化
      this.pagesize = val
      this.locadata()
      console.log(`每页 ${val} 条`, val)
    },
    handleCurrentChange (val) {
      // 页码发生变化
      // this.pagesize = 5
    // 当每页条数发生变化，修改当前页码为第一页
      this.currentPage = val
      this.locadata()
      console.log(`当前页: ${val}`, val)
    },
    async locadata () {
      this.loading = true
      const params = {pagenum: this.currentPage, pagesize: this.pagesize}
      const res = await this.$http.get('/users', { params })
      // this.loading = 'true'
      const data = res.data
      this.total = data.data.total
      // console.log(data)
      this.loading = false
      const {meta: {status, msg}} = data
      if (status === 200) {
        const {data: { users }} = data
        this.list = users
      } else {
        this.$message.error(msg)
      }
    },
    // 搜索框搜索内容
    async handleSeach () {
      const id = this.idval
      const params =  {pagenum: this.currentPage, pagesize: this.pagesize}
      const res = await this.$http.get('users?query=' + id, {params})
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        const {data: { users }} = data
        this.list = users
        console.log(data.data)
      } else {
        this.$message.error(msg)
      }
    },
    handleUserDialog () {
      this.handleUser = true
    },
    // 取消弹出框
    handleUserfalse () {
      this.handleUser = false
      for (let key in this.formData) {
            this.formData[key] = '';
          }
    },
    // 添加数据
    async handleUserAdd () {
        this.$refs.myfromuser.validate(async (valid) => {
        if (!valid) {
           return this.$message.error('请完整输入内容')
        }
      // if (!this.formData.username || !this.formData.password) {
      //   this.$message('用户名和密码不能为空')
      // } else {
        // 发送请求之前，获取token
        this.formData.time = Number(new Date())
        const formData = this.formData
        const res = await this.$http.post('users', formData)
        const data = res.data
        const {meta: {status, msg}} = data
        if (status === 201) {
          this.$message.success('添加成功')

          this.handleUser = false
          this.locadata()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 删除数据
    async handelDel (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then( async () => {
          const id = row.id
          const res = await this.$http.delete('users/' + id)
          const {meta: {status, msg}} = res.data
          if (status === 200) {
            this.$message.success(msg)
            this.locadata()
          } else {
            this.$message.error(msg)
          }
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    // change  改变swithc事件
    async changeSwitch ($event, row) {
      const id = row.id
      const res = await this.$http.put('users/' + id + '/state/' + $event)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.locadata()
        this.$message.success('设置状态成功')
      } else {
        this.$message.error(msg)
      }
    },
    async handelEdit (row) {
      this.handelEditlist = true
      const id = row.id
      const res = await this.$http.get('users/' + id)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.editlist = data.data
        console.log(data.data)
      } else {
        this.$message.error(msg)
      }
    },
    // 修改用户数据
    async handelEditlUsers () {
      const id = this.editlist.id
      const res = await this.$http.put('users/' + id, this.editlist)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.$message.success(msg)
        this.handelEditlist = false
        this.locadata()
      } else {
        this.$message.error(msg)
      }
    },
    // 角色分配
    async handelRole (row) {
      this.handeleRoleDialog = true
      // 获取用户名称
      const id = row.id
      const res = await this.$http.get('users/' + id)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.Roleform = data.data
        console.log(data.data)
      } else {
        this.$message.error(msg)
      }
      // 获取角色列表
      this.handelRoleList()
    },
    // 获取角色列表
    async handelRoleList () {
      const res = await this.$http.get('roles')
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.roleList = data.data
        console.log(data.data)
      } else {
        this.$message.error(msg)
      }
    },
    // 获取选中的管理员角色ID
    selectChange (value) {
      this.roleid = value
    },
    // 修改该用户的管理员角色
    async handeleRoleCheck (row) {
      const role = this.roleid
      const id = row.id
      console.log(role,id)
      const res = await this.$http.put('users/' + id + '/role', {rid: role})
      const data = res.data
      console.log(data)
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.$message.success(msg)
        this.handeleRoleDialog = false
        this.locadata()
      } else {
        this.$message.error(msg, status)
      }
    }
  }
}
