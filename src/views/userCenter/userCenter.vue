<template>
	<div class="wrapper">
		<com-header></com-header>
		<div class="content">
			<div class="left">
				<div class="top">
					<div class="score-box">
						<div class="top-left">
							<div class="practice-time" style="margin-right: 50px;">
								<div class="value">66</div>
								<div class="title">练习次数</div>
							</div>
							<div class="average-total-score">
								<div
									style="color: red; font-size: 14px; line-height: 48px; height: 48px;"
								>
									请补充小分
								</div>
								<div class="title">平均总分</div>
							</div>
						</div>
						<div class="divider"></div>
						<div class="top-right">
							<div class="line" style="margin-bottom: 40px;">
								<div class="item">
									<div class="key">
										听力
										<span class="key-desc">(平均分数)</span>
									</div>
									<div class="value">0</div>
									<i class="iconfont "></i>
								</div>
								<div class="item">
									<div class="key">
										写作
										<span class="key-desc">(平均分数)</span>
									</div>
									<div class="value">0</div>
									<i class="iconfont papa-personal_edit"></i>
								</div>
							</div>
							<div class="line">
								<div class="item">
									<div class="key">
										阅读
										<span class="key-desc">(平均分数)</span>
									</div>
									<div class="value">0</div>
									<i class="iconfont"></i>
								</div>
								<div class="item">
									<div class="key">
										口语
										<span class="key-desc">(平均分数)</span>
									</div>
									<div class="value">0</div>
									<i class="iconfont papa-personal_edit"></i>
								</div>
							</div>
						</div>
						<i
							class="el-tooltip iconfont papa-question"
							aria-describedby="el-tooltip-2990"
							tabindex="0"
						></i>
					</div>
				</div>
			</div>
			<right></right>
		</div>
	</div>
</template>

<script>
import header from '@/components/Header'
import right from '../Home/right'
export default {
	components: {
		'com-header': header,
		right
	},
	data() {
		return {}
	}
}
</script>

<style lang="less" scoped>
.wrapper {
	width: 100%;
	min-height: 100vh;
	background: #f6f6f6;
	overflow: auto;
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
			// background: #fff;
			.top {
				width: 100%;
				height: 200px;
				margin-bottom: 20px;
				background: #fff;
				.score-box {
					height: 100%;
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					-webkit-box-pack: center;
					-ms-flex-pack: center;
					justify-content: center;
					position: relative;
					.top-left {
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
						.value {
							font-size: 32px;
							color: #333;
						}
						.title {
							font-size: 14px;
							color: #333;
						}
					}
					.divider {
						width: 1px;
						height: 120px;
						background: #e6e6e6;
						margin: 0 50px;
					}
					.line {
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
						.item {
							display: -webkit-box;
							display: -ms-flexbox;
							display: flex;
							-webkit-box-align: center;
							-ms-flex-align: center;
							align-items: center;
							color: #333;
							.key {
								font-size: 16px;
								.key-desc {
									margin-left: 0.5em;
									margin-right: 15px;
									font-size: 14px;
								}
							}
							.value {
								font-size: 32px;
								font-weight: 600;
								width: 2em;
								border: none;
							}
						}
					}
				}
			}
		}
	}
}
</style>
