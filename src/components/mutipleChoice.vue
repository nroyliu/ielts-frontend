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
			>
				{{ checkItem.text }}
			</el-checkbox>
		</el-checkbox-group>
	</div>
</template>

<script>
export default {
	props: {
		item1: Object
	},
	data() {
		return {
			checkList: [],
			isDisable: false
		}
	},
	methods: {
		change(e) {
			if (this.checkList.length > 2) {
				this.isDisable = true
				const obj = { [this.item1.id]: this.checkList }
				this.$emit('changeData', obj)
			} else {
				this.isDisable = false
			}
		}
	},
	mounted() {}
}
</script>
