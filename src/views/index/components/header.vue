<template>
  <div class="header-navbar">
    <i class="iconfont icon-bars nav-toggle" :class="{active:isCollapse}" @click="toggleHandler"></i>
    <div class="setting-box">
      <div class="badge-container">
        <el-badge value="100" class="item">
          <el-button size="small">{{ $t("message.comment")}}</el-button>
        </el-badge>
        <!--el-badge value="hot" class="item">
                        <el-button size="small">回复</el-button>
        </el-badge-->
      </div>
      <el-dropdown @command="changeLan" class="tool-dropdown">
        <span class="el-dropdown-link">
          {{ $t("message.changelan")}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zhCHS">{{ $t("landesc.zhChs")}}</el-dropdown-item>
          <el-dropdown-item command="en">{{ $t("landesc.en")}}</el-dropdown-item>   
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleCommand" class="tool-dropdown">
        <span class="el-dropdown-link">
          {{name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="reg">{{ $t("message.changepwd")}}</el-dropdown-item>
          <el-dropdown-item command="out">{{ $t("message.loginout")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
      
    >
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t("buttonname.cancel")}}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{ $t("buttonname.confirm")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapGetters } from "vuex";
export default {
  name: "aHead",
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["name", "isCollapse"]),
    changeBtnClass() {
      return {
        "active.nav-toggle": !this.isCollapse
      };
    },
    handleClose(key, keyPath) {
      this.dialogVisible = false;
    },
    toggletitle: function() {
      this.$t("message.closenav");
    },
    dialogTitle: function() {
      return this.$t("message.EditDialogTitle");
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "out") {
        this.$confirm(
          this.$t("message.loginOutAlertDesc"),
          this.$t("message.prompt"),
          {
            confirmButtonText: this.$t("buttonname.confirm"),
            cancelButtonText: this.$t("buttonname.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.$message({
              showClose: true,
              type: "success",
              message: this.$t("message.loginout")
            });
            this.$store
              .dispatch("loginOut", "")
              .then(() => {
                this.$router.push({ path: "/login" });
              })
              .catch(err => {
                console.log(this.$store);
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              showClose: true,
              type: "info",
              message: this.$t("message.canceled")
            });
          });
      } else if (command == "reg") {
        this.dialogVisible = true;
      }
    },
    changeLan(command) {
      this.$i18n.locale = command;
    },
    toggleHandler() {
      store.dispatch("setSidebarOpenStatus", this.status);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

