<template>
	<!-- 单选组件 返回一个 {[topic.id]: option} -->
	<div>
		<el-radio-group v-model="radio" @change="selectChange">
			<el-radio
				:label="item1.option"
				v-for="item1 in item.options"
				:key="item1.option"
			>
				{{ item1.text }}
			</el-radio>
		</el-radio-group>
	</div>
</template>

<script>
export default {
	props: {
		item: Object
	},
	data() {
		return {
			radio: '',
			obj: {}
		}
	},
	methods: {
		selectChange(e) {
			this.obj[this.item.id] = e
			this.$emit('changeData', this.obj)
		}
	},
	created() {
		this.obj[this.item.id] = ''
	}
}
</script>

<style lang="less" scoped>
.el-radio-button__inner,
.el-radio-group {
	display: flex;
	flex-direction: column;
}
label {
	margin: 6px 15px;
}
</style>
