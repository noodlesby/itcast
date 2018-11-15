<template>
  <el-card class="card">
    <!-- 面包屑 -->
     <my-bread-crumb level1="数据统计" level2="数据报表"></my-bread-crumb>
     <!-- echarts -->
     <div ref="main" style="width: 600px;height:400px;margin-top:20px;"></div>
  </el-card>
</template>
<script>
import echarts from 'echarts';

export default {
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const myCharts = echarts.init(this.$refs.main);
      const res = await this.$http.get('reports/type/1');
      let option = res.data.data;
      const data = {
        title: {
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        }
      };
      option = { ...option, ...data };
      option.xAxis[0].boundaryGap = false;
      myCharts.setOption(option);
    }
  }
};
</script>
<style>

</style>
