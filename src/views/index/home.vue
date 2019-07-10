<template>
  <div>
    <div class="price-chart">
      <price-chart></price-chart>
    </div>
    <div ref="chart-line"></div>
  </div>
</template>
<script>
import priceChart from "../charts/phoneChart";
export default {
  components: { priceChart },
  data() {
    return {
      name: "HOME"
    };
  }
};
</script>

<style lang="scss" scoped>
.price-chart {
  background: #f3f3f3;
}
</style>

