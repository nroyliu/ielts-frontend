<template>
	<div class="nav_box">
		<div class="linkbar">
			<div class="contents">
				<div class="linkbox" @click="showWarn()">
					<span class="link-item">雅思</span>
					<span class="link-item">托福</span>
					<span class="link-item">GRE</span>
					<span class="link-item">GMAT</span>
					<span class="link-item">PTE</span>
					<span class="link-item">模考中心</span>
					<span class="link-item">APP下载</span>
				</div>
			</div>
		</div>
		<div class="nav_con">
			<div class="nav_left">
				<div class="left_logo">
					<h3>DASHI IELTS</h3>
				</div>
			</div>
			<div class="nav_right">
				<div class="nav-list">
					<div class="nav">
						<a href="/" class="router-link-exact-active router-link-active">
							模拟机考
						</a>
						<a href="/userCenter" class>个人中心</a>
					</div>
				</div>
				<div class="login-button logout-button" @click="loginout">退出登录</div>
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
		loginout() {
			this.$router.replace('/login')
			sessionStorage.clear()
			localStorage.clear()
		},
		showWarn() {
			this.$message({
				type: 'warning',
				message: '疯狂丰富中，敬请期待，期待各类合作（加V：dyyw688）'
			})
		}
	}
}
</script>
<style lang="less" scoped>
.linkbar {
	width: 100%;
	height: 36px;
	background: #333;
	.contents {
		width: 1140px;
		height: 100%;
		margin: 0 auto;
		.linkbox {
			float: right;
			.link-item {
				cursor: pointer;
				display: inline-block;
				padding: 0 12px;
				font-size: 12px;
				color: #ccc;
				line-height: 36px;
			}
			.link-item:hover {
				background: rgba(63, 61, 61, 0.7);
			}
		}
	}
}
.nav_box {
	width: 100%;
	background: #fff;
	position: fixed;
	top: 0;
	z-index: 999;
}
.nav_con {
	width: 1140px;
	height: 54px;
	margin: 0 auto;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	.nav_right {
		height: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		a {
			color: #000;
			margin-right: 36px;
			font-size: 14px;
			text-decoration: none;
		}
		.login-button {
			width: 86px;
			height: 30px;
			background: #ccc;
			border-radius: 15px;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			color: #fff;
			cursor: pointer;
		}
	}
	.router-link-active {
		color: #29d087;
	}
}

.nav_left {
	display: flex;
	align-items: center;
}
</style>
