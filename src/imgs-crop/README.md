## 图片裁剪（ImgsCrop）

### 何时使用

使用场景和使用方式

### 基础用法


:::RUNTIME
```html
<template>
	<div>
		<vc-imgs-crop 
			ref="target"
			:src="src" 
			:scale="scale" 
			:rotate="rotate" 
			:width="375"
			:height="230"
			cross-origin="anonymous"
			@drop-file="handleFn"
			@load-failure="handleFn"
			@load-success="handleFn"
			@image-ready="handleFn"
			@image-change="handleFn"
			@mouse-up="handleFn"
			@mouse-move="handleFn"
			@position-change="handleFn"
		/>
		<vc-slider v-model="scale" :min="0.3" :max="3" :step="0.01" />
		<vc-slider v-model="rotate" :min="0" :max="360" />
		
		<div @click="handleSave">
			保存
		</div>

		<img :src="result" width="200">
	</div>
</template>
<script>
import { ImgsCrop, Slider } from '@wya/vc';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-imgs-crop': ImgsCrop,
		'vc-slider': Slider,
	},
	data() {
		return {
			src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
			scale: 1,
			rotate: 0,
			result: null
		};
	},
	computed: {
		
	},
	methods: {
		handleFn() {
			console.log(arguments);
		},
		async handleSave() {
			try {
				const { file, base64Image } = await this.$refs.target.getImage();
				this.result = base64Image;

			} catch (e) {
				console.log(e, "跨域问题：需要添加 cors协议头");
			}
		}
	}
};
</script>

```
:::


#### 属性

属性 | 说明 | 类型  | 可选值 | 默认值
---|---|---|---|---
src | 图片地址 | `Any` | - | -
scale | 缩放值 | `Number` | - | `1`
rotate | 旋转角度 | `Number` | - | `0`
border | 裁剪的边框 [x, y] | `Number`、 `Array` | - | `20`
borderRadius | 裁剪的边框圆角 | `Number` | - | `0`
width | 裁剪区域宽 | `Number` | - | `200`
height | 裁剪区域高 | `Number` | - | `200`
position | 裁剪区域定位 | `Object` | - | -
color | 边框的背景色RGBA | `Array` | - | `[0, 0, 0, 0.5]`
cross-origin | 跨域来源 | `string` | `anonymous`、 `use-credentials` | `anonymous`
disableDrop | 是否支持拖拽图片进来编辑 | `Boolean` | - | `false`


#### 事件

属性 | 说明 | 类型 | 默认值
---|---|---|---
`@drop-file` | 拖入图片回掉 | - | -
`@load-fail` | 图片加载失败 | - | -
`@load-success` | 图片加载成功 | - | -
`@image-ready` | 图片加载成功，展示后执行 | - | -
`@image-change` | 图片信息变化 | - | -
`@mouse-up` | 抬起 | - | -
`@mouse-move` | 移动 | - | -
`@position-change` | 位置变化 | - | -


## 基础用法

```vue
<template>
	<vc-imgs-crop :src="src" />
</template>
<script>
import { ImgsCrop } from '@wya/vc';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-imgs-crop': ImgsCrop,
	},
	data() {
		return {
			src: 'https://oss.ruishan666.com/image/xcx/180313/942996157518/10053669,2880,1800.jpg',
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>

```