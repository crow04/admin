<template>
  <div>
    <div>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        align="right"
        class="search-box"
        v-model="search"
        @input.native="serarchHanlder"
      ></el-input>
      <el-button type="primary" class="addBtn" plain @click="addHandle">{{$t("handle.add")}}</el-button>
    </div>
    <el-table
      fit
      stripe
      v-loading
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%"
      ref="userInfoTable"
    >
      <el-table-column align="center" prop="account" :label="$t('infoTable.account')" sortable></el-table-column>
      <el-table-column align="center" prop="name" :label="$t('infoTable.name')"></el-table-column>
      <el-table-column align="center" prop="gender" :label="$t('infoTable.gender')">
        <!-- <template slot-scope="{row}">
          <span v-if="row.gender==1">男</span>
          <span v-if="row.gender==0">女</span>
        </template>-->·
      </el-table-column>
      <!-- <el-table-column align="center" prop="color" :label='$t("infoTable.color")' width="120"></el-table-column> -->
      <el-table-column align="center" prop="birthDay" :label="$t('infoTable.birthday')"></el-table-column>
      <el-table-column align="center" prop="password" :label="$t('infoTable.password')"></el-table-column>
      <!-- <el-table-column align="center" prop="address" :label="$t('infoTable.address')"></el-table-column> -->
      <el-table-column align="center" prop label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editHandler(scope.row,scope.$index)">{{$t("handle.edit")}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteHandler(scope.row,scope.$index)"
          >{{$t("handle.delete")}}</el-button>
        </template>
      </el-table-column>
      <template>
        <div slot="empty">暂无数据</div>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[15,20,25,50,100]"
        :page-size="15"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="editdiglogVisable"
      width="40%"
      :before-close="editHandleClose"
      :append-to-body="true"
    >
      <div>
        <el-form ref="editform" :rules="rules" :model="formdata" label-width="80px">
          <el-form-item label="邮箱" prop="account">
            <el-input v-model="formdata.account"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formdata.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formdata.password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="formdata.gender">
              <el-radio label="男" value="1"></el-radio>
              <el-radio label="女" value="0"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDay">
            <el-date-picker
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="formdata.birthDay"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button @click="cancelHandle">{{ $t("buttonname.cancel")}}</el-button>
        <el-button type="primary" @click="comitHandle">{{ $t("buttonname.confirm")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { generateInfoTableTh } from "../../utils/i18n";
export default {
  data() {
    return {
      dialogTitle: "编辑",
      tabledata: [],
      search: "",
      isEdit: true,
      list2: null,
      currentPage: 1,
      pagesize: 15,
      editdiglogVisable: false,
      loading: false,
      initform: {
        account: "",
        name: "",
        gender: "男",
        birthDay: "",
        password: ""
      },
      formdata: {
        account: "",
        name: "",
        gender: "男",
        birthDay: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入邮箱账号", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        name: [{ required: true, message: "请输入名字" }],
        gender: [{ required: true, message: "必选项" }],
        birthDay: [{ required: "true", message: "请选择出生日期" }],
        password: [
          { required: true, message: "请输入您的密码" },
          { min: 9, max: 18, message: "长度在9-18之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getUserList() {
      this.loading = true;
      let params = {
        pagesize: this.pagesize,
        currentPage: this.currentPage
      };
      this.$api({
        url: "/user/list",
        method: "post",
        data: params
      })
        .then(res => {
          this.tabledata = res.data.data;
          //console.log(this.tabledata);
          this.loading = false;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            type: "error",
            message: err || "Message Error"
          });
        });
    },
    editHandleClose(key, keyPath) {
      this.editdiglogVisable = false;
    },
    addHandle() {
      this.dialogTitle = "新增";
      this.editdiglogVisable = true;
    },
    editHandler(row, index) {
      this.dialogTitle = "编辑";
      this.editdiglogVisable = true
      //this.formdata=this.initform
      this.$refs["editform"].resetFields()
    },
    deleteHandler(row, index) {
      //this.dialogVisible=true;
    },
    comitHandle() {
      if (this.dialogTitle == "编辑") {
        console.log("编辑", this.formdata);
      } else if (this.dialogTitle == "新增") {
        console.log("新增", this.formdata);
      }
      this.editdiglogVisable = false
      this.$refs["editform"].resetFields()
    },
    cancelHandle(){
      this.editdiglogVisable = false;
      this.$refs["editform"].resetFields()
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getUserList();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getUserList();
    }
    // serarchHanlder() {
    //   this.list2 = this.list2.filter(item =>
    //     item.name.toLowerCase().includes(this.search.toLowerCase())
    //   );
    // }
  },
  computed: {
    //// 设置为计算属性才能动态反应
    list() {
      return this.tabledata.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    total() {
      return this.tabledata.length;
    }
  },
  created() {
    this.getUserList();
  },
  watch: {
    list() {
      //this.currentPage = 1;
    }
  }
};
</script>
<style lang="scss">
.search-box {
  width: 400px;
  margin-bottom: 20px;
}
.dialog-footer {
  display: inline-block;
  text-align: right;
  width: 100%;
}
.pagination {
  text-align: right;
  margin: 20px 0;
}
.addBtn {
  margin-left: 40px;
}
</style>


