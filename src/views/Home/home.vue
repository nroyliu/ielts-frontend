<template>
	<div class="wrapper">
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
							<a href="/mock" class="router-link-exact-active router-link-active">模拟机考</a>
							<a href="/usercenter" class>个人中心</a>
						</div>
					</div>
					<div class="login-button logout-button" @click="loginout">退出登录</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="left">
				<el-card class="box-card">
					<div class="c_mock">
						<div class="mock_title">
							<span>模拟机考</span>
							<el-tooltip class="item" effect="dark" placement="bottom-end">
								<template #content>
									<div class="warnning">
										趴趴模拟机考使用须知
										<br />
										<br />趴趴模拟机考为【限时全真模拟考试】，在测试前，请注意以下事项
										<br />
										<br />1 考试计时：一旦开始考试后，就会开始计时，中途不能暂停。听力部分计时为音频时间+2min检查时间（约在25 - 35分钟）；阅读部分计时
										<br />60min；写作部分计时60min。如果中途退出（关闭窗口或网络断开等），之前填写的答案将会自动保存。在机考网页“个人中心 - 模考记录中”，
										<br />可以找到作答到一半的题目记录，并可以继续考试。继续考试的倒计时会承接上次退出时的剩余时间。
										<br />
										<br />2 答卷提交：每科目倒计时结束后会自动提交并进入下一科目；或点击右上角Finish Section可提前提交当前科目的答卷，提交后将不可返回修改此科目答案，自动进入下一科目的作答。
										<br />
										<br />3 成绩报告：当一套题目完整提交后（听力、阅读、写作三部分都完成并提交），将会自动跳转成绩报告，可以看到自己的听力、阅读分数和错题详情。如果未100%提交答卷，不会生成成绩报告。
										<br />
										<br />4 答题前准备：
										<br />1）在进入模考前，请确认自己的网络连接正常，耳机或电脑声音播放正常，不要将电脑或耳机处于静音状态。
										<br />2）关闭自行安装的智能输入法，将输入法调节到原始的英文输入状态，确认无词汇联想等功能，否则将影响你的真实成绩。
										<br />3）如果安装了一些翻译插件，如有道翻译等，具有网页及文字自动翻译功能，请提前将插件关闭或退出，避免影响正常做题。
										<br />
										<br />
										<br />祝宝宝取得好成绩！
										<br />
									</div>
								</template>
								<span class="el-dropdown-link">
									<i class="el-tooltip iconfont el-icon-question" tabindex="0">模考须知</i>
								</span>
							</el-tooltip>
						</div>
						<div class="mock_filter">
							<div class="filter_item">
								<div class="item_title">考试类型</div>
								<div class="item_filter item_filter-active">全部</div>
								<div class="item_filter">A类</div>
							</div>
							<div class="filter_item non-border">
								<div class="item_title">题目来源</div>
								<div class="item_filter item_filter-active">
									全部
									<!---->
								</div>
								<div class="item_filter">
									高频真题（35套）
									<div class="freeTag" style="right: -4em;">
										<div class="triangle"></div>付费购买
									</div>
								</div>
								<div class="item_filter">
									高频真题体验卷（6套）
									<div class="freeTag" style="right: -4em;">
										<div class="triangle"></div>限时免费
									</div>
								</div>
								<div class="item_filter">
									剑桥真题
									<!---->
								</div>
							</div>
						</div>
					</div>
					<div class="most-test">
						<div class="model_title">
							<div>高频真题体验卷（6套）</div>
						</div>
						<el-collapse>
							<el-collapse-item>
								<template #title>
									<div style="padding-left: 10px;color:#303133;font-size:13px">{{`· 高频真题体验卷`}}</div>
								</template>
								<div class="item-paper">
									<div class="paper-name">Test 1</div>
									<div class="practice_time">练习人次 30707</div>
									<!---->
									<div class="practice_progress">
										<span>已完成 33%</span>
									</div>
									<div class="practice_button" @click="beginExam">开始考试</div>
								</div>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="most-test">
						<div class="model_title">
							<div>高频真题体验卷（6套）</div>
						</div>
						<el-collapse>
							<el-collapse-item>
								<template #title>
									<div style="padding-left: 10px;color:#303133;font-size:13px">{{`· 高频真题体验卷`}}</div>
								</template>
							</el-collapse-item>
						</el-collapse>
					</div>
					<div class="most-test">
						<div class="model_title">
							<div>高频真题体验卷（6套）</div>
						</div>
						<el-collapse>
							<el-collapse-item disabled>
								<template #title>
									<div style="padding-left: 10px;color:#303133;font-size:13px">{{`· 高频真题体验卷`}}</div>
								</template>
							</el-collapse-item>
						</el-collapse>
						<div class="unlockButton">付费购买解锁</div>
					</div>
				</el-card>
			</div>
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
									<span class="day">-</span>天
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
							<div class="ad-button">立即预约</div>
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
								<div class="ad_button">立即咨询</div>
							</div>
						</div>
					</div>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			msg: 'hello',
		}
	},
	methods: {
		loginout() {
			this.$router.replace('/login')
		},
		beginExam() {
			this.$router.push('/main')
		},
	},
}
</script>

<style lang="less" scoped>
.wrapper {
	width: 100%;
	min-height: 100vh;
	background: #f6f6f6;
	overflow: auto;

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

	.content {
		width: 1140px;
		margin: 110px auto 184px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		position: relative;
		.left {
			width: 854px;
			min-height: 100%;
			.c_mock {
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				width: 100%;
				// padding: 20px 30px 40px;
				background: #fff;
				color: #ccc;
				font-size: 13px;
				.mock_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 20px;
					color: #333;
					font-weight: 600;
					text-align: left;
				}
				.mock_filter {
					width: 100%;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					margin-top: 20px;
					padding: 0 20px;
					border: 1px solid #e6e6e6;
					border-left: none;
					border-right: none;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
					font-size: 12px;
					color: #2c3e50;
					.filter_item {
						width: 100%;
						height: 44px;
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-ms-flex-align: center;
						align-items: center;
						border-bottom: 1px dashed #e6e6e6;
						&.non-border {
							border-bottom: none;
						}
						.item_title {
							margin-right: 36px;
							float: left;
							-ms-flex-negative: 0;
							flex-shrink: 0;
						}
						.item_filter {
							cursor: pointer;
							padding: 0 0.5em;
							margin-right: 4em;
							-ms-flex-negative: 0;
							flex-shrink: 0;
							position: relative;
							.freeTag {
								background: #ff3e3e;
								color: #fff;
								font-size: 12px;
								padding: 0 6px;
								height: 16px;
								border-radius: 100px;
								position: absolute;
								top: -48%;
								right: -4em;
								-webkit-transform: scale(0.8);
								transform: scale(0.8);
							}
							.freeTag :after {
								content: '';
								position: absolute;
								top: 90%;
								left: -9px;
								width: 21px;
								height: 7px;
								border-width: 0;
								border-style: solid;
								border-color: transparent;
								border-right-width: 6px;
								border-right-color: currentColor;
								border-radius: 0 0 34px 0;
								color: #ff3e3e;
							}
						}
						.item_filter-active {
							background: #29d087;
							color: #fff;
							border-radius: 12px;
						}
					}
				}
			}
			.isdark {
				background: #303133;
				color: #fff;
			}
			.iconfont {
				color: #ccc;
				cursor: pointer;
				font-size: 13px;
			}
			.iconfont:hover {
				color: #29d087;
				cursor: pointer;
			}
			.model_title {
				width: 100%;
				font-size: 14px;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				text-align: left;
				background: #ecf9f3;
				height: 34px;
				line-height: 34px;
				padding-left: 10px;
				-webkit-box-pack: justify;
				-ms-flex-pack: justify;
				justify-content: space-between;
			}
			.most-test {
				position: relative;
				.item-paper {
					display: flex;
					height: 75px;
					border-bottom: 1px solid #e6e6e6;
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					-ms-flex-pack: distribute;
					justify-content: space-around;
					color: #333;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
					.paper-name,
					.practice_progress,
					.practice_time {
						-webkit-box-flex: 1;
						-ms-flex: 1;
						flex: 1;
						text-align: center;
					}
					.practice_button {
						width: 80px;
						height: 36px;
						border: 1px solid #29d087;
						color: #29d087;
						text-align: center;
						line-height: 36px;
						font-size: 12px;
						border-radius: 4px;
						cursor: pointer;
					}
				}
				.unlockButton {
					width: 120px;
					height: 42px;
					background: #ff5e5e;
					border-radius: 4px;
					color: #fff;
					line-height: 42px;
					text-align: center;
					position: absolute;
					top: 20%;
					margin-left: -60px;
					left: 50%;
					cursor: pointer;
				}
			}
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
	}
}
.warnning {
	max-width: 800px;
	font-size: 12px;
}
</style>