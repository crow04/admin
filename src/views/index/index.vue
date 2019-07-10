<template>
  <div class="root">
    <el-container>
      <el-aside width class="side-nav" v-bind:class="{ closed_nav:isCollapse }">
        <Sidebar></Sidebar>
      </el-aside>
      <el-container v-bind:class="{ closed_body:isCollapse }">
        <el-header>
          <aHead></aHead>
          <breadcrumb></breadcrumb>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from "./sidebar.vue";
import breadcrumb from "./components/breadcrumb.vue";
import aHead from "../index/components/header";
import { mapGetters } from "vuex";
export default {
  components: { Sidebar, breadcrumb, aHead },
  data() {
    return {
      username: "admin",
      dialogVisible: false
    };
  },
  methods: {},
  mounted: function() {
    //this.$router.push(this.routes[0].path);
  },
  computed: {
    ...mapGetters([
      "isCollapse"
    ]),

  },
};
</script>

