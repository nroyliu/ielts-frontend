<template>
	<!-- 单选组件 返回一个 {[topic.id]: option} -->
	<div>
		<el-radio-group v-model="radio" v-if="!isReadType34" @change="selectChange">
			<el-radio
				:label="item1.option"
				v-for="item1 in item.options"
				:key="item1.option"
			>
				<span v-html="item1.text"></span>
			</el-radio>
		</el-radio-group>
		<el-radio-group v-model="radio" v-if="isReadType34" @change="selectChange">
			<el-radio :label="item1.option" v-for="item1 in arr" :key="item1.option">
				{{ item1.text }}
			</el-radio>
		</el-radio-group>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			default() {
				return {}
			}
		},
		arr: {
			type: Array,
			default() {
				return []
			}
		},
		isReadType34: {
			type: Boolean,
			default() {
				return false
			}
		},
		id: {
			type: Number,
			default() {
				return 0
			}
		}
	},
	data() {
		return {
			radio: '',
			obj: {},
			id1: ''
		}
	},
	methods: {
		selectChange(e) {
			this.obj[this.id1] = e
			this.$emit('changeData', this.obj)
		}
	},
	created() {
		if (this.id) {
			this.id1 = this.id
		} else {
			this.id1 = this.item.id
		}
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
