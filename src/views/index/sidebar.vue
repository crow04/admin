<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    default-active="$router.default"
    router
    @select="navSelect"
  >
    <Menu
      v-for="route in permission_routers"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    ></Menu>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Menu from "./components/menuItem.vue";
export default {
  name: "Sidebar",
  components: { Menu },
  data() {
    return {
      status:! this.$store.getters.isCollapse
    };
  },
  computed: {
    ...mapGetters([
      "permission_routers",
      'isCollapse'
    ])
  },
  mounted: function() {

  },
  methods: {
    navSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    navClose() {}
  },
};
</script>

<style>
</style>
