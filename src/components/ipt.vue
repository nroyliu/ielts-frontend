<template>
	<div>
		<input
			:type="type"
			:value="value"
			class="ipt"
			:placeholder="'请输入' + placeholder"
			@keyup="change"
			:style="{ width: width }"
			:maxlength="maxlength"
		/>
		<div class="warn" v-show="showWarn">{{ placeholder }}不能为空</div>
	</div>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default() {
				return ''
			}
		},
		value: {
			type: String,
			default() {
				return ''
			}
		},
		showWarn: {
			type: Boolean,
			default() {
				return false
			}
		},
		width: {
			type: String,
			default() {
				return ''
			}
		},
		type: {
			type: String,
			default() {
				return 'text'
			}
		},
		maxlength: {
			type: Number,
			default() {
				return 16
			}
		}
	},
	methods: {
		change(e) {
			this.$emit('updateTxt', e.target.value)
		}
	}
}
</script>

<style lang="less" scoped>
.ipt {
	-webkit-appearance: none;
	background-color: #fff;
	background-image: none;
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	color: #606266;
	display: inline-block;
	font-size: 14px;
	height: 40px;
	line-height: 40px;
	outline: 0;
	padding: 0 15px;
	-webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	width: 100%;
	border: none;
	border-bottom: 1px solid #e6e6e6;
	border-radius: 0;
}
::-webkit-input-placeholder {
	/* WebKit browsers */
	color: #999;
	font-size: 14px;
}

::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	color: #999;
	font-size: 14px;
}

:-ms-input-placeholder {
	/* Internet Explorer 10+ */
	color: #999;
	font-size: 14px;
}
.warn {
	color: #f56c6c;
	font-size: 12px;
	line-height: 1;
	padding-top: 4px;
	transition: opacity 0.5s;
}
</style>
