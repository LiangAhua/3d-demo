<template>
      <a-space>
        <a-button @click="clear">清除</a-button>
        <a-checkbox @change="isChecked" v-model:checked="checked">仅测量模型(不拾取地形)</a-checkbox>
      </a-space>

      <div style="padding:10px 0 10px">
        <a-space>
          <a-button @click="measureLength">空间距离</a-button>
          <a-button @click="measureArea">水平面积</a-button>
          <a-button @click="measurePoint">坐标测量</a-button>
          <a-button @click="measureHeight">高度差</a-button>
        </a-space>
      </div>

      <div>
        <a-space>
          <a-button @click="measureSurfaceLength">贴地距离</a-button>
          <a-button @click="measureSurfaceeArea">贴地面积</a-button>
          <a-button @click="measureTriangleHeight">三角测量</a-button>
          <a-button @click="measureAngle">方位角</a-button>
        </a-space>
      </div>
    <a-space style="padding: 10px 0 0 0">
      <a-button @click="onClickCenterAtTerrain">定位至山区</a-button>
      <a-button @click="onClickCenterAtModel">定位至模型</a-button>
    </a-space>

  <!-- <location-to /> -->
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const checked = ref(false)

// 空间距离
const measureLength = () => {
  mapWork.measureLength()
}
// 水平面积
const measureArea = () => {
  mapWork.measureArea()
}

// 高度差
const measureHeight = () => {
  mapWork.measureHeight()
}

// 坐标测量
const measurePoint = () => {
  mapWork.measurePoint()
}

// 贴地距离
const measureSurfaceLength = () => {
  mapWork.measureSurfaceLength()
}

// 贴地面积
const measureSurfaceeArea = () => {
  mapWork.measureSurfaceeArea()
}

// 三角测量
const measureTriangleHeight = () => {
  mapWork.measureTriangleHeight()
}
// 方位角
const measureAngle = () => {
  mapWork.measureAngle()
}

const isChecked = () => {
  mapWork.onlyPickModelPosition(checked.value)
}
const clear = () => {
  mapWork.removeAll()
}

const onClickCenterAtTerrain = () => {
  mapWork.onClickCenterAtTerrain()
}

const onClickCenterAtModel = () => {
  mapWork.onClickCenterAtModel()
}
</script>

<style lang="less" scoped>

.ant-checkbox-wrapper {
  color: #fff
}
</style>
