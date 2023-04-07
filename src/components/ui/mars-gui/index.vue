<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <template v-for="(item, i) in renderOptions" :key="i">
      <a-form-item v-if="(item.show as any)(attrForm)" :label="item.label">
        <div :style="getItemStyle(item)">
          <component
            :is="getComponent(item.type)"
            v-model:value="item.value"
            :min="item.min || item.min === 0 ? item.min : -Infinity"
            :max="item.max || item.max === 0 ? item.max : Infinity"
            :step="item.step || 0.1"
            :range="item.range || false"
            :options="item.data || []"
            :units="item.units"
            @change="itemChange(item)"
          >
          </component>
        </div>
        <template v-if="item.extra !== undefined">
          <template v-if="item.extraType === 'string'">{{ item.extra(attrForm) }}</template>
          <component v-else :is="item.extra(attrForm)"></component
        ></template>
      </a-form-item>
    </template>
  </a-form>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"
import { components, GuiItem } from "./index"

const props = defineProps<{
  options: GuiItem[]
  labelCol?: number
}>()

const emits = defineEmits(["change"])

const renderOptions = ref<GuiItem[]>([])

let attrForm = computed(() => {
  const modelValues: Record<string, any> = {}
  renderOptions.value.forEach((item) => {
    modelValues[item.field] = item.value
  })

  return modelValues
})

const labelCol = { span: props.labelCol || 6 }
const wrapperCol = { span: 24 - labelCol.span }

watchEffect(() => {
  renderOptions.value = props.options.map((item) => mergeItemOption(item))
})

defineExpose({
  // 删除指定 field 或 索引的 元素
  delete: (key: string | number) => {
    let index: number
    if (typeof key === "string") {
      renderOptions.value.forEach((item, i) => {
        if (item.field === key) {
          index = i
        }
      })
    }
    if (typeof key === "number" && key >= 0 && key < renderOptions.value.length) {
      index = key
    }
    if (index !== undefined) {
      renderOptions.value.splice(index, 1)
    }
  },
  // 在指定位置插入 一个 或 多个 元素
  insert(index: number, ...args: GuiItem[]) {
    args.forEach((item) => {
      renderOptions.value.splice(index, 0, mergeItemOption(item))
    })
  },
  updateField(field: string, value) {
    renderOptions.value.forEach((item) => {
      if (item.field === field) {
        item.value = value
      }
    })
  },
  updateExtra(field: string, value) {
    renderOptions.value.forEach((item) => {
      if (item.field === field) {
        item.extra = mergeExtra(value)
      }
    })
  },
  updateFields(fieldObj: any) {
    renderOptions.value.forEach((item) => {
      if (fieldObj[item.field]) {
        item.value = fieldObj[item.field]
      }
    })
  },
  getValue(field: string) {
    const item = renderOptions.value.find((it) => {
      return it.field === field
    })
    if (item) {
      return item.value
    }
    throw new Error("field is not exist")
  },
  getValues() {
    return attrForm.value
  }
})

const getItemStyle = ({ extraWidth, extra, label }: GuiItem) => {
  if (!extraWidth && extraWidth !== 0) {
    extraWidth = 100
  }
  return extra !== undefined
    ? {
        width: `calc(100% - ${extraWidth || extraWidth === 0 ? extraWidth : 100}px)`,
        display: "inline-block",
        marginRight: "10px"
      }
    : {
        display: "inline-block",
        width: "100%"
      }
}

function getComponent(type: keyof typeof components) {
  return components[type]
}

function mergeItemOption(item: GuiItem) {
  // show字段转为function
  if (typeof item.show !== "function") {
    item.show = () => (item.show === undefined ? true : !!item.show)
  }

  // extra 字段转为function
  item.extra = mergeExtra(item.extra)
  item.extraType = item.extraType || "string"
  return item
}

function mergeExtra(extra: any) {
  let extraNew = extra
  if (extraNew === undefined || extraNew === null) {
    return undefined
  }

  if (typeof extraNew !== "function" && extraNew) {
    extraNew = () => {
      if (typeof extra === "string") {
        let str = extra
        const paramsPattern = /[^{\}]+(?=})/g
        const extractParams = str.match(paramsPattern) || []
        extractParams.forEach((key) => {
          str = str.replace(new RegExp(`{${key}}`, "g"), attrForm.value[key])
        })
        return str
      } else {
        return extra
      }
    }
  }

  return extraNew
}

function itemChange(item: GuiItem) {
  emits("change", attrForm.value)
  if (item.change) {
    item.change(item.value, attrForm.value)
  }
}
</script>
<script lang="ts">
export default {
  name: "mars-gui"
}
</script>


<style lang="less" scoped>

  // 切换按钮
  .ant-radio-button-wrapper {
    background: rgba(32, 160, 255, 0.2);
    color: #ffffff;
    box-shadow: none !important;
  }

  // 选中按钮
  .ant-radio-button-checked {
    background-color: #1890ff;
  }

  // 表单元素
  .ant-form {
    color: rgba(255, 255, 255, 0.925);

    .ant-form-item-extra {
      color: #fff;
    }
  }

  .ant-form-item {
    margin-bottom: 10px !important;
    color: #fff;

    :deep(.ant-form-item-label > label) {
      font-size: 16px;
      color: var(--sub-title-color);
    }
  }

  .ant-form-item:nth-last-child(1) {
    margin-bottom: 0 !important;
  }

  /* 卡片 */
  .mars-ant-card {
    background: none;
    border: 1px solid var(--base-border-color);
    color: #fff;

    .ant-card-head {
      border-color: var(--base-border-color);
      min-height: auto;
      padding: 0 10px;
      color: #fff;

      .ant-card-head-title {
        padding: 8px 0;
      }
    }

    .ant-card-body {
      padding: 10px;
    }
  }

  // 文件选择
  .ant-upload {
    color: #fff;
  }

  // 多选
  :deep(.ant-checkbox-wrapper) {
    color: #fff;

    .ant-checkbox-inner {
      background-color: var(--bg-base);
      border-color: var(--base-border-color);
    }

    .ant-checkbox-checked {
      background: var(--primary-color);

      .ant-checkbox-inner {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
      }
    }
  }

  // 单选
  :deep(.ant-radio-wrapper) {
    color: #fff;

    .ant-radio-inner {
      background-color: var(--bg-base);
      border-color: var(--base-border-color);
      box-shadow: none !important;
      outline: none !important;
    }

    .ant-radio-checked {
      .ant-radio-inner {
        border-color: var(--primary-color);
      }
    }

    .ant-radio-input {
      box-shadow: none !important;
      outline: none !important;
    }
  }

  // 表格
  .ant-table,
  .ant-table-thead > tr > th {
    color: var(--sub-title-color);
    background: none !important;
  }

  .ant-table-sticky-holder {
    background: none;
  }

  .ant-table-row:nth-of-type(even) {
    background-color: var(--bg-base);
  }
  .ant-table-row:nth-of-type(odd) {
    background-color: var(--odd-table-bg);
  }

  .ant-table .ant-table-thead {
    background-color: var(--select-bg);
  }

  .ant-table-tbody > tr.ant-table-placeholder > td {
    background: #141414;
  }

  .ant-table-row:hover > td,
  .ant-table-row-selected > td {
    background-color: transparent !important;
  }

  .ant-table-cell {
    font-size: 16px;
    color: #fff;
    border: none !important;
    background: transparent !important;
  }

  .ant-table-container {
    border: 1px solid var(--primary-color) !important;
    background: transparent !important;
  }

  .ant-table-placeholder > td {
    background: var(--bg-base) !important;
  }

  .ant-table-row:nth-last-child(1) .ant-table-cell {
    border-bottom: none;
  }

  .ant-cascader-dropdown {
    padding: 0 !important;
    .mars-drop-bg();

    .ant-cascader-menu-item {
      color: #fff;
      &:hover {
        background: var(--list-active);
      }
    }

    .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled) {
      background: var(--list-active);
    }

    .ant-cascader-menu-item-expand-icon {
      color: #fff;
    }
  }

  // 标签页的标签文字颜色
  .ant-tabs-tab {
    color: #fff;
  }

  // 分页
  .ant-pagination {
    * {
      color: #fff !important;
    }

    .ant-pagination-item,
    .ant-pagination-prev,
    .ant-pagination-next {
      background: none;
      background-color: transparent !important;
    }

    .ant-pagination-simple-pager {
      input {
        background: none;
        background-color: transparent !important;
      }
    }

    .ant-select {
      color: #fff;
      background-color: transparent !important;
      background: none;

      .ant-select-selector {
        border-color: var(--base-border-color) !important;
        background: none;
        background-color: transparent !important;

        &:hover,
        &:focus {
          border-color: #4db3ff !important;
        }
      }

      .ant-select-arrow {
        color: var(--base-color) !important;
      }
    }

    .ant-select-dropdown {
      padding: 0 !important;
      .mars-drop-bg();

      .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
        background: var(--list-active);
      }

      .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
        font-weight: 700;
        background: var(--list-active);
      }

      .ant-select-item {
        transition: none;
        color: var(--base-color) !important;
        text-align: center;
      }
    }
  }

  // 列表
  .ant-list-items {
    * {
      color: #fff;
    }

    .ant-list-item {
      border-bottom: 1px solid #303030;
    }

    .ant-list-item-meta-description {
      color: hsla(0, 0%, 100%, 0.45);
    }
  }

  // 分割线
  .ant-divider-vertical {
    border-color: #fff;
  }

  //table表格滚动条
  .ant-table-body {
    &::-webkit-scrollbar {
      //整体样式
      height: 0;
      width: 0;
    }
  }

  .ant-tabs {
    width: 100%;
    .ant-tabs-nav {
      margin-top: 0;
      &::before {
        border-color: var(--base-border-color);
      }
    }
    .ant-tabs-tab {
      color: var(--base-color) !important;
    }

    .ant-tabs-nav-wrap {
      line-height: 1;
    }
    &.ant-tabs-card {
      .ant-tabs-nav .ant-tabs-tab-active {
        background: #20a0ff33 !important;
      }
      .ant-tabs-tab {
        background: #20a0ff33 !important;
        border-color: var(--base-border-color);
      }
    }
    .ant-tabs-tab-active {
      border-top: none !important;
    }
  }

</style>
