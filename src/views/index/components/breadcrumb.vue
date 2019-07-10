<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item
        separator="/"
        v-for="(item,index) in breadlist"
        :key="index"
        :to="{path: item.path}"
      >{{generateTitle(item.meta.title)}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { generateTitle } from "@/utils/i18n";
export default {
  data() {
    return {
      breadlist: ""
    };
  },
  created() {
    this.getBread();
  },
  methods: {
    getBread() {
      this.breadlist = this.$route.matched;
      //console.log("$route.matched:",this.$route.matched)
      this.$route.matched.forEach((item, index) => {
        //先判断父级路由是否是空字符串或者meta是否为首页，直接复写路径到根路径
        item.meta.name === "首页"
          ? (item.path = "/")
          : this.$route.path === item.path;
      });
    },
    generateTitle
  },
  watch: {
    $route(a, b) {
      this.getBread();
    }
  }
};
</script>
