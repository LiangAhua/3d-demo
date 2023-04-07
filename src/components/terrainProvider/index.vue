<template>
    <mars-gui :options="options"></mars-gui>
</template>

<script lang="ts" setup>
// import { reactive } from "vue"
// import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"
import type { GuiItem } from "@/components/ui/mars-gui/index.js"
import MarsGui from "@/components/ui/mars-gui/index.vue"

const options: GuiItem[] = [
  {
    type: "radio",
    field: "type",
    label: "单选",
    value: "xyz",
    show(data) {
      return data.speed !== "2"
    },
    data: [
      {
        label: "无地形",
        value: "none"
      },
      {
        label: "标准服务",
        value: "xyz"
      },
      {
        label: "ArcGIS服务",
        value: "arcgis"
      }
    ],
    change(value) {
      mapWork.radioTerrain(value)
    }
  },
  {
    type: "checkbox",
    field: "type",
    label: "调试",
    value: ["1"],
    data: [
      {
        label: "开启地形",
        value: "1"
      },
      {
        label: "地形三角网",
        value: "2"
      }
    ],
    change(value) {
      mapWork.enabledTerrain(
        value.find((item: string) => {
          return item === "1"
        })
      )
      mapWork.enabledTerrainSJW(
        value.find((item: string) => {
          return item === "2"
        })
      )
    }
  }
]
</script>

