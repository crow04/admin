<template>
  <div class="radar-chart" ref="price" id="price"></div>
</template>
<script>
import store from "../../store";
export default {
  name: "priceChart",
  data() {
    return {
      opt: {
        title: {
          text: "智能手机预算(单位 % )",
          subtext: "数据来源企鹅智库",
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: "item",
          backgroudColor: "rgba(0,0,250,0.2)"
        },
        toolbox: {
          show: true,
          orient: "vertical",
          itemSize: "20",
          right: 20,
          top: 20,
          feature: {
            dataView: {
              //数据视图
              show: true
            },
            restore: {
              //重置
              show: false
            },
            dataZoom: {
              //数据缩放视图
              show: false
            },
            saveAsImage: {
              //保存图片
              show: true
            },
            magicType: {
              //动态类型切换
              type: ["bar", "line"],
              show: false
            }
          }
        },
        legend: {
          type: "scroll",
          bottom: 10,
          data: []
        },
        //// dataRange  数据缩放
        // visualMap: {
        //   top: "middle",
        //   right: 10,
        //   color: ["red", "yellow"],
        //   calculable: true,
        //   min: 0,
        //   max: 36
        // },
        radar: {
          indicator: [
            { text: " 1000元以下", max: 8 },
            { text: " 1000-2000元", max: 24 },
            { text: " 2001-3000元", max: 40 },
            { text: " 3001-5000元", max: 30 },
            { text: " 5001-8000元", max: 20 },
            { text: " 8000元以上", max: 10 }
          ]
        },
        series: {
          name: "智能手机预算",
          type: "radar",
          symbol: "none",
          // lineStyle: {
          //   width: 1,
          //   //color:"#ff8100"
          // },
          emphasis: {
            areaStyle: {
              color: "rgba(0,250,0,0.3)"
            }
          },
          data: []
        }
      },
      chartdata: null
    };
  },
  methods: {
    drawChart(chart, res) {
      chart.setOption({
        legend: {
          data: (function() {
            var list = [];
            for (var key in res) {
              list.push(res[key]["name"]);
            }
            return list;
          })()
        },
        series: {
          data: (function() {
            var series = [];
            for (var key in res) {
              series.push({
                value: res[key]["value"],
                name: res[key]["name"]
              });
            }
            return series;
          })()
        }
      });
      chart.hideLoading();
    },
    getData() {
      var that = this;
      store.dispatch("getPhonePrice").then(
        data => {
          that.chartdata = data;
        },
        () => {
          that.$message({
            showClose: true,
            type: "error",
            message: "error:" + err
          });
        }
      );
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    chartdata() {
      this.$nextTick(function() {
        const chart = this.$echart.init(this.$refs["price"], "light");
        chart.showLoading();
        chart.setOption(this.opt);
        let data = this.chartdata;
        this.drawChart(chart, data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.radar-chart {
  width: 900px;
  height: 500px;
  margin: 0 auto;
}
</style>

