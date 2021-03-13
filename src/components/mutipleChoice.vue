<template>
	<div>
		<el-checkbox-group v-model="checkList">
			<el-checkbox
				v-for="(checkItem, checkIndex) in item1.options"
				:key="checkIndex"
				:label="checkItem.option"
				@change="change(checkItem.option)"
				:disabled="
					isDisable
						? ~checkList.indexOf(checkItem.option)
							? false
							: isDisable
						: false
				"
				style="display:block;"
			>
				{{ checkItem.text }}
			</el-checkbox>
		</el-checkbox-group>
	</div>
</template>

<script>
export default {
	props: {
		item1: Object,
		selection: {
			type: Number,
			default() {
				return 2
			}
		}
	},
	data() {
		return {
			checkList: [],
			isDisable: false
		}
	},
	methods: {
		change(e) {
			if (this.checkList.length > this.item1.answer.length - 1) {
				this.isDisable = true
				const obj = { [this.item1.id]: this.checkList.sort().join('') }
				this.$emit('changeData', obj)
			} else {
				this.isDisable = false
			}
		}
	},
	mounted() {}
}
</script>
