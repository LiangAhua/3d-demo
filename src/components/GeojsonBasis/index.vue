<template>
  <div>
    <div class="item">
      <div @click="showChinaLine">省界线</div>
      <div @click="showPlanningSurface">规划面</div>
      <div @click="showDraw">标绘数据</div>
      <div @click="showMonomer">单体化面</div>
      <div @click="showWorld">世界各国</div>
      <div @click="showPoint">体育设施点</div>
      <div @click="showBuilding">立体建筑物</div>
      <div @click="showBoundaryWall">合肥边界墙</div>
      <div @click="showRegion">合肥区域面</div>
      <div @click="showFloor">分层分户楼栋</div>
      <div @click="showGCJ02Data">GCJ纠偏</div>
    </div>
    <div class="f-pt">
      <span>透明度:</span>
      <a-slider :min="0" :max="1" :step="0.1" v-model:value="layerOpacity" @change="onOpacityChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"

function setDefuatData() {
  layerOpacity.value = 1.0

  mapWork.eventTarget.fire("defuatData", {
    enabledShowHide: true,
    enabledPopup: true,
    enabledTooltip: false,
    enabledRightMenu: false
  })
}

const showDraw = () => {
  setDefuatData()
  mapWork.showDraw(true)

  //changeGraphicData()
}
const showPoint = () => {
  setDefuatData()
  mapWork.showPoint()

  //changeGraphicData()
}
const showChinaLine = () => {
  setDefuatData()
  mapWork.showChinaLine()

  //changeGraphicData()
}
const showRegion = () => {
  setDefuatData()
  mapWork.showRegion()

  //changeGraphicData()
}
const showBoundaryWall = () => {
  setDefuatData()
  mapWork.showBoundaryWall()

  //changeGraphicData()
}
const showPlanningSurface = () => {
  setDefuatData()
  mapWork.showPlanningSurface()

  //changeGraphicData()
}
const showWorld = () => {
  setDefuatData()
  mapWork.showWorld()

  //changeGraphicData()
}
const showBuilding = () => {
  setDefuatData()
  mapWork.showBuilding()

  //changeGraphicData()
}
const showFloor = () => {
  setDefuatData()
  mapWork.showFloor()

  //changeGraphicData()
}
const showMonomer = () => {
  setDefuatData()
  mapWork.showMonomer()

  //changeGraphicData()
}

const showGCJ02Data = () => {
  setDefuatData()
  mapWork.showGCJ02Data()

  // //changeGraphicData()
}



// function //changeGraphicData() {
//   setTimeout(() => {
//     updateWidget("manage-layers")
//   }, 500)
// }

const layerOpacity = ref<number>(1.0)
const onOpacityChange = () => {
  mapWork.graphicLayer.opacity = layerOpacity.value
}
</script>
