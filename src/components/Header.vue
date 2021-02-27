<template>
	<div class="nav_box">
		<div class="linkbar">
			<div class="contents">
				<div class="linkbox">
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
					<img
						src="data:image/png; ,iVBORw0KGgoAAAANSUhEUgAAAG0AAAASCAYAAABRjFBCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwNjQzOTcwNzhBQTExRUE5NDI1OEJGNDA2MDgzNEEzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwNjQzOTcxNzhBQTExRUE5NDI1OEJGNDA2MDgzNEEzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkVERENEMjE3ODlCMTFFQTk0MjU4QkY0MDYwODM0QTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkVERENEMjI3ODlCMTFFQTk0MjU4QkY0MDYwODM0QTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7F28VoAAAHzklEQVR42uxYaYwc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"
						alt
					/>
				</div>
			</div>
			<div class="nav_right">
				<div class="nav-list">
					<div class="nav">
						<a href="/mock" class="router-link-exact-active router-link-active">
							模拟机考
						</a>
						<a href="/usercenter" class>个人中心</a>
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
</style>
