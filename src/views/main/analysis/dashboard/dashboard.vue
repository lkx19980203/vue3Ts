<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="8">
        <chart-card>
          <pie-echart :pieData="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card>
          <map-echart :mapData="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="8">
        <chart-card>
          <rose-echart :roseData="showGoodsCategorySale" />
        </chart-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>
          <line-echart v-bind="showGoodsCategorySale2" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import countCard from './cpnts/count-card.vue'
import chartCard from './cpnts/chart-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import { PieEchart, LineEchart, RoseEchart, BarEchart, MapEchart } from '@/components/page-echarts'
import { computed } from 'vue'

// 1.发起数据的请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

const showGoodsCategoryCount = computed(() =>
  goodsCategoryCount.value.map((item) => ({ value: item.goodsCount, name: item.name }))
)

const showGoodsCategorySale = computed(() =>
  goodsCategorySale.value.map((item) => ({ value: item.goodsCount, name: item.name }))
)

const showGoodsCategorySale2 = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)

  return {
    labels,
    values
  }
})

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)

  return {
    labels,
    values
  }
})

const showGoodsAddressSale = computed(() =>
  goodsAddressSale.value.map((item) => ({ value: item.count, name: item.address }))
)
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}

.echart {
  height: 200px;
}
</style>
