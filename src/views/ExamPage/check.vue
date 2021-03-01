<template>
	<div class="wrappers">
		<div class="img-box">
			<img src="../../assets/userCheck.png" alt />
			<div style="color: #212529; font-size: 14px;line-height:14px;">Confirm your details</div>
		</div>
		<div class="bc-box">
			<div class="title">EXAMPLE</div>
			<ul class="list">
				<li>
					<div>Name:</div>
				</li>
				<li>
					<div>Date of birth: XX-XX-XXXX</div>
				</li>
				<li>
					<div>Candidate number: xxxx xxxx - 123456</div>
				</li>
			</ul>
			<div class="txt">If your details aren't correct, please inform the invigilator.</div>
			<div style="width: 100%; text-align: center;">
				<el-button type="info" @click="goConfirm()">My details are correct</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		goConfirm() {
			this.$router.push({
				path: '/main/testSound',
				query: { id: this.$route.query.id },
			})
		},
	},
}
</script>

<style lang="less" scoped>
.wrappers {
	margin: 122px auto 0;
	max-width: 1120px;
	.img-box {
		margin-bottom: 22px;
		img {
			width: 48px;
			height: 48px;
		}
	}
	.bc-box {
		display: block;
		width: 100%;
		max-width: 1120px;
		border: 1px solid #fff;
		border-radius: 10px;
		padding: 15px;
		margin: 0 auto;
		.title {
			width: 100%;
			text-align: center;
			color: red;
			font-size: 26px;
		}
	}
	.list {
		margin-bottom: 28px;
		padding: 0 40px;
	}
	.txt {
		margin-bottom: 10px;
	}
}
</style>