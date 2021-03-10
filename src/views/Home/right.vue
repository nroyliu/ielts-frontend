<template>
	<div>
		<div class="right">
			<el-card class="box-card">
				<div class="personal-msg">
					<div class="user">
						<div class="avatar">
							<img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABRCAYAAABBuPE1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDY3NTYzNEJFN0IxMUU5OTE4MkUzNTY3OThDODIyRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDY3NTYzNUJFN0IxMUU5OTE4MkUzNTY3OThDODIyRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlENjc1NjMyQkU3QjExRTk5MTgyRTM1Njc5OEM4MjJEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlENjc1NjMzQkU3QjExRTk5MTgyRTM1Njc5OEM4MjJEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k/u4mgAACEFJREFUeNrsXVvIVFUU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"
								alt
							/>
						</div>
						<div class="username">用户827541</div>
					</div>
					<div class="exam-msg">
						<div class="exam-countdown msg-item">
							<div class="msg-title">
								距离考试还有
								<span class="day">-</span>
								天
							</div>
						</div>
						<div class="next-exam-time msg-item">
							<div class="msg-title">下次考试日期</div>
							<span>
								<i class="iconfont el-icon-edit"></i>
							</span>
						</div>
						<div class="target">
							<div class="msg-item">
								<div class="msg-title">目标分数</div>
								<div class="target-total">
									<span></span>
								</div>
							</div>
							<div class="msg-item no-edit">
								<span>听力,</span>
								<span>阅读,</span>
								<span>写作,</span>
								<span>口语</span>
								<i class="iconfont el-icon-edit"></i>
							</div>
						</div>
					</div>
					<!---->
				</div>
			</el-card>
			<div style="margin: 20px 0;">
				<el-card class="box-card">
					<div class="ad-recommend">
						<div>
							<span class="ad-title">外教口语模考</span>
							<span class="ad-sign">HOT</span>
						</div>
						<div class="ad-button" @click="showQRCode()">立即预约</div>
					</div>
					<div class="ad-recommend">
						<div>
							<span class="ad-title">高分学霸1V1训练</span>
							<!-- <span class="ad-sign">HOT</span>	 -->
						</div>
						<div class="ad-button" @click="showQRCode()">立即预约</div>
					</div>
				</el-card>
			</div>
			<el-card class="box-card">
				<div class="ad-list">
					<div class="ad-item">
						<div class="title">课程推荐</div>
						<div class="item_con">
							<div class="grid-txt" style="display:grid;">
								<span>享赢全科班</span>
								<span>即将开班</span>
								<span>1V1定制课程</span>
								<span>随时上课</span>
							</div>
						</div>
						<div style="width: 100%;display: flex;justify-content: center;">
							<div class="ad_button" @click="showQRCode()">立即咨询</div>
						</div>
					</div>
				</div>
			</el-card>
			<div style="margin: 20px 0;">
				<el-card class="box-card">
					<div class="ad-recommend">
						<div>
							<span class="ad-title">留学移民咨询</span>
							<span class="ad-sign">HOT</span>
						</div>
						<div class="ad-button" @click="showQRCode()">立即咨询</div>
					</div>
				</el-card>
			</div>
		</div>
		<el-dialog :visible.sync="wxCodeShow" width="30%">
			<div class="wxQrCode">
				<img src="../../assets/wx.jpg" alt="" />
			</div>
			<h3 slot="title">
				请微信扫描二维码联系老师
			</h3>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="wxCodeShow = false">取 消</el-button>
				<el-button type="primary" @click="wxCodeShow = false">
					确 定
				</el-button>
			</span> -->
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			wxCodeShow: false
		}
	},
	methods: {
		showQRCode() {
			this.wxCodeShow = true
		}
	}
}
</script>

<style lang="less" scoped>
.wxQrCode img {
	max-width: 300px;
	max-height: 300px;
}

.right {
	width: 266px;
	z-index: 9;
	.personal-msg {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 22px 16px;
		width: 100%;
		background: #fff;
		.user {
			width: 100%;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			.avatar {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 12px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.username {
				font-size: 14px;
				color: #333;
				font-weight: 400;
			}
		}

		.exam-msg {
			margin-top: 10px;
			width: 100%;
			text-align: left;
			padding-bottom: 10px;
			.msg-item {
				margin-bottom: 10px;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				.msg-title {
					font-size: 14px;
					color: #333;
					font-weight: 500;
					margin-right: 8px;
					.day {
						color: #29d087;
						font-size: 22px;
						font-weight: 600;
						padding: 0 10px;
					}
				}
				.iconfont {
					font-size: 16px;
					color: #ccc;
					font-size: 12px;
					margin-left: 10px;
					cursor: pointer;
				}
			}
		}
	}
	.ad-recommend {
		margin-top: 10px;
		width: 100%;
		background: #fff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		.ad-title {
			font-size: 14px;
			color: #333;
			font-weight: 700;
		}
		.ad-sign {
			margin-left: 3px;
			background: #ff3e3e;
			padding: 2px;
			color: #fff;
			font-size: 12px;
			border-radius: 2px;
		}
		.ad-button {
			cursor: pointer;
			font-size: 12px;
			color: #29d087;
			border: 1px solid #29d087;
			border-radius: 2px;
			padding: 5px 15px;
		}
	}
	.ad-item {
		width: 100%;
		padding: 21px 15px;
		background: #fff;
		.title {
			text-align: left;
			font-size: 16px;
			font-weight: 700;
			color: #333;
		}
		.item_con {
			text-align: left;
			margin: 15px 0;
			font-size: 14px;
			.grid-txt {
				display: grid;
				grid-template-columns: repeat(2, 50%);
				span {
					text-align: center;
				}
			}
		}
		.ad_button {
			margin: 0 auto;
			width: 98px;
			height: 30px;
			color: #fff;
			background: #29d087;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			border-radius: 6px;
			display: inline-block;
			cursor: pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
	}
}
</style>
