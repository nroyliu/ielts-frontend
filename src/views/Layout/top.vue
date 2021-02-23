<template>
	<div class="header">
		<div class="user">
			<img src="../../assets/icon-user.svg" alt />
			<span>XXXX XXXXX - 123456</span>
		</div>
		<div class="time"></div>
		<div class="action">
			<el-button>Finish section</el-button>
			<el-button>Help</el-button>
			<el-button>Hide</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
}
</script>

<style lang="less" scoped>
.header {
	position: relative;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: space-between;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding: 10px 22px;
	height: 70px;
	background-image: linear-gradient(0deg, #152531, #434c51, #152531);
	.user {
		display: flex;

		img {
			width: 32px;
			height: 32px;
		}
		span {
			margin-left: 10px;
			color: #d1f0ce;
			font-size: 20px;
		}
	}
}
</style>